var positions = ["",""]

async function autocompletion(adresse, num) {
    var lieu = 'https://api-adresse.data.gouv.fr/search/?q=' + adresse + '&limit=5&autocomplete=1';
    var input = document.getElementById("adresse" + num);

    var datalist = document.getElementById("adresses"+num);
    datalist.innerHTML = "";
    
    const response = await fetch(lieu)
    var resultAPI = await response.json();
    data = [];
    resultAPI.features.forEach(element => {
        data.push(element.properties);
    });
    data.forEach((element) => {
        var button = document.createElement("button");
        button.innerHTML = element.label;
        button.value = [element.x, element.y];
        button.classList.add("bouton_adresse");
        button.addEventListener("click", () => {
            input.value = button.innerHTML;
            positions[num - 1] = button.value;
            datalist.innerHTML = "";
        });
        datalist.appendChild(button);
    })
}

function validation() {
    console.log(positions);
    if (positions[0] == "" || positions[1] == "") {
        console.log("saisir une adresse qui existe !");
    }
    else {
        console.log("redirection vers page suivante");
    }
}