const disabledZone = "centre";

registerSlide("page-carte", function () {
    d3.xml("assets/carte.svg").then(data => {
        const carte = d3.select("#carte");
        // clear au cas où des cartes sont déjà présentes
        carte.html("");
        carte.node().append(data.documentElement);

        carte.selectAll("g")
            .style("opacity", .5)
            .on("mouseenter", function () {
                debounce.call(this, this.id, "enter", function () {
                    console.log("[enter] " + this.id);
                    d3.select(this).transition().duration(200).style("opacity", 1);
                });
            })
            .on("mouseleave", function () {
                debounce.call(this, this.id, "leave", function () {
                    console.log("[leave] " + this.id);
                    d3.select(this).transition().duration(200).style("opacity", .5);
                });
            })
            .on("click", function () {
                if (this.id === disabledZone)
                    return;

                console.log(this.id); // selectionné
                zoneChoisie = this.id;
                goToSlide('choix-transport-velo');
            });
    });
});

let lastId, lastEvent, lastFn, lastThis;

function debounce(id, event, fn) {
    if (this.id === disabledZone)
        return;

    if (event === "enter" && lastId !== id) {
        lastFn && lastFn.call(lastThis);
        fn.call(this);
    }

    [lastId, lastEvent, lastFn, lastThis] = [id, event, fn, this];
}
