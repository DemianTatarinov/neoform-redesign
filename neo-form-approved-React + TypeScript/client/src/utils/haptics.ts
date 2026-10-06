export const triggerHaptic = (ms = 15) => {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(ms);
  }
};
