globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-11T15:37:10.350Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/Biblioteki1-BDWtGNIt.webp": {
		"type": "image/webp",
		"etag": "\"d2ea-/h9yDdUxFJWHV21L9Hrwute1UPU\"",
		"mtime": "2026-10-11T15:37:09.169Z",
		"size": 53994,
		"path": "../public/assets/Biblioteki1-BDWtGNIt.webp"
	},
	"/assets/Biblioteki2-BequuIQ_.webp": {
		"type": "image/webp",
		"etag": "\"d8a6-157nHJpTyVyNSv4oP7u/BYoYI2k\"",
		"mtime": "2026-10-11T15:37:09.169Z",
		"size": 55462,
		"path": "../public/assets/Biblioteki2-BequuIQ_.webp"
	},
	"/assets/Biblioteki3-AtLUB4XC.webp": {
		"type": "image/webp",
		"etag": "\"b12c-8RRNdBvK6JoCfbotGC294apsR/k\"",
		"mtime": "2026-10-11T15:37:09.169Z",
		"size": 45356,
		"path": "../public/assets/Biblioteki3-AtLUB4XC.webp"
	},
	"/assets/Biblioteki4-D7Gqdhh9.webp": {
		"type": "image/webp",
		"etag": "\"a7d8-Kk4ShIs1+R8bUOr0SqzHu4Z8dRw\"",
		"mtime": "2026-10-11T15:37:09.169Z",
		"size": 42968,
		"path": "../public/assets/Biblioteki4-D7Gqdhh9.webp"
	},
	"/assets/Blat_web-dxUwYvKG.webp": {
		"type": "image/webp",
		"etag": "\"13742-aFs2poEFKLGEEfqM6Lr09iy6ZTQ\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 79682,
		"path": "../public/assets/Blat_web-dxUwYvKG.webp"
	},
	"/assets/Blum1-Dkc6lP0-.webp": {
		"type": "image/webp",
		"etag": "\"438a-zDMygaMYutUsT63liiR0p9veYPU\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 17290,
		"path": "../public/assets/Blum1-Dkc6lP0-.webp"
	},
	"/assets/Blum2-Bbq8KGoa.webp": {
		"type": "image/webp",
		"etag": "\"784c-QJcfWLgTo79vPg9S184Nd/FT0E8\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 30796,
		"path": "../public/assets/Blum2-Bbq8KGoa.webp"
	},
	"/assets/Blum3-E2YkpkN9.webp": {
		"type": "image/webp",
		"etag": "\"4156-l9USgrYlGt5UH3gxY6NkkXx/E5I\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 16726,
		"path": "../public/assets/Blum3-E2YkpkN9.webp"
	},
	"/assets/Blum4-MXfffmrV.webp": {
		"type": "image/webp",
		"etag": "\"37ec-2ny7RqW7EqGIGi7OHU/oVvo0ZfA\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 14316,
		"path": "../public/assets/Blum4-MXfffmrV.webp"
	},
	"/assets/Detal_web-BtBMA-oB.webp": {
		"type": "image/webp",
		"etag": "\"18cc0-C/eMyEyokoMmoaaRx23rnpFAqDk\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 101568,
		"path": "../public/assets/Detal_web-BtBMA-oB.webp"
	},
	"/assets/Drewno-Fornir-ajBiWHaA.webp": {
		"type": "image/webp",
		"etag": "\"64a0-0sT989DmesjGS+46KuffFzcnUTM\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 25760,
		"path": "../public/assets/Drewno-Fornir-ajBiWHaA.webp"
	},
	"/assets/Fenix-ARPA-HPL-DEIYVeu-.webp": {
		"type": "image/webp",
		"etag": "\"34e06-W8PPXQCLYN754nCTOE8FlIpQJyc\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 216582,
		"path": "../public/assets/Fenix-ARPA-HPL-DEIYVeu-.webp"
	},
	"/assets/Garderoby2-CTs2OwvD.webp": {
		"type": "image/webp",
		"etag": "\"9c20-xsTiwUZcnyGEjU5EQpu3KyQRgRI\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 39968,
		"path": "../public/assets/Garderoby2-CTs2OwvD.webp"
	},
	"/assets/Garderoby1-BxXYr2ZU.webp": {
		"type": "image/webp",
		"etag": "\"b0f6-NQ/B/HHEoxKXVmoEclWWmW62Vck\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 45302,
		"path": "../public/assets/Garderoby1-BxXYr2ZU.webp"
	},
	"/assets/Garderoby3-B5jFA92x.webp": {
		"type": "image/webp",
		"etag": "\"1dba2-lxnqHG6ZmFIGkeI1et2mGGiI8rI\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 121762,
		"path": "../public/assets/Garderoby3-B5jFA92x.webp"
	},
	"/assets/Garderoby5-B6_Zv-9j.webp": {
		"type": "image/webp",
		"etag": "\"198b0-aSe2pzR8IZx5xzLAIvS9NY/Moos\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 104624,
		"path": "../public/assets/Garderoby5-B6_Zv-9j.webp"
	},
	"/assets/Garderoby4-Q2QnVzvI.webp": {
		"type": "image/webp",
		"etag": "\"23b64-h8PXzsRnz7/6I7yfhBLGGbPZo/s\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 146276,
		"path": "../public/assets/Garderoby4-Q2QnVzvI.webp"
	},
	"/assets/Garderoby6-DnlNRxNx.webp": {
		"type": "image/webp",
		"etag": "\"be78-KbgpbmTgbLco9I+ZIaSaez4StHI\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 48760,
		"path": "../public/assets/Garderoby6-DnlNRxNx.webp"
	},
	"/assets/Garderoby7-CcJA176P.webp": {
		"type": "image/webp",
		"etag": "\"ddd4-cW6CX+REk2wvkLKhhva8PFUVzzc\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 56788,
		"path": "../public/assets/Garderoby7-CcJA176P.webp"
	},
	"/assets/Garderoby8-Dqf-_5b1.webp": {
		"type": "image/webp",
		"etag": "\"41844-u02qbMhAYcYTj7aVrjBtWS4cn4E\"",
		"mtime": "2026-10-11T15:37:09.170Z",
		"size": 268356,
		"path": "../public/assets/Garderoby8-Dqf-_5b1.webp"
	},
	"/assets/Garderoby9-BgiNHN9W.webp": {
		"type": "image/webp",
		"etag": "\"c57a-t3vjQUpJebtUwoyba2TG3h17lqc\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 50554,
		"path": "../public/assets/Garderoby9-BgiNHN9W.webp"
	},
	"/assets/Hettich1-DQLu2bsa.webp": {
		"type": "image/webp",
		"etag": "\"1eee-qBnJQK+zDRB7y9sj38bgLWHvoNw\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 7918,
		"path": "../public/assets/Hettich1-DQLu2bsa.webp"
	},
	"/assets/Hettich2-CtOdMqh0.webp": {
		"type": "image/webp",
		"etag": "\"43c8-zH6fTixSiQr17Z1w1nAil5/3QKc\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 17352,
		"path": "../public/assets/Hettich2-CtOdMqh0.webp"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"8ae-B9Tx1EA7hydB9yi23zsxA+KW8xw\"",
		"mtime": "2026-10-11T15:37:10.350Z",
		"size": 2222,
		"path": "../public/favicon.png"
	},
	"/assets/Hettich3-CFIdfaO7.webp": {
		"type": "image/webp",
		"etag": "\"c366-aJo3stISWWR01iCiEzQJ1ZV8uTs\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 50022,
		"path": "../public/assets/Hettich3-CFIdfaO7.webp"
	},
	"/assets/Hettich4-Bn6YNFvt.webp": {
		"type": "image/webp",
		"etag": "\"328c-kzggcEhBvB1AR7VtZEcmioYKdT8\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 12940,
		"path": "../public/assets/Hettich4-Bn6YNFvt.webp"
	},
	"/assets/Home_office2-0vPO7asE.webp": {
		"type": "image/webp",
		"etag": "\"1b20c-hm9s/ZTYS/VqVBqwqlg87s5qFQ0\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 111116,
		"path": "../public/assets/Home_office2-0vPO7asE.webp"
	},
	"/assets/Home_office1-CDFRk2wb.webp": {
		"type": "image/webp",
		"etag": "\"1092c-gbYpE4vgGlK7UbtcCYLM7zVhKYE\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 67884,
		"path": "../public/assets/Home_office1-CDFRk2wb.webp"
	},
	"/assets/Home_office4-COT-aZPY.webp": {
		"type": "image/webp",
		"etag": "\"233a2-Fx8txz2uHYPHoZn/4fS3UcZpnOc\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 144290,
		"path": "../public/assets/Home_office4-COT-aZPY.webp"
	},
	"/assets/Kamień-Spiek-D7Oy_mk0.webp": {
		"type": "image/webp",
		"etag": "\"3ab2-iT99apRhkw8yBBXnt4Prt0mSc3A\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 15026,
		"path": "../public/assets/Kamień-Spiek-D7Oy_mk0.webp"
	},
	"/assets/Jakość_web-E7Gk6tkc.webp": {
		"type": "image/webp",
		"etag": "\"2175c-fDCvP6WCgoEwQ5XbS+wE8RU/c8o\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 137052,
		"path": "../public/assets/Jakość_web-E7Gk6tkc.webp"
	},
	"/assets/Kuchnie1-C96lLqdx.webp": {
		"type": "image/webp",
		"etag": "\"4b304-+fz3/iEVDoMa6ZPDsHe+DrzqWxQ\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 307972,
		"path": "../public/assets/Kuchnie1-C96lLqdx.webp"
	},
	"/assets/Kuchnie10-Dkfp8a-2.webp": {
		"type": "image/webp",
		"etag": "\"e2b0-eZdbLPOGC3TBSk+JXi8me73fRJo\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 58032,
		"path": "../public/assets/Kuchnie10-Dkfp8a-2.webp"
	},
	"/assets/Kuchnie12-CgLywEOq.webp": {
		"type": "image/webp",
		"etag": "\"76e64-+AJKf5I4K/5uazMl6xCp5v1l+qo\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 487012,
		"path": "../public/assets/Kuchnie12-CgLywEOq.webp"
	},
	"/assets/Home_office3-pRvO1NR5.webp": {
		"type": "image/webp",
		"etag": "\"aeba-8d735B0AJTWX+sC0me4mbBzIUeY\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 44730,
		"path": "../public/assets/Home_office3-pRvO1NR5.webp"
	},
	"/assets/Kuchnie19-DnltHwS7.webp": {
		"type": "image/webp",
		"etag": "\"11fa6-xJALv9PAME3ODTCUiEeLxrJHLdc\"",
		"mtime": "2026-10-11T15:37:09.173Z",
		"size": 73638,
		"path": "../public/assets/Kuchnie19-DnltHwS7.webp"
	},
	"/assets/Kuchnie21-DHyBoQgl.webp": {
		"type": "image/webp",
		"etag": "\"d978-plW98W9pCjGThA6toYLQPZs3R3Q\"",
		"mtime": "2026-10-11T15:37:09.173Z",
		"size": 55672,
		"path": "../public/assets/Kuchnie21-DHyBoQgl.webp"
	},
	"/assets/Kuchnie2-CB41xgc5.webp": {
		"type": "image/webp",
		"etag": "\"36cb4-lZStcuqa1yhvYqJb/XF63/hgXRQ\"",
		"mtime": "2026-10-11T15:37:09.173Z",
		"size": 224436,
		"path": "../public/assets/Kuchnie2-CB41xgc5.webp"
	},
	"/assets/Kuchnie20-DR8EN8_z.webp": {
		"type": "image/webp",
		"etag": "\"144a0-P4o+/J5l6GeQ+dk90m0TBwtD6fM\"",
		"mtime": "2026-10-11T15:37:09.173Z",
		"size": 83104,
		"path": "../public/assets/Kuchnie20-DR8EN8_z.webp"
	},
	"/assets/Kuchnie22-C_Ken0Vn.webp": {
		"type": "image/webp",
		"etag": "\"4065e-fpcA8b+CwLcNDSTPPQoPz2O6hqQ\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 263774,
		"path": "../public/assets/Kuchnie22-C_Ken0Vn.webp"
	},
	"/assets/Kuchnie23-DoglAapX.webp": {
		"type": "image/webp",
		"etag": "\"4d168-8FuhTEoF8vRgJOsub2TN44DRu4g\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 315752,
		"path": "../public/assets/Kuchnie23-DoglAapX.webp"
	},
	"/assets/Kuchnie24-Br2Q4hQv.webp": {
		"type": "image/webp",
		"etag": "\"1d37a-lGLi2NC25SXq8P3BNbb7Y/VuxFA\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 119674,
		"path": "../public/assets/Kuchnie24-Br2Q4hQv.webp"
	},
	"/assets/Kuchnie11-YQBBk6Bd.webp": {
		"type": "image/webp",
		"etag": "\"d783a-Q/wOcg60Xg2VOPZep1ofhXKZ3pQ\"",
		"mtime": "2026-10-11T15:37:09.171Z",
		"size": 882746,
		"path": "../public/assets/Kuchnie11-YQBBk6Bd.webp"
	},
	"/assets/Kuchnie15-BKJ_InfV.webp": {
		"type": "image/webp",
		"etag": "\"99dc6-kMc/SV+ek8Rb+C0rQgWZ4qk+cjA\"",
		"mtime": "2026-10-11T15:37:09.172Z",
		"size": 630214,
		"path": "../public/assets/Kuchnie15-BKJ_InfV.webp"
	},
	"/assets/Kuchnie16-CZDI2f1g.webp": {
		"type": "image/webp",
		"etag": "\"eafee-R7EI6iLoYmb8jmYW0KiVODVrB2w\"",
		"mtime": "2026-10-11T15:37:09.172Z",
		"size": 962542,
		"path": "../public/assets/Kuchnie16-CZDI2f1g.webp"
	},
	"/assets/Kuchnie13-CgkoOwPL.webp": {
		"type": "image/webp",
		"etag": "\"16b9de-iYov57ADERgFEW98MbpQ/AI8B3A\"",
		"mtime": "2026-10-11T15:37:09.172Z",
		"size": 1489374,
		"path": "../public/assets/Kuchnie13-CgkoOwPL.webp"
	},
	"/assets/Kuchnie17-xgLmkxpm.webp": {
		"type": "image/webp",
		"etag": "\"13d3ae-Mk9bPxiLiMULkvty+vc0RNTrMKU\"",
		"mtime": "2026-10-11T15:37:09.173Z",
		"size": 1299374,
		"path": "../public/assets/Kuchnie17-xgLmkxpm.webp"
	},
	"/assets/Kuchnie18-CrUUf0Gd.webp": {
		"type": "image/webp",
		"etag": "\"19b47a-aBWb1rgBegk4WdUiF6V5lEyDz5Q\"",
		"mtime": "2026-10-11T15:37:09.173Z",
		"size": 1684602,
		"path": "../public/assets/Kuchnie18-CrUUf0Gd.webp"
	},
	"/assets/Kuchnie3-DZiYOteJ.webp": {
		"type": "image/webp",
		"etag": "\"456d8-rqQBfO7gg4HXd1RJ5X/DfvXXpw4\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 284376,
		"path": "../public/assets/Kuchnie3-DZiYOteJ.webp"
	},
	"/assets/Kuchnie4-Cr-gfrSI.webp": {
		"type": "image/webp",
		"etag": "\"c0f0-bFporBANGFJ1RCcDHv46RDgHkxY\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 49392,
		"path": "../public/assets/Kuchnie4-Cr-gfrSI.webp"
	},
	"/assets/Kuchnie5-CsiyQhmu.webp": {
		"type": "image/webp",
		"etag": "\"fbbe-2WA0iqMAxq8kFmxWhSYWLT2I0Zk\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 64446,
		"path": "../public/assets/Kuchnie5-CsiyQhmu.webp"
	},
	"/assets/Kuchnie6-FAfW-4E3.webp": {
		"type": "image/webp",
		"etag": "\"13412-vhDtz0zelBudcTO+nqzkJa+trbw\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 78866,
		"path": "../public/assets/Kuchnie6-FAfW-4E3.webp"
	},
	"/assets/Kuchnie7-DEZDaVWj.webp": {
		"type": "image/webp",
		"etag": "\"f780-tvrYqBRK3ZUfxJQDKDVHhvAUn08\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 63360,
		"path": "../public/assets/Kuchnie7-DEZDaVWj.webp"
	},
	"/assets/Kuchnie8-Bcj1rl3h.webp": {
		"type": "image/webp",
		"etag": "\"c90a-ekmBUIuuHc7TxySMVSuyGHhEMP0\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 51466,
		"path": "../public/assets/Kuchnie8-Bcj1rl3h.webp"
	},
	"/assets/Kuchnie9-BTVyRZlp.webp": {
		"type": "image/webp",
		"etag": "\"e804-PTbSkWt65WY5K3s3EGPMj7HV3fw\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 59396,
		"path": "../public/assets/Kuchnie9-BTVyRZlp.webp"
	},
	"/assets/Meble_wolnostojące1-Dl1UO2Ch.webp": {
		"type": "image/webp",
		"etag": "\"2e4e6-1SlLEuRLs3o6EJ/F0uL3t9//6sw\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 189670,
		"path": "../public/assets/Meble_wolnostojące1-Dl1UO2Ch.webp"
	},
	"/assets/Meble_wolnostojące2-DuDDMEBD.webp": {
		"type": "image/webp",
		"etag": "\"3a92e-Yq49MlhWp4FLMJK2F5sqBInlRAw\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 239918,
		"path": "../public/assets/Meble_wolnostojące2-DuDDMEBD.webp"
	},
	"/assets/Kuchnie14-BlKJUmXK.webp": {
		"type": "image/webp",
		"etag": "\"2102a6-QHLAnHJo513Rv2uuqvtJDn+5bK8\"",
		"mtime": "2026-10-11T15:37:09.172Z",
		"size": 2163366,
		"path": "../public/assets/Kuchnie14-BlKJUmXK.webp"
	},
	"/assets/Meble_wolnostojące3-DXuyIAzA.webp": {
		"type": "image/webp",
		"etag": "\"3aa1e-AqtMq7Gc1i8A53gsLayhAd9M5aI\"",
		"mtime": "2026-10-11T15:37:09.175Z",
		"size": 240158,
		"path": "../public/assets/Meble_wolnostojące3-DXuyIAzA.webp"
	},
	"/assets/Nietypowe_konstrukcje1-DU54Vt4_.webp": {
		"type": "image/webp",
		"etag": "\"1438c-w6YPNrih7NFKQ2fnDzVuQlxC2rc\"",
		"mtime": "2026-10-11T15:37:09.175Z",
		"size": 82828,
		"path": "../public/assets/Nietypowe_konstrukcje1-DU54Vt4_.webp"
	},
	"/assets/Nietypowe_konstrukcje2-DDwSg_ck.webp": {
		"type": "image/webp",
		"etag": "\"38ea0-J91E2b6yYSrwT1du4QwF8zOBhBo\"",
		"mtime": "2026-10-11T15:37:09.175Z",
		"size": 233120,
		"path": "../public/assets/Nietypowe_konstrukcje2-DDwSg_ck.webp"
	},
	"/assets/Peka1-DIKG5YXg.webp": {
		"type": "image/webp",
		"etag": "\"4c80-qa8jdg078Yydc1LVpzd+23VCbbA\"",
		"mtime": "2026-10-11T15:37:09.175Z",
		"size": 19584,
		"path": "../public/assets/Peka1-DIKG5YXg.webp"
	},
	"/assets/Nietypowe_konstrukcje3-BdnkHbtM.webp": {
		"type": "image/webp",
		"etag": "\"2699e-nR35QajVS3FhQnn3iB7wm3jcyiQ\"",
		"mtime": "2026-10-11T15:37:09.175Z",
		"size": 158110,
		"path": "../public/assets/Nietypowe_konstrukcje3-BdnkHbtM.webp"
	},
	"/assets/Peka2-CJePUMhb.webp": {
		"type": "image/webp",
		"etag": "\"d182-1YZnv2QE9HtpXAWmHbgkamiPf04\"",
		"mtime": "2026-10-11T15:37:09.176Z",
		"size": 53634,
		"path": "../public/assets/Peka2-CJePUMhb.webp"
	},
	"/assets/Material_web-j6PJ6rjv.webp": {
		"type": "image/webp",
		"etag": "\"9d270-M11KcXqc/YZIuOmDjCQfD6LERAQ\"",
		"mtime": "2026-10-11T15:37:09.174Z",
		"size": 643696,
		"path": "../public/assets/Material_web-j6PJ6rjv.webp"
	},
	"/assets/Peka3-Bd0Qm81C.webp": {
		"type": "image/webp",
		"etag": "\"41306-4j/ThEZTp35po89/UbuthF8w8Jc\"",
		"mtime": "2026-10-11T15:37:09.176Z",
		"size": 267014,
		"path": "../public/assets/Peka3-Bd0Qm81C.webp"
	},
	"/assets/Peka4-9rQYjeNw.webp": {
		"type": "image/webp",
		"etag": "\"57aa-n5Tv1BVicasi0fG5JcN/HF35tic\"",
		"mtime": "2026-10-11T15:37:09.176Z",
		"size": 22442,
		"path": "../public/assets/Peka4-9rQYjeNw.webp"
	},
	"/assets/Neo_STANDARD-BUr8YrM6.webp": {
		"type": "image/webp",
		"etag": "\"a5792-IHootFAb3EGCGEMwHFH9ZmLGhrY\"",
		"mtime": "2026-10-11T15:37:09.175Z",
		"size": 677778,
		"path": "../public/assets/Neo_STANDARD-BUr8YrM6.webp"
	},
	"/assets/Stał-C04bXG9P.webp": {
		"type": "image/webp",
		"etag": "\"ddda-y/M2l4Mv1sigc5ZzYo4uSTOGgtU\"",
		"mtime": "2026-10-11T15:37:09.176Z",
		"size": 56794,
		"path": "../public/assets/Stał-C04bXG9P.webp"
	},
	"/assets/Meble_wolnostojące4-DAnECdl6.webp": {
		"type": "image/webp",
		"etag": "\"116731-oIhaDELVR8rAY7lvkjfRnOyq/SY\"",
		"mtime": "2026-10-11T15:37:09.175Z",
		"size": 1140529,
		"path": "../public/assets/Meble_wolnostojące4-DAnECdl6.webp"
	},
	"/assets/Meble_wolnostojące5-DI9Xi_E6.webp": {
		"type": "image/webp",
		"etag": "\"1229f0-Gs+VTYmrmeL0FTaC3e/vmYpsc1Y\"",
		"mtime": "2026-10-11T15:37:09.175Z",
		"size": 1190384,
		"path": "../public/assets/Meble_wolnostojące5-DI9Xi_E6.webp"
	},
	"/assets/Zabudowy sięgające kilku metrów  1-CSpVIaCy.webp": {
		"type": "image/webp",
		"etag": "\"23a94-vlKcKkZuUA4e5qlZKh2+IT58qL0\"",
		"mtime": "2026-10-11T15:37:09.185Z",
		"size": 146068,
		"path": "../public/assets/Zabudowy sięgające kilku metrów  1-CSpVIaCy.webp"
	},
	"/assets/Zabudowy sięgające kilku metrów  2-C2hk9MV6.webp": {
		"type": "image/webp",
		"etag": "\"26ef4-BYmf0KUKwUJAqWtGTrb5qj0Zz4Q\"",
		"mtime": "2026-10-11T15:37:09.186Z",
		"size": 159476,
		"path": "../public/assets/Zabudowy sięgające kilku metrów  2-C2hk9MV6.webp"
	},
	"/assets/Zabudowy_ścienne2-CujJs9GB.webp": {
		"type": "image/webp",
		"etag": "\"17142-fR/Os0IMMhyPTQnkAHCecDEJMj0\"",
		"mtime": "2026-10-11T15:37:09.186Z",
		"size": 94530,
		"path": "../public/assets/Zabudowy_ścienne2-CujJs9GB.webp"
	},
	"/assets/Zabudowy_ścienne3-X_n3LmFx.webp": {
		"type": "image/webp",
		"etag": "\"8604-RjHXgqpBE6wjTGIVmyk+3AMgbjg\"",
		"mtime": "2026-10-11T15:37:09.186Z",
		"size": 34308,
		"path": "../public/assets/Zabudowy_ścienne3-X_n3LmFx.webp"
	},
	"/assets/Zabudowy_ścienne4-DCkJfJCR.webp": {
		"type": "image/webp",
		"etag": "\"ce9c-2Msod4X+D6N6IkoZAvXU5SWTyTs\"",
		"mtime": "2026-10-11T15:37:09.186Z",
		"size": 52892,
		"path": "../public/assets/Zabudowy_ścienne4-DCkJfJCR.webp"
	},
	"/assets/Zabudowy_ścienne5-Dr4WQxvk.webp": {
		"type": "image/webp",
		"etag": "\"1fa60-RtCFuU3sPQZV1DKnragO+lOAVVE\"",
		"mtime": "2026-10-11T15:37:09.186Z",
		"size": 129632,
		"path": "../public/assets/Zabudowy_ścienne5-Dr4WQxvk.webp"
	},
	"/assets/Zabudowy_ścienne7-DQzEAVx7.webp": {
		"type": "image/webp",
		"etag": "\"157b2-3yCzmm6G3WL5wNMPo+K+bGNFsug\"",
		"mtime": "2026-10-11T15:37:09.186Z",
		"size": 87986,
		"path": "../public/assets/Zabudowy_ścienne7-DQzEAVx7.webp"
	},
	"/assets/Zabudowy_ścienne6-BkJ3yOFl.webp": {
		"type": "image/webp",
		"etag": "\"17b6a-oA2xutKxqwfluvof1H8tZoFP9ic\"",
		"mtime": "2026-10-11T15:37:09.186Z",
		"size": 97130,
		"path": "../public/assets/Zabudowy_ścienne6-BkJ3yOFl.webp"
	},
	"/assets/Zabudowy_ścienne8-D-J3SskI.webp": {
		"type": "image/webp",
		"etag": "\"fe84-UFmNGLzkNxU6DriMO5J9IvMK1aw\"",
		"mtime": "2026-10-11T15:37:09.186Z",
		"size": 65156,
		"path": "../public/assets/Zabudowy_ścienne8-D-J3SskI.webp"
	},
	"/assets/Zabudowy_ścienne9-CexW5d7t.webp": {
		"type": "image/webp",
		"etag": "\"1d194-M7IHxylrIHolBUuJnzWFXEsvEUs\"",
		"mtime": "2026-10-11T15:37:09.187Z",
		"size": 119188,
		"path": "../public/assets/Zabudowy_ścienne9-CexW5d7t.webp"
	},
	"/assets/hardware-blum-1-DrTC2HIi.jpg": {
		"type": "image/jpeg",
		"etag": "\"17c15-6nDceSG4NVc2EWaE1Nb1mR9lE9Q\"",
		"mtime": "2026-10-11T15:37:09.187Z",
		"size": 97301,
		"path": "../public/assets/hardware-blum-1-DrTC2HIi.jpg"
	},
	"/assets/hardware-peka-1-h7721Q3e.jpg": {
		"type": "image/jpeg",
		"etag": "\"13ab0-nscIWeQmOXapKhuN3IfMwmCcrpI\"",
		"mtime": "2026-10-11T15:37:09.187Z",
		"size": 80560,
		"path": "../public/assets/hardware-peka-1-h7721Q3e.jpg"
	},
	"/assets/index-BNsX_Ng4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6360b-pKD80t54qtI19jqh+LtokDko774\"",
		"mtime": "2026-10-11T15:37:09.168Z",
		"size": 407051,
		"path": "../public/assets/index-BNsX_Ng4.js"
	},
	"/assets/neo-architects-OSwf_BKk.webp": {
		"type": "image/webp",
		"etag": "\"fd56-/lczDw8mM9qh7U1UuNmyJ7Txads\"",
		"mtime": "2026-10-11T15:37:09.187Z",
		"size": 64854,
		"path": "../public/assets/neo-architects-OSwf_BKk.webp"
	},
	"/assets/neo-detail-B7UsLAlk.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fe2f-Fuvn2fhKE7g6bSYbX53kskKGHtc\"",
		"mtime": "2026-10-11T15:37:09.187Z",
		"size": 130607,
		"path": "../public/assets/neo-detail-B7UsLAlk.jpg"
	},
	"/assets/neo-lab-DrqEWoNB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6604-ycb481+unFm+OMjNrjgd7emEmDA\"",
		"mtime": "2026-10-11T15:37:09.169Z",
		"size": 26116,
		"path": "../public/assets/neo-lab-DrqEWoNB.js"
	},
	"/assets/neo-interior-BQQQ1ajo.jpg": {
		"type": "image/jpeg",
		"etag": "\"2d79e-YosNJWo8xBHPhXOszLyHXmlmHLI\"",
		"mtime": "2026-10-11T15:37:09.187Z",
		"size": 186270,
		"path": "../public/assets/neo-interior-BQQQ1ajo.jpg"
	},
	"/assets/neo-logo-wordmark-4YOehfHI.png": {
		"type": "image/png",
		"etag": "\"56a0d-n4uhPj0x0m7YZyU7zasL0gzykIo\"",
		"mtime": "2026-10-11T15:37:09.187Z",
		"size": 354829,
		"path": "../public/assets/neo-logo-wordmark-4YOehfHI.png"
	},
	"/assets/neo-materials-DuCQxpjZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"40b88-PP2qw1yDQOsFbu4a1ScibNOVrIM\"",
		"mtime": "2026-10-11T15:37:09.187Z",
		"size": 265096,
		"path": "../public/assets/neo-materials-DuCQxpjZ.jpg"
	},
	"/assets/VIDEO1-De3FZbIs.mp4": {
		"type": "video/mp4",
		"etag": "\"1d68bd-x9BcwgQFgO17f+eiAqG8qOtfdHo\"",
		"mtime": "2026-10-11T15:37:09.176Z",
		"size": 1927357,
		"path": "../public/assets/VIDEO1-De3FZbIs.mp4"
	},
	"/assets/neo-plans-C-RZToqp.jpg": {
		"type": "image/jpeg",
		"etag": "\"31d8b-wwO3rfX0eVjX8rJAbSnodmOdkbc\"",
		"mtime": "2026-10-11T15:37:09.187Z",
		"size": 204171,
		"path": "../public/assets/neo-plans-C-RZToqp.jpg"
	},
	"/assets/netypowe wymiary1-D0hBpP-i.webp": {
		"type": "image/webp",
		"etag": "\"2e808-GLC+stQA7yy1ken1c1E6V7hg4eQ\"",
		"mtime": "2026-10-11T15:37:09.187Z",
		"size": 190472,
		"path": "../public/assets/netypowe wymiary1-D0hBpP-i.webp"
	},
	"/assets/netypowe wymiary2-rEWx9IhR.webp": {
		"type": "image/webp",
		"etag": "\"2832c-nj0wILjg7X5+8lAXKwasqj2Jp0w\"",
		"mtime": "2026-10-11T15:37:09.187Z",
		"size": 164652,
		"path": "../public/assets/netypowe wymiary2-rEWx9IhR.webp"
	},
	"/assets/routes-Dns9Qjc5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29a2d-IIMeTJAJgVrIOSkpxfZpk3umsGo\"",
		"mtime": "2026-10-11T15:37:09.169Z",
		"size": 170541,
		"path": "../public/assets/routes-Dns9Qjc5.js"
	},
	"/assets/site-footer-signature-DVPqSd_V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2da-0vHTvIClm1JQmTCYUt3sB4RyZlE\"",
		"mtime": "2026-10-11T15:37:09.169Z",
		"size": 41690,
		"path": "../public/assets/site-footer-signature-DVPqSd_V.js"
	},
	"/assets/styles-xsKXCcD-.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"229e8-BKO6L4gRLG9xE4thfL5yU5jyiYo\"",
		"mtime": "2026-10-11T15:37:09.188Z",
		"size": 141800,
		"path": "../public/assets/styles-xsKXCcD-.css"
	},
	"/assets/ukryte drzwi 1-BEnybLWS.webp": {
		"type": "image/webp",
		"etag": "\"47ee-RmhQAEtS8Yj61Wy06AR8mkLvFB0\"",
		"mtime": "2026-10-11T15:37:09.188Z",
		"size": 18414,
		"path": "../public/assets/ukryte drzwi 1-BEnybLWS.webp"
	},
	"/assets/ukryte drzwi 2-F9mmVTsB.webp": {
		"type": "image/webp",
		"etag": "\"9c2e-I4TjiHLTzf6QYOI34HcBB+kfbQM\"",
		"mtime": "2026-10-11T15:37:09.188Z",
		"size": 39982,
		"path": "../public/assets/ukryte drzwi 2-F9mmVTsB.webp"
	},
	"/assets/Главное фото-BJGYtzQV.webp": {
		"type": "image/webp",
		"etag": "\"63e8-6Yl7ZG8brt2eMgMM/ZR14Z7WLi8\"",
		"mtime": "2026-10-11T15:37:09.188Z",
		"size": 25576,
		"path": "../public/assets/Главное фото-BJGYtzQV.webp"
	},
	"/assets/Для тезисов2-nzpfN6Wl.webp": {
		"type": "image/webp",
		"etag": "\"d242-CkYaQrch0maaV4uyuDJLWMwZ3mU\"",
		"mtime": "2026-10-11T15:37:09.188Z",
		"size": 53826,
		"path": "../public/assets/Для тезисов2-nzpfN6Wl.webp"
	},
	"/assets/Для тезисов3-CMxjHuCq.webp": {
		"type": "image/webp",
		"etag": "\"14a80-GxlK4VO9JELSTjd2EmoeSWrCAhw\"",
		"mtime": "2026-10-11T15:37:09.188Z",
		"size": 84608,
		"path": "../public/assets/Для тезисов3-CMxjHuCq.webp"
	},
	"/assets/Для тезисов4-CvZzEcnl.webp": {
		"type": "image/webp",
		"etag": "\"1de2e-nJqfNmpaBebkjJ6+7u0gsLNKk4Y\"",
		"mtime": "2026-10-11T15:37:09.188Z",
		"size": 122414,
		"path": "../public/assets/Для тезисов4-CvZzEcnl.webp"
	},
	"/assets/Для тезисов1-ClWn8gg9.webp": {
		"type": "image/webp",
		"etag": "\"d41de-XiJC6YBV5S4goEJWi17cuLWx4Q8\"",
		"mtime": "2026-10-11T15:37:09.188Z",
		"size": 868830,
		"path": "../public/assets/Для тезисов1-ClWn8gg9.webp"
	},
	"/assets/Фоновая главная-10Dg42et.webp": {
		"type": "image/webp",
		"etag": "\"4ffca0-dxioEqkGKnSQ1uNwRF7BnudRrEg\"",
		"mtime": "2026-10-11T15:37:09.188Z",
		"size": 5242016,
		"path": "../public/assets/Фоновая главная-10Dg42et.webp"
	},
	"/assets/VIDEO2-B7toEKxO.mp4": {
		"type": "video/mp4",
		"etag": "\"33e9157-2OEoytSPdeyrGpgway0ovrlFXag\"",
		"mtime": "2026-10-11T15:37:09.176Z",
		"size": 54432087,
		"path": "../public/assets/VIDEO2-B7toEKxO.mp4"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_y6oe6N = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_y6oe6N
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
