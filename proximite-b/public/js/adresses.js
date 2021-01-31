var positions = ["", ""];

async function adresses_autocompletion(adresse, num) {
    var lieu = 'https://api-adresse.data.gouv.fr/search/?q=' + adresse + '&limit=5&autocomplete=1&citycode=44109';
    var input = document.getElementById("adresse" + num);
    var list = document.getElementById("adresses" + num);
    list.innerHTML = "";
    positions[num - 1] = "";

    const response = await fetch(lieu)
    var resultAPI = await response.json();
    resultAPI.features.forEach((element) => {
        var button = document.createElement("button");
        button.innerHTML = element.properties.label;
        button.value = [element.geometry.coordinates, element.properties.label];
        button.classList.add("bouton_adresse");
        button.addEventListener("click", () => {
            input.value = button.innerHTML;
            positions[num - 1] = button.value;
            list.innerHTML = "";
        });

        list.appendChild(button);
    })
}

function adresses_validation() {
    if (positions[0] == "" || positions[1] == "") {
        document.getElementById("adresses1").innerHTML = "";
        document.getElementById("adresses2").innerHTML = "";
        $('#modal').modal('show');
        $('#modal').find('.modal-title').text("Problème d'adresse");
        $('#modal').find('.modal-body').text("Veuillez saisir deux adresses qui existent !");
        if (positions[0] == "") {
            document.getElementById("adresse1").value = "";
        }
        if (positions[1] == "") {
            document.getElementById("adresse2").value = "";
        }
    }
    else {
        const A1 = positions[0].split(',');
        const A2 = positions[1].split(',');
        go_to('criteres', {
            adresse1: { longitude: A1[0], latitude: A1[1], label: A1[2] },
            adresse2: { longitude: A2[0], latitude: A2[1], label: A2[2] }
        });
    }
}
