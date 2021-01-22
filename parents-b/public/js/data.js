const form = document.getElementById('postCriteria');
const nbCriteria = document.getElementById('nbCriteria');

function stringToBool(string) {
    return string === 'true';
}

function gardAttribute() {
    const gard = document.getElementById('gard');
    if (gard) {
        gard.value = !stringToBool(gard.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'gard';
        hidden.name = 'gard';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function childGameAttribute() {
    const childGame = document.getElementById('childGame');
    if (childGame) {
        childGame.value = !stringToBool(childGame.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'childGame';
        hidden.name = 'childGame';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function paddlingPoolAttribute() {
    const paddlingPool = document.getElementById('paddlingPool');
    if (paddlingPool) {
        paddlingPool.value = !stringToBool(paddlingPool.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'paddlingPool';
        hidden.name = 'paddlingPool';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function toiletAttribute() {
    const toilet = document.getElementById('toilet');
    if (toilet) {
        toilet.value = !stringToBool(toilet.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'toilet';
        hidden.name = 'toilet';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function handicapToiletAttribute() {
    const handicapToilet = document.getElementById('handicapToilet');
    if (handicapToilet) {
        handicapToilet.value = !stringToBool(handicapToilet.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'handicapToilet';
        hidden.name = 'handicapToilet';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function dogAttribute() {
    const dog = document.getElementById('dog');
    if (dog) {
        dog.value = !stringToBool(dog.value);
    } else {
        console.log("OUI");
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'dog';
        hidden.name = 'dog';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function closedAttribute() {
    const closed = document.getElementById('closed');
    if (closed) {
        closed.value = !stringToBool(closed.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'closed';
        hidden.name = 'closed';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function shelterAttribute() {
    const shelter = document.getElementById('shelter');
    if (shelter) {
        shelter.value = !stringToBool(shelter.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'shelter';
        hidden.name = 'shelter';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function waterAttribute() {
    const water = document.getElementById('water');
    if (water) {
        water.value = !stringToBool(water.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'water';
        hidden.name = 'water';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function tableAttribute() {
    const table = document.getElementById('table');
    if (table) {
        table.value = !stringToBool(table.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'table';
        hidden.name = 'table';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function handicapAccesAttribute() {
    const handicapAcces = document.getElementById('handicapAcces');
    if (handicapAcces) {
        handicapAcces.value = !stringToBool(handicapAcces.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'handicapAcces';
        hidden.name = 'handicapAcces';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function benchesAttribute() {
    const benches = document.getElementById('benches');
    if (benches) {
        benches.value = !stringToBool(benches.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'benches';
        hidden.name = 'benches';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function parkingAttribute() {
    const parking = document.getElementById('parking');
    if (parking) {
        parking.value = !stringToBool(parking.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'parking';
        hidden.name = 'parking';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function restaurantAttribute() {
    const restaurant = document.getElementById('restaurant');
    if (restaurant) {
        restaurant.value = !stringToBool(restaurant.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'restaurant';
        hidden.name = 'restaurant';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function animalsAttribute() {
    const animals = document.getElementById('animals');
    if (animals) {
        animals.value = !stringToBool(animals.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'animals';
        hidden.name = 'animals';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function grassAttribute() {
    const grass = document.getElementById('grass');
    if (grass) {
        grass.value = !stringToBool(grass.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'grass';
        hidden.name = 'grass';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}


function greeneryAttribute() {
    const greenery = document.getElementById('greenery');
    if (greenery) {
        greenery.value = !stringToBool(greenery.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'greenery';
        hidden.name = 'greenery';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}


function crapaAttribute() {
    const crapa = document.getElementById('crapa');
    if (crapa) {
        crapa.value = !stringToBool(crapa.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'crapa';
        hidden.name = 'crapa';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}


function sportAttribute() {
    const sport = document.getElementById('sport');
    if (sport) {
        sport.value = !stringToBool(sport.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'sport';
        hidden.name = 'sport';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}


function activityAttribute() {
    const activity = document.getElementById('activity');
    if (activity) {
        activity.value = !stringToBool(activity.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'activity';
        hidden.name = 'activity';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}


function cultureAttribute() {
    const culture = document.getElementById('culture');
    if (culture) {
        culture.value = !stringToBool(culture.value);
    } else {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = 'culture';
        hidden.name = 'culture';
        hidden.value = 'true';
        form.appendChild(hidden);
        nbCriteria.value = (parseInt(nbCriteria.value) + 1).toString();
    }
}

function main() {
    /*
    // TODO 'garde' sera à remplacer par l'id de l'élément à tester
    const garde = document.getElementById('garde');
    garde.addEventListener('click', gardAttribute);

    // TODO 'jeuxEnfant' sera à remplacer par l'id de l'élément à tester
    const jeuxEnfant = document.getElementById('jeuxEnfant');
    jeuxEnfant.addEventListener('click', childGameAttribute);

    // TODO 'pataugeoire' sera à remplacer par l'id de l'élément à tester
    const pataugeoire = document.getElementById('pataugeoire');
    pataugeoire.addEventListener('click', paddlingPoolAttribute);

    // TODO 'toilette' sera à remplacer par l'id de l'élément à tester
    const toilette = document.getElementById('toilette');
    toilette.addEventListener('click', toiletAttribute);

    // TODO 'toiletteHandicape' sera à remplacer par l'id de l'élément à tester
    const toiletteHandicape = document.getElementById('toiletteHandicape');
    toiletteHandicape.addEventListener('click', handicapToiletAttribute);

    // TODO 'chien' sera à remplacer par l'id de l'élément à tester
    const chien = document.getElementById('chien');
    chien.addEventListener('click', dogAttribute);

    // TODO 'clos' sera à remplacer par l'id de l'élément à tester
    const clos = document.getElementById('clos');
    clos.addEventListener('click', closedAttribute);

    // TODO 'abris' sera à remplacer par l'id de l'élément à tester
    const abris = document.getElementById('abris');
    abris.addEventListener('click', shelterAttribute);

    // TODO 'pointDeau' sera à remplacer par l'id de l'élément à tester
    const pointDeau = document.getElementById('pointDeau');
    pointDeau.addEventListener('click', waterAttribute);

    // TODO 'piqueNique' sera à remplacer par l'id de l'élément à tester
    const piqueNique = document.getElementById('piqueNique');
    piqueNique.addEventListener('click', tableAttribute);

    // TODO 'accesHandicape' sera à remplacer par l'id de l'élément à tester
    const accesHandicape = document.getElementById('accesHandicape');
    accesHandicape.addEventListener('click', handicapAccesAttribute);

    // TODO 'banc' sera à remplacer par l'id de l'élément à tester
    const banc = document.getElementById('banc');
    banc.addEventListener('click', benchesAttribute);

    // TODO 'accesParking' sera à remplacer par l'id de l'élément à tester
    const accesParking = document.getElementById('accesParking');
    accesParking.addEventListener('click', parkingAttribute);

    // TODO 'restauration' sera à remplacer par l'id de l'élément à tester
    const restauration = document.getElementById('restauration');
    restauration.addEventListener('click', restaurantAttribute);

    // TODO 'animal' sera à remplacer par l'id de l'élément à tester
    const animal = document.getElementById('animal');
    animal.addEventListener('click', animalsAttribute);

    // TODO 'herbe' sera à remplacer par l'id de l'élément à tester
    const herbe = document.getElementById('herbe');
    herbe.addEventListener('click', grassAttribute);

    // TODO 'verdure' sera à remplacer par l'id de l'élément à tester
    const verdure = document.getElementById('verdure');
    verdure.addEventListener('click', greeneryAttribute);

    // TODO 'piqueNique' sera à remplacer par l'id de l'élément à tester
    const crapa = document.getElementById('crapa');
    crapa.addEventListener('click', crapaAttribute);

    // TODO 'terrainSport' sera à remplacer par l'id de l'élément à tester
    const terrainSport = document.getElementById('terrainSport');
    terrainSport.addEventListener('click', sportAttribute);

    // TODO 'activite' sera à remplacer par l'id de l'élément à tester
    const activite = document.getElementById('activite');
    activite.addEventListener('click', activityAttribute);

    // TODO 'elementCulture' sera à remplacer par l'id de l'élément à tester
    const elementCulture = document.getElementById('elementCulture');
    elementCulture.addEventListener('click', cultureAttribute);
    */
}

main();
