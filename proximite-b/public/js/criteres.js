function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    if(ev.target.id == "div2" && ev.target.children.length < 5){
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
    else if(ev.target.id == "div3" && ev.target.children.length < 3){
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }else if(ev.target.id == "div1"){
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

}
function submitInterest() {
    var div2 = document.getElementById("div2");
    var div3 = document.getElementById("div3");
    let result =  new Array();
    let interest = new Array();
    let disinterest = new Array();

    if(div2.children.length >= 3){

        for (let child1 of div2.children) {
            interest.push(child1.id);
        }

        for (let child2 of div3.children) {
            disinterest.push(child2.id);
        }
        result.push(interest);
        result.push(disinterest);
        // console.log(interest);
        // console.log(disinterest);

        fetch("/proximite-b/timeline.html", {
            method: "POST",
            body: JSON.stringify(result)
        }).then(res => {
            console.log("Request complete! response:", res);
        });
    }else {
        console.log("Veuillez chosir au moin trois point d'intéret")
    }



}