export const triggerHaptic = (ms = 15) => navigator?.vibrate?.(ms);
