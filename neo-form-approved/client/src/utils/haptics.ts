export const triggerHaptic = (ms = 15) => {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(ms);
    } catch {
      /* unsupported */
    }
  }
};
