import { initSlide3 } from "./slide3.js";

export const initSlide2 = function (mySlidr) {

	document.getElementById("button-velotafer").onclick = () => {
		mySlidr.slide('page-3');
		initSlide3(mySlidr);
	};

	document.getElementById("button-velododo").onclick = () => {
		mySlidr.slide('page-3');
		initSlide3(mySlidr);
	};

	document.getElementById("button-rouler").onclick = () => {
		mySlidr.slide('page-3');
		initSlide3(mySlidr);
	};

	document.getElementById("button-velodrouiller").onclick = () => {
		mySlidr.slide('page-3');
		initSlide3(mySlidr);
	};

	document.getElementById("button-return-page-2").onclick = () => {
		mySlidr.slide('page-1');
	};

}
