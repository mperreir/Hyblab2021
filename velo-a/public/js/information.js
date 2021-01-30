"use strict";

async function bootstrap() {
	slide();

	togglePath();

}

window.addEventListener('DOMContentLoaded', () => {
	bootstrap();
});


function togglePath() {
	Array.from(document.getElementsByClassName("base")).forEach((el, index) => {
		el.addEventListener("mouseenter", () => {
			const hover = document.getElementsByClassName("hover")[index];
			if (hover.style.visibility !== 'visible')
				hover.style.visibility = 'visible';
			console.log("base")
		});
	});

	Array.from(document.getElementsByClassName("hover")).forEach((el) => {
		el.addEventListener("mouseleave", () => {
			el.style.visibility = 'hidden';
			console.log("hover")

		});
	});
}

function inRect(x, y, rect) {
	return (x >= rect.left + 10 && x <= rect.right - 10)
		&& (y >= rect.top + 10 && y <= rect.bottom - 10);
}

function slide() {
	const slides = ["pane", "question_velo", "question_trajet"];
	let i = 0;
	const batiment_return = document.getElementById("batiment_return");

	batiment_return.style.display = "none";
	Array.from(document.getElementsByClassName("batiment_button")).forEach((el) => {
		el.addEventListener('click', () => {
			document.getElementById("batiment").className = "batiment_pause" + i;
			setTimeout(function () {
				document.getElementById("batiment").className = "batiment_move" + (++i);
				console.log(i)
				if (i <= 0) batiment_return.style.display = "none";
				else batiment_return.style.display = null;
			}, 50);

		});
	});
	batiment_return.addEventListener('click', () => {
		document.getElementById("batiment").className = "batiment_pause" + i;
		setTimeout(function () {
			document.getElementById("batiment").className = "batiment_back" + (i--);
			if (i <= 0) {
				batiment_return.style.display = "none";
			}

			const el = document.querySelector(".show > .batiment_button");

			el.parentElement.setAttribute("class", "hide");
			document.getElementById(slides[slides.indexOf(el.parentElement.id) - 1]).setAttribute("class", "show");


		}, 50);
	});

	document.querySelectorAll(".batiment_button").forEach((el, index, list) => {
		if (el.parentElement.id !== slides[0]) {
			el.parentElement.setAttribute("class", "hide_start");
		}
		el.addEventListener("click", () => {
			el.parentElement.setAttribute("class", "hide");
			document.getElementById(slides[slides.indexOf(el.parentElement.id) + 1]).setAttribute("class", "show");
		});
	});
}
