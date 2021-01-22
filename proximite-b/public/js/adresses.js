function autocompletion(adresse, num){
	var lieu = 'https://api-adresse.data.gouv.fr/search/?q=' + adresse + '&limit=5&autocomplete=1';

    data = [
        {
            "label": "8 Rue Lecourbe 75015 Paris",
            "score": 0.8956081818181817,
            "housenumber": "8",
            "id": "75115_5456_00008",
            "name": "8 Rue Lecourbe",
            "postcode": "75015",
            "citycode": "75115",
            "x": 649373.16,
            "y": 6860763.57,
            "city": "Paris",
            "district": "Paris 15e Arrondissement",
            "context": "75, Paris, Île-de-France",
            "type": "housenumber",
            "importance": 0.85169,
            "street": "Rue Lecourbe"
        },
        {
            "label": "8 Rue Pelleport 33800 Bordeaux",
            "score": 0.8953345454545455,
            "housenumber": "8",
            "id": "33063_7105_00008",
            "name": "8 Rue Pelleport",
            "postcode": "33800",
            "citycode": "33063",
            "x": 418794.38,
            "y": 6420173.97,
            "city": "Bordeaux",
            "context": "33, Gironde, Nouvelle-Aquitaine",
            "type": "housenumber",
            "importance": 0.84868,
            "street": "Rue Pelleport"
        },
        {
            "label": "8 Rue Judaique 33000 Bordeaux",
            "score": 0.8950836363636363,
            "housenumber": "8",
            "id": "33063_4810_00008",
            "name": "8 Rue Judaique",
            "postcode": "33000",
            "citycode": "33063",
            "x": 417075.99,
            "y": 6422239.24,
            "city": "Bordeaux",
            "context": "33, Gironde, Nouvelle-Aquitaine",
            "type": "housenumber",
            "importance": 0.84592,
            "street": "Rue Judaique"
        },
        {
            "label": "8 Rue Nationale 59800 Lille",
            "score": 0.8950463636363636,
            "housenumber": "8",
            "id": "59350_6350_00008",
            "name": "8 Rue Nationale",
            "postcode": "59800",
            "citycode": "59350",
            "oldcitycode": "59350",
            "x": 704424.54,
            "y": 7060017.49,
            "city": "Lille",
            "oldcity": "Lille",
            "context": "59, Nord, Hauts-de-France",
            "type": "housenumber",
            "importance": 0.84551,
            "street": "Rue Nationale"
        },
        {
            "label": "8 Rue Pasteur 33200 Bordeaux",
            "score": 0.8948736363636364,
            "housenumber": "8",
            "id": "33063_6975_00008",
            "name": "8 Rue Pasteur",
            "postcode": "33200",
            "citycode": "33063",
            "x": 415681.44,
            "y": 6422712.31,
            "city": "Bordeaux",
            "context": "33, Gironde, Nouvelle-Aquitaine",
            "type": "housenumber",
            "importance": 0.84361,
            "street": "Rue Pasteur"
        }
    ];

    var datalist = document.getElementById("adresses"+num);
    datalist.innerHTML = "";

	data.forEach((element) => {
        console.log(element.label);
        var option = document.createElement("option");
        option.innerHTML = element.label;
        datalist.appendChild(option);
    })


	/*
	fetch(lieu)
		.then((data) => {
			console.log(data);
			
		});
	*/
}