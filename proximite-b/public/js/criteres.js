function criteres_background() {
    var perso = read_store('personas').chosen;

    var img = document.createElement('img');
    img.src =  '/proximite-b/img/criteres/'+perso+'.svg#svgView(preserveAspectRatio(none))';
    img.id = perso;
// div_content = document.getElementById("critere_page");
//
// if (perso == "famille") {
//     img.id = perso;
// } else if (perso == "jeune") {
//     console.log("test2");
// } else if (perso == "senior") {
//     console.log("test3");
// }
    document.getElementById('persona').appendChild(img);

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
        console.log("Veuillez chosir au moin trois point d'intéret")
    }
}