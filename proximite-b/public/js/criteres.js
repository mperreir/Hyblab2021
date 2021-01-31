function criteres_background() {
    var perso = read_store('personas').chosen;

    var img = document.createElement('img');
    img.src =  '/proximite-b/img/criteres/'+perso+'.svg#svgView(preserveAspectRatio(none))';
    img.id = perso;
    document.getElementById('persona').appendChild(img);

    var sort = document.getElementById('sortable1');
    for (let child of sort.children) {
        console.log(child.id);
        child.style.backgroundImage = "url(/proximite-b/img/criteres/icons/"+child.id+".svg)";
        child.style.backgroundRepeat = "no-repeat";
    }
}

function criteres_submitInterest() {
    var ul2 = document.getElementById("sortable2");
    var ul3 = document.getElementById("sortable3");
    let interest = new Array();
    let disinterest = new Array();

    if(ul2.children.length >= 3){
        for (let child1 of ul2.children) {
            interest.push(child1.id);
        }

        for (let child2 of ul3.children) {
            disinterest.push(child2.id);
        }

        go_to('timeline', {'interests': interest, 'disinterests': disinterest});
    } else {
        $('#modal').modal('show');
        $('#modal').find('.modal-title').text("Pas assez de points d'intérêts");
        $('#modal').find('.modal-body').text("Veuillez sélectionner au moins trois points d'intérêts");
    }
}