"use strict";

const MONUMENTS_API_URL = "resources/monuments.json";

/**
 * Fetch "monuments" of Nantes Metropole and return them
 * @return {Promise<any>} - Monuments
 */
const monumentsFetchData = () => fetch(MONUMENTS_API_URL)
	.then(response => {
		return response.json();
	})
	.catch(() => {
		// console.error("Error:", error);
		return undefined;
	});

let data;

/**
 * Give "Monuments" markers in Nantes Metropole
 * @return {Promise<[]>} Markers
 */
export async function monumentsDisplayData() {
	if (!data) data = await monumentsFetchData();

	return data.monuments;
}
