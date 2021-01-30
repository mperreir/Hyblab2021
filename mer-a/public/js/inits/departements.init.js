'use strict';

/**
 * The main function in ASYNC.
 */
(async () => {
	await getRegionsId(r => deps.data = r);
	generateMap(mapFusion);
})();

/**
 * When the window is resized, we reload the map.
 */
window.addEventListener("resize", function(e) {
	generateMap(mapFusion);
});