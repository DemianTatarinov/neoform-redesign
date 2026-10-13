import type { RefObject } from 'react';
import { PhotoSwipeGalleryDialog } from '@/components/photo-swipe-gallery-dialog';

type NeoLabArchiveGalleryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  images: string[];
  returnFocusRef?: RefObject<HTMLElement | null>;
};

export function NeoLabArchiveGalleryDialog(props: NeoLabArchiveGalleryDialogProps) {
  return (
    <PhotoSwipeGalleryDialog
      {...props}
      imageAltLabel={props.title}
    />
  );
}
