"use strict";

async function bootstrap() {
	movingBatiment();
	paneHide();
	togglePath();

}

bootstrap();


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

function movingBatiment() {
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
				document.getElementById("pane").setAttribute("class", "show");

			}
		}, 50);
	});
}

function paneHide() {
	document.querySelectorAll("#pane .batiment_button").forEach((el) => {
		el.addEventListener("click", () => {
			document.getElementById("pane").setAttribute("class", "hide");
		});
	})
}
