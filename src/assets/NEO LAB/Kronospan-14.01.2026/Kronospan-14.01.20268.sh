#!/bin/bash

# Переходим в папку скрипта
TARGET_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$TARGET_DIR"

export PATH="$PATH:$HOME/.local/bin"
# Отключаем аппаратное ускорение OpenCL для ImageMagick (защита от зависаний графики Intel UHD)
export MAGICK_OCL_DEVICE=OFF

FORMAT_CHOICE=$(kdialog --title "Инструменты Медиа" --radiolist "Выберите операцию для этой папки:" \
    1 "WebP (Web-оптимизация: малый вес, без потери качества)" on \
    2 "Удаление фона (PNG с прозрачностью, для логотипов)" off \
    3 "JPG (Фото, автосжатие до 4.5 МБ)" off \
    4 "PNG (Обычная конвертация без потерь)" off \
    5 "MP4 (Видео, кодек H.264)" off)

[ -z "$FORMAT_CHOICE" ] && exit 0

case $FORMAT_CHOICE in
    1) TARGET_EXT="webp"; OP_MODE="webp" ;;
    2) TARGET_EXT="png"; OP_MODE="rembg" ;;
    3) TARGET_EXT="jpg"; OP_MODE="jpg" ;;
    4) TARGET_EXT="png"; OP_MODE="png" ;;
    5) TARGET_EXT="mp4"; OP_MODE="mp4" ;;
esac

shopt -s extglob nocaseglob nullglob

if [ "$OP_MODE" == "mp4" ]; then
    files=( *.@(mov|avi|mkv|webm|wmv|flv|m4v) )
else
    files=( *.@(heic|heif|bmp|tiff|jpeg|jpg|png|webp) )
fi

total=${#files[@]}
if [ $total -eq 0 ]; then
    kdialog --title "Информация" --msgbox "В этой папке нет подходящих файлов."
    exit 0
fi

# Инициализируем окно. HTML-тег &nbsp; принудительно растягивает окно в Wayland
dbusRef=$(kdialog --title "Обработка ($total файлов)" --progressbar "<b>Инициализация...</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" $total)

# Разбираем строку ответа на адрес сервиса и путь (выглядит как "org.kde.kdialog-12345 /ProgressDialog")
read -r DBUS_SRV DBUS_PATH <<< "$dbusRef"

# --- Безотказные функции D-Bus через стандартный dbus-send ---
update_text() {
    dbus-send --type=method_call --dest="$DBUS_SRV" "$DBUS_PATH" \
        org.kde.kdialog.ProgressDialog.setLabelText string:"$1" >/dev/null 2>&1 || true
}

update_val() {
    dbus-send --type=method_call --dest="$DBUS_SRV" "$DBUS_PATH" \
        org.freedesktop.DBus.Properties.Set \
        string:"org.kde.kdialog.ProgressDialog" string:"value" variant:int32:"$1" >/dev/null 2>&1 || true
}

check_cancel() {
    local status
    status=$(dbus-send --print-reply --dest="$DBUS_SRV" "$DBUS_PATH" \
        org.kde.kdialog.ProgressDialog.wasCancelled 2>/dev/null)
    [[ "$status" == *"true"* ]]
}

close_dialog() {
    # 1. Мягкое закрытие через D-Bus
    dbus-send --type=method_call --dest="$DBUS_SRV" "$DBUS_PATH" \
        org.kde.kdialog.ProgressDialog.close >/dev/null 2>&1 || true

    # 2. Жесткое закрытие (убиваем процесс kdialog по его PID, который зашит в имени сервиса)
    local pid="${DBUS_SRV##*-}"
    if [[ "$pid" =~ ^[0-9]+$ ]]; then
        kill "$pid" >/dev/null 2>&1 || true
    fi
}

# Активируем кнопку отмены
dbus-send --type=method_call --dest="$DBUS_SRV" "$DBUS_PATH" \
    org.kde.kdialog.ProgressDialog.showCancelButton boolean:true >/dev/null 2>&1 || true
# -----------------------------------------------------------

MAX_SIZE=4718592
count=0

for i in "${!files[@]}"; do
    if check_cancel; then
        break
    fi

    f="${files[$i]}"
    basename="${f%.*}"
    current_ext="${f##*.}"

    if [ "$OP_MODE" == "rembg" ]; then
        output_file="${basename}_nobg.${TARGET_EXT}"
    elif [ "$OP_MODE" == "webp" ]; then
        output_file="${basename}_web.${TARGET_EXT}"
    else
        output_file="${basename}.${TARGET_EXT}"
        if [[ "${current_ext,,}" == "$TARGET_EXT" ]]; then
            continue
        fi
    fi

    # Обновляем текст с использованием HTML для переноса строк и читаемости
    if [ "$OP_MODE" == "rembg" ] && [ "$i" -eq 0 ]; then
        update_text "<b>Загрузка ИИ-модели...</b><br>Файл: $f"
    else
        update_text "<b>Обработка:</b> $f<br>Прогресс: $((i+1)) из $total"
    fi
    update_val "$i"

    success=false

    if [ "$OP_MODE" == "mp4" ]; then
        if ffmpeg -y -hwaccel auto -i "$f" -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k -movflags +faststart "$output_file" </dev/null >/dev/null 2>&1; then
            success=true
        fi
    elif [ "$OP_MODE" == "webp" ]; then
        if [[ "${current_ext,,}" =~ ^(heic|heif)$ ]]; then
            heif-convert "$f" "${basename}_tmp.png" </dev/null >/dev/null 2>&1 || true
            if magick "${basename}_tmp.png" -strip -quality 82 -interlace Plane "$output_file" </dev/null >/dev/null 2>&1; then
                success=true
            fi
            rm -f "${basename}_tmp.png"
        else
            if magick "$f" -strip -quality 82 -interlace Plane "$output_file" </dev/null >/dev/null 2>&1; then
                success=true
            fi
        fi
    elif [ "$OP_MODE" == "rembg" ]; then
        if rembg i "$f" "$output_file" </dev/null >/dev/null 2>&1; then
            success=true
        fi
    elif [ "$OP_MODE" == "png" ]; then
        if [[ "${current_ext,,}" =~ ^(heic|heif)$ ]]; then
            heif-convert "$f" "$output_file" </dev/null >/dev/null 2>&1 && success=true
        else
            magick "$f" "$output_file" </dev/null >/dev/null 2>&1 && success=true
        fi
    elif [ "$OP_MODE" == "jpg" ]; then
        if [[ "${current_ext,,}" =~ ^(heic|heif)$ ]]; then
            heif-convert -q 100 "$f" "$output_file" </dev/null >/dev/null 2>&1 && success=true
        else
            magick "$f" -quality 100 "$output_file" </dev/null >/dev/null 2>&1 && success=true
        fi

        if [ "$success" = true ]; then
            file_size=$(stat -c%s "$output_file" 2>/dev/null || echo 0)
            if [ "$file_size" -gt "$MAX_SIZE" ]; then
                quality=95
                while [ "$file_size" -gt "$MAX_SIZE" ] && [ "$quality" -gt 10 ]; do
                    magick "$output_file" -quality "$quality" "$output_file" </dev/null >/dev/null 2>&1 || break
                    file_size=$(stat -c%s "$output_file" 2>/dev/null || echo 0)
                    quality=$((quality - 5))
                done
            fi
        fi
    fi

    if [ "$success" = true ]; then
        rm -f "$f"
        ((count++))
    else
        rm -f "$output_file"
    fi
done

update_val "$total"
close_dialog
shopt -u extglob nocaseglob nullglob

kdialog --title "Готово" --msgbox "Успешно обработано файлов: $count из $total"
