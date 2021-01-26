window.onload = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page');

    let p = [];

    switch(page) {
        case "météo" :
            document.getElementById("h2-question").innerText = "Quelle est la température annuelle à Nantes ?";

            document.getElementById("button-reponse-1").innerText = "8.4°C";
            document.getElementById("button-reponse-2").innerText = "11.6°C";
            document.getElementById("button-reponse-3").innerText = "15°C";
            document.getElementById("button-reponse-4").innerText = "19.3°C";

            document.getElementById("div-info-question").innerHTML = "";

            p.push(document.createElement("p").appendChild(document.createTextNode("En moyenne, la " +
                "température annuelle de la ville est de 11.6°C. Le climat à Nantes est dit tempéré chaud et est de " +
                "type Cfb, c’est-à-dire qu’il est tempéré chaud sans saison sèche et à été tempéré, selon la " +
                "classification Köppen-Geiger qui est la classification des climats fondée sur les précipitations et températures.")));

            p.push(document.createElement("p").appendChild(document.createTextNode("Mais attention ! A " +
                "Nantes, la pluie est assez fréquente puisque de fortes averses s’abattent tout l’année sur Nantes, " +
                "même lors des mois les plus secs où les précipitations restent importantes. En tout, les " +
                "précipitations annuelles moyennes sont de 786 mm.")));

            p.push(document.createElement("p").appendChild(document.createTextNode("D’ailleurs le " +
                "savais-tu ? Le vêtement de pluie est un incontournable du cycliste quotidien nantais !")));

            p.push(document.createElement("p").appendChild(document.createTextNode("Source : climate-data.org")));

            break;

        case "pollution" :
            document.getElementById("h2-question").innerText = "Combien de CO2 par gramme permet de sauver un kilomètre parcouru en vélo ?";

            document.getElementById("button-reponse-1").innerText = "5 grammes";
            document.getElementById("button-reponse-2").innerText = "12 grammes";
            document.getElementById("button-reponse-3").innerText = "22 grammes";
            document.getElementById("button-reponse-4").innerText = "30 grammes";

            document.getElementById("div-info-question").innerHTML = "";

            p.push(document.createElement("p").appendChild(document.createTextNode("En termes de " +
                "transport, le vélo est LA solution idéale pour tenter de réduire sa consommation de CO2 relâché dans " +
                "l’atmosphère. En plus d’être peu onéreux et un excellent moyen de pratiquer une activité " +
                "physique quotidienne, le vélo permet en effet d’économiser 30 grammes de CO2 par kilomètre parcouru.")));

            p.push(document.createElement("p").appendChild(document.createTextNode("Allez, sors ton " +
                "maillot de cycliste pour le bien de la planète !")));

            p.push(document.createElement("p").appendChild(document.createTextNode("Source : citycle.com")));

            break;

        case "activité" :
            document.getElementById("h2-question").innerText = "1h de vélo à 15 km/h permet d’éliminer :";

            document.getElementById("button-reponse-1").innerText = "un burger ou une pizza (~500 calories)";
            document.getElementById("button-reponse-2").innerText = "une canette de coca (~140 calories)";
            document.getElementById("button-reponse-3").innerText = "100g grammes de fraises tagada (~360 calories)";
            document.getElementById("button-reponse-4").innerText = "Une bière bien fraîche 6% (~ 50 calories)";

            document.getElementById("div-info-question").innerHTML = "";

            p.push(document.createElement("p").appendChild(document.createTextNode("En plus d’éliminer " +
                "500 calories en 1h, faire du vélo améliore l’endurance, mais aussi l’équilibre. Il permet de se " +
                "muscler, notamment au niveau des mollets, cuisses et fessiers. De plus, il n’a pas de contre-indication, " +
                "autrement dit tout le monde peut l’utiliser même pour de la rééducation. Alors, plus aucune excuse !")));

            p.push(document.createElement("p").appendChild(document.createTextNode("https://www.mangerbouger.fr/Le-Mag/Vie-Pratique/Velo-on-a-tous-une-bonne-raison-de-pedaler-!")));

            break;

        case "VAE" :
            document.getElementById("h2-question").innerText = "Quel est le montant maximal du bonus à l’achat " +
                "d’un VAE (Vélo à assistance électrique) versé par l’Etat en 2020 ? ";

            document.getElementById("button-reponse-1").innerText = "50 euros";
            document.getElementById("button-reponse-2").innerText = "100 euros";
            document.getElementById("button-reponse-3").innerText = "150 euros ";
            document.getElementById("button-reponse-4").innerText = "200 euros ";

            document.getElementById("div-info-question").innerHTML = "";

            p.push(document.createElement("p").appendChild(document.createTextNode("En plus d’éliminer " +
                "500 calories en 1h, faire du vélo améliore l’endurance, mais aussi l’équilibre. Il permet de se " +
                "muscler, notamment au niveau des mollets, cuisses et fessiers. De plus, il n’a pas de contre-indication, " +
                "autrement dit tout le monde peut l’utiliser même pour de la rééducation. Alors, plus aucune excuse !")));

            p.push(document.createElement("p").appendChild(document.createTextNode("https://www.mangerbouger.fr/Le-Mag/Vie-Pratique/Velo-on-a-tous-une-bonne-raison-de-pedaler-!")));

            break;

    }

    p.forEach(elem => {
        document.getElementById("div-info-question").appendChild(elem);
    });

    document.getElementById("button-return-question").onclick = () => {
        document.location.href = "app.html";
    };

}
