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

        let prediction = [[], []];
        
        const data_hourly = data_plage.hourly;
        const data_daily = data_plage.daily;

        for (const p of data_hourly) {

            let i = data_daily.findIndex(elem => p.dt < elem.dt)

            prediction[0].push({
                time: p.dt,
                temperature: p.temp,
                feels_like: p.feels_like,
                weather: p.weather.main,
                sunrise: data_daily[i].sunrise,
                sunset: data_daily[i].sunset
            });
        }

        for (let i = 2; i<data_daily.length; i++) {
            prediction[1].push({
                time: data_daily[i].dt,
                temperature: data_daily[i].temp,
                feels_like: data_daily[i].feels_like,
                weather: data_daily[i].weather.main,
                sunrise: data_daily[i].sunrise,
                sunset: data_daily[i].sunset
            });
        }

        weather.push(prediction);
    }

    return weather;
}

exports.filter_time = (weather, filtres) => {


    let new_weather = [];
    
    for (let i=0; i<weather.length; i++) {
        let new_weather_plage = [];
        for (let j = 0; j<weather[i][0].length; j++) {
            let weather_time = weather[i][0][j];
            const dawn = filtres.time === "dawn"  && weather_time.time > weather_time.sunrise - 3600 - 5400 && weather_time.time < weather_time.sunrise - 3600 + 5400;
            const day = filtres.time  === "day"   && weather_time.time > weather_time.sunrise - 3600 + 5400 && weather_time.time < weather_time.sunset  - 3600 - 5400;
            const dusk = filtres.time === "dusk"  && weather_time.time > weather_time.sunset  - 3600 - 5400 && weather_time.time < weather_time.sunset  - 3600 + 5400;
            const night = filtres.time === "night" && weather_time.time > weather_time.sunset  - 3600 + 5400 && weather_time.time < weather_time.sunrise - 3600 - 5400;
            if (dawn || day || dusk || night) {
                    weather_time.time    = new Date(weather_time.time    * 1000);
                    weather_time.sunrise = new Date(weather_time.sunrise * 1000);
                    weather_time.sunset  = new Date(weather_time.sunset  * 1000);
                    new_weather_plage.push(weather_time);
            }
        }
        for (let j = 0; j<weather[i][1].length; j++) {
            let weather_time = weather[i][1][j];
            let time = (filtres.time == "dawn" ? "morn" : filtres.time == "day" ? "day" : filtres.time == "dusk" ? "eve" : "night");
            weather_time.time    = new Date(weather_time.time    * 1000);
            weather_time.sunrise = new Date(weather_time.sunrise * 1000);
            weather_time.sunset  = new Date(weather_time.sunset  * 1000);
            weather_time.temperature = weather_time.temperature[time];
            weather_time.feels_like = weather_time.feels_like[time];
            new_weather_plage.push(weather_time);
        }

        new_weather.push(new_weather_plage);
    }

    return new_weather
}
