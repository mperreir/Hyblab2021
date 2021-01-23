async function autocompletion(adresse, num){
    var lieu = 'https://api-adresse.data.gouv.fr/search/?q=' + adresse + '&limit=5&autocomplete=1';
    
    var datalist = document.getElementById("adresses"+num);
    datalist.innerHTML = "";
    
    const response = await fetch(lieu)
    var resultAPI = await response.json();
    data = [];
    resultAPI.features.forEach(element => {
        data.push(element.properties);
        
    });
    console.log(data);
    data.forEach((element) => {
        console.log(element.label);
        var option = document.createElement("option");
        option.innerHTML = element.label;
        datalist.appendChild(option);
    })
}