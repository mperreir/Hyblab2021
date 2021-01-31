"use strict";

const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=47.21611&lon=-1.55123&appid=b815d676c65c3c490491dae0736fd632&units=metric&lang=fr&exclude=minutely'

export async function getMeteo() {
	return fetch(baseUrl)
		.then(res => res.json())
		.catch(err => {
		});
}
