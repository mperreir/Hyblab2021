exports.api_fetch = async (plages) => {
    
    const fetch = require('node-fetch');
    const cst = require("./constants.json");

    let data = [];

    for (const node of plages) {

        const response_weather = await fetch(cst.openweather.api_url + `lat=${node.latitude}&lon=${node.longitude}&appid=${cst.openweather.key}`);

        if (!response_weather.ok) {
            if (response_weather.status == 401) {
                return `Error: You need to input an an API key in the file: mer-b/back/constants.json`;
            } else {
                return `An error has occured (${response_weather.status}) when fetching on the openweathermap api.`;
            }
        }

        const data_node = await response_weather.json();
        data.push(data_node)
    }
    return data
}

exports.format = (data) => {

    weather = [];

    for (const data_plage of data) {

        const prediction = [];

        prediction.push(data_plage.current.dt)
        
        const prediction_hourly = data_plage.hourly;
        const prediction_daily = data_plage.daily;

        for (const p of prediction_hourly) {
            prediction.push({
                time: p.dt,
                temperature: p.temp,
                feels_like: p.feels_like,
                weather: p.weather.main,
                sunrise: prediction_daily[Math.floor(prediction_hourly.indexOf(p)/24)].sunrise,
                sunset: prediction_daily[Math.floor(prediction_hourly.indexOf(p)/24)].sunset
            });
        }

        for (let i = 2; i<prediction_daily.length; i++) {
            prediction.push({
                time: prediction_daily[i].dt,
                temperature: prediction_daily[i].temp,
                feels_like: prediction_daily[i].feels_like,
                weather: prediction_daily[i].weather.main,
                sunrise: prediction_daily[i].sunrise,
                sunset: prediction_daily[i].sunset
            });
        }

        weather.push(prediction);
    }

    return weather;
}
