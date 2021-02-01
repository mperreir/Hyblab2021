export function slide(onStart, onContinue, slides) {

	velosSlide();
	nuagesSlide();

	let start = true;
	let i = 0;
	const batiment_return = document.getElementById("batiment_return");

	batiment_return.style.display = "none";
	document.querySelectorAll(".batiment_button").forEach((el) => {
		if (slides == null || slides[slides.length - 1] !== el.parentElement.id)
			el.addEventListener('click', () => {
				document.getElementById("batiment").className = "batiment_pause" + i;
				setTimeout(function () {
					document.getElementById("batiment").className = "batiment_move" + (++i);
					if (i <= 0) batiment_return.style.display = "none";
					else {
						batiment_return.style.display = null;
						if (start) {
							onStart();
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

			onContinue(el, slides, false);

		}, 50);
	});

	document.querySelectorAll(".batiment_button").forEach((el, index, list) => {
		if (slides == null || el.parentElement.parentElement.id !== slides[0]) {
			el.parentElement.setAttribute("class", "hide_start");
		}
		if (slides == null || slides[slides.length - 1] !== el.parentElement.id)
			el.addEventListener("click", () => {
				onContinue(el, slides, true);
			});
	});

}

function velosSlide() {

	_velosSlide([
		"src=\"img/velos/simple.svg\" alt=\"Vélo classique\"",
		"src=\"img/velos/elec.svg\" alt=\"Vélo électrique\"",
		"src=\"img/velos/bicloo.svg\" alt=\"Le bicloo\""
	], 0);
}

function _velosSlide(velos, i) {
	const time = Math.floor(Math.random() * 5000);
	setTimeout(function () {
		const rand = Math.round(Math.random() * 2);

		const background_velos = document.getElementById("background_velos");
		background_velos.insertAdjacentHTML('beforeend',
			"<img id='background_velo" + i + "' class='background_velo move" + Math.round(Math.random()) + "' " + velos[rand] + "/>"
		);
		setTimeout(function () {
			background_velos.firstChild.remove();
		}, 10000);
		_velosSlide(velos, ++i);
	}, time);
}


function nuagesSlide() {

	_nuagesSlide([
		'src="img/background/cloud1.svg" alt="Vélo classique"',
		'src="img/background/cloud2.svg" alt="Vélo électrique"'
	], 0);
}

function _nuagesSlide(nuages, i) {
	const time = Math.floor(Math.random() * 10000);
	setTimeout(function () {
		const rand = Math.round(Math.random());

		const background_nuages = document.getElementById("background_nuages");
		background_nuages.insertAdjacentHTML('beforeend',
			"<img alt='nuage' id='background_nuage" + i + "' "
			+ "class='background_nuage move" + Math.round(Math.random())
			+ "' " + nuages[rand]
			+ "/>"
		);

		background_nuages.lastElementChild.style.setProperty("--nuage-top", Math.floor(Math.random() * 35) + "%");
		background_nuages.lastElementChild.style.setProperty("--nuage-size", (Math.floor(Math.random() * 100) + 100) + "px");
		setTimeout(function () {
			background_nuages.firstChild.remove();
		}, 35000);
		_nuagesSlide(nuages, ++i);
	}, time);
}
