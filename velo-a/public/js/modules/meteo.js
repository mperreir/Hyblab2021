
const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=47.21611304880233&lon=-1.5512347469335737&lang=fr&appid=b815d676c65c3c490491dae0736fd632'

export function getMeteoNow(){
    getMeteoByTime(null)
}

export function getMeteoByTime(dateTime){
    if (window.fetch) {
        const myInit = {
            method: 'GET',
            headers: new Headers(),
            mode: 'cors',
            cache: 'default'
        };
        const exclude = "&exlude=" + (dateTime === null ? 'minutely,hourly,daily,alerts' : 'current,minutely,alerts');
        const myRequest = new Request(baseUrl + exclude, myInit);
        fetch(myRequest).then(function(response) {
            const contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function(json) {
                    console.log(json);
                });
            } else {
                console.log("Oops, nous n'avons pas du JSON!");
            }
        });
    } else {
        console.log("Pas de support pour fetch");
    }
}
