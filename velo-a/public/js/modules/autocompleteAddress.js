"use strict";

const mapboxAPIKEY = 'pk.eyJ1IjoiZGpvdmFubmlmb3VpbiIsImEiOiJja2szdGpvMHQxZW1sMm9vNWp0eHJ6ZXR1In0.KJzAGbwYjUS20dFd37YZgw';

export async function reverseGeocoding(input) {
	return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(input)}.json?access_token=${mapboxAPIKEY}&autocomplete=false`)
		.then(response => response.json())
		.then(data => {
			return data.features[0].place_name;
		})
		.catch(e => {
			console.error(e);
		});
}

async function getAddress(input) {
	return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(input)}.json?access_token=${mapboxAPIKEY}&autocomplete=true&bbox=-1.7951350420290169%2C47.116367346841514%2C-1.3050286308555314%2C47.33902195868899&limit=10`)
		.then(response => response.json())
		.then(data => {
			const tmp = {};
			data.features.forEach(value => {
				tmp[value.place_name] = value.geometry.coordinates;
			});
			return tmp;
		})
		.catch(e => {
		});
}


export async function autocompleteAddress(inp, container, type) {
	let currentFocus;
	inp.addEventListener("input", async function (e) {
		let a, b, i, val = this.value;
		closeAllLists();
		if (!val || val.length <= 3) {
			return false;
		}
		currentFocus = -1;

		const data = await getAddress(val);
		const arr = Object.keys(data);

		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		container.appendChild(a);
		for (i = 0; i < arr.length; i++) {
			if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
				b = document.createElement("DIV");
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				b.addEventListener("click", function (e) {
					inp.value = this.getElementsByTagName("input")[0].value;
					localStorage.setItem(type, inp.value);
					localStorage.setItem(type + "Coord", data[inp.value]);

					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	inp.addEventListener("keydown", function (e) {
		let x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode === 40) {
			currentFocus++;
			addActive(x);
		} else if (e.keyCode === 38) { //up
			currentFocus--;
			addActive(x);
		} else if (e.keyCode === 13) {
			e.preventDefault();
			if (currentFocus > -1) {
				if (x) x[currentFocus].click();
			}
		}
	});

	function addActive(x) {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		x[currentFocus].classList.add("autocomplete-active");
	}

	function removeActive(x) {
		for (let i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}

	function closeAllLists(elmnt) {
		const x = document.getElementsByClassName("autocomplete-items");
		for (let i = 0; i < x.length; i++) {
			if (elmnt !== x[i] && elmnt !== inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}

	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}