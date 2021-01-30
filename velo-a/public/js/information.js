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
		});
	});

	Array.from(document.getElementsByClassName("hover")).forEach((el) => {
		el.addEventListener("mouseleave", () => {
			el.style.visibility = 'hidden';
		});
	});
}

function inRect(x, y, rect) {
	return (x >= rect.left + 10 && x <= rect.right - 10)
		&& (y >= rect.top + 10 && y <= rect.bottom - 10);
}

function slide() {
	const slides = ["pane", "question_velo", "question_trajet"];
	let start = true;
	let i = 0;
	const batiment_return = document.getElementById("batiment_return");

	batiment_return.style.display = "none";
	Array.from(document.getElementsByClassName("batiment_button")).forEach((el) => {
		el.addEventListener('click', () => {
			document.getElementById("batiment").className = "batiment_pause" + i;
			setTimeout(function () {
				document.getElementById("batiment").className = "batiment_move" + (++i);
				if (i <= 0) batiment_return.style.display = "none";
				else {
					batiment_return.style.display = null;
					if (start) {
						velos();
						start = false;
					}
				}
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

async function velos() {

	await startVelos(0);

	let isMovingMouseEnter = false;
	let isMovingClick = false;

	document.querySelectorAll("#question_velo button").forEach((el) => {
		el.addEventListener("mouseenter", () => {
			if (!isMovingMouseEnter) {
				Array.from(document.querySelectorAll(".velo.velo_in:not(#velo_" + el.id + ")")).forEach(async (e) => {
					isMovingMouseEnter = true;
					await sleep(async () => {
						e.setAttribute("class", "velo velo_out");
					}, 2000);
					isMovingMouseEnter = false;
				});


				const velo = document.getElementById("velo_" + el.id);
				velo.setAttribute("class", "velo velo_in");
			}

		});

		el.addEventListener("click", async () => {
			await sleep(
				() => {
					if (!isMovingClick) {
						Array.from(document.querySelectorAll(".velo.velo_in:not(#velo_" + el.id + ")")).forEach(async (e) => {
							isMovingClick = true;
							await sleep(async () => {
								e.setAttribute("class", "velo velo_out");
							}, 2000);
							isMovingClick = false;
						});


						const velo = document.getElementById("velo_" + el.id);
						velo.setAttribute("class", "velo velo_in");
					}

				}, 2000);
		});
	});


}



async function startVelos(i) {
	let e = Array.from(document.querySelectorAll(".velo"))[i];
	if (e != null) {
		await sleep(async () => {
			e.setAttribute("class", "velo velo_in");
			await startVelos(++i)
		}, 200);
	}
	else {
		await sleep(async () => {
			await goVelos(--i)
		}, 1600);
	}
}

async function goVelos(i) {

	let e = Array.from(document.querySelectorAll(".velo"))[i];
	if (e != null && i > 0)
		await sleep(async () => {
			e.setAttribute("class", "velo velo_out");
			await goVelos(--i)
		}, 200);
}

function sleep(callback, time) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(callback()), time)
	})
}
