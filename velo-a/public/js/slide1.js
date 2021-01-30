import { initSlide2 } from "./slide2.js";

export const initSlide1 = function (mySlidr) {

	document.getElementById("button-home").onclick = () => {
		mySlidr.slide('page-2');
		initSlide2(mySlidr);
	};

}
