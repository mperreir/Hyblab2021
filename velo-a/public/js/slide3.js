"use strict";

import { initSlide2 } from "./slide2.js";

export const initSlide3 = function(mySlidr){

	document.getElementById("button-classique").onclick = () => {
		document.location.href = "app.html";
	};

	document.getElementById("button-electrique").onclick = () => {
		document.location.href = "app.html";
	};

	document.getElementById("button-pied").onclick = () => {
		document.location.href = "app.html";
	};

	document.getElementById("button-return-page-3").onclick = () => {
		mySlidr.slide('page-2');
	};

}
