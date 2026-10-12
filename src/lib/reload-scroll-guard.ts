/** Runs before paint: block native + TanStack cache restore on full loads without a hash. */
export const reloadScrollGuardScript = `(function(){try{history.scrollRestoration="manual";sessionStorage.removeItem("tsr-scroll-restoration-v1_3");scrollTo(0,0);}catch(e){}})();`;
