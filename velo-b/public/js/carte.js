const initCarte = function () {
    d3.xml("assets/carte.svg").then(data => {
        const carte = d3.select("#carte");
        carte.node().append(data.documentElement);

        carte.selectAll("g")
            .style("opacity", .5)
            .on("mouseenter", function () {
                debounce.call(this, this.id, "enter", function () {
                    console.log("[enter] " + this.id);
                    d3.select(this).style("opacity", 1);
                });
            })
            .on("mouseleave", function () {
                debounce.call(this, this.id, "leave", function () {
                    console.log("[leave] " + this.id);
                    d3.select(this).style("opacity", .5);
                });
            })
            .on("click", function () {
                console.log(this.id); // selectionné
                mySlidr.slide('choix-transport-2');
                initSlideChoixVelo();
            });
    });
};

let lastId, lastEvent, lastFn, lastThis;

function debounce(id, event, fn) {
    if (event === "enter" && lastId !== id) {
        lastFn && lastFn.call(lastThis);
        fn.call(this);
    }

    [lastId, lastEvent, lastFn, lastThis] = [id, event, fn, this];
}
