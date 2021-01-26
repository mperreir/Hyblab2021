export { getAbrisVelos };

function getAbrisVelos(){
    if (window.fetch) {
        var myHeaders = new Headers();
        var myInit = { method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default' };
        var myRequest = new Request('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_stations-velos-libre-service-nantes-metropole&q=&facet=commune&facet=descriptif',myInit);
        fetch(myRequest).then(function(response) {
            var contentType = response.headers.get("content-type");
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

