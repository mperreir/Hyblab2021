"use strict";

async function bootstrap() {
	const animation = bodymovin.loadAnimation({
		container: document.getElementById('lottie'), // Required
		path: 'resources/home.json', // Required
		renderer: 'svg', // Required
		loop: false, // Optional
		autoplay: false, // Optional
		name: "home page", // Name for future reference. Optional.
		rendererSettings: {
			preserveAspectRatio: "xMaxYMax meet"
		}
	})

	animation.addEventListener("DOMLoaded", () => {
		animation.play();

		animation.addEventListener('complete', () => {
			document.location = 'information.html';
		});

	})
}

window.addEventListener('DOMContentLoaded', () => {
	bootstrap();
});
