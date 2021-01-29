
var TimeKnots = {


    /**
     * Function used to generate a modal that allow user 
     * to have more information about a "categorie"
     * 
     * @param {*} d d is an object of this form : 
     * {
     *   "img": "./img/timeline/market.svg",
     *   "categorie": "Supermache",
     *   "data": [
     *      { temps: 5, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
     *      { temps: 9, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
     *    ]
     *    }
     */
    createSingleModal: function (d) {
        var firstAdress = d.data[0]
        var otherAdress = d.data.slice(1);
        var disinterests = _app_stores['criteres']['disinterests'];

        var preference = 'interests';
        if (disinterests.includes(d.categorie)) { var preference = 'disinterests' };
        $('#closeModal').css("background-image", "url(" + '/proximite-b/img/timeline/modal/' + preference + '/croix.svg' + ")");


        $("#firstItemSingleModal")
            .html(
                '<div class="px-5 row" style="width: 100vw;">' +
                '<div class="col">' +
                '<img id="imgCat" src=' + d.img + '>' +
                '</div>' +
                '<div class="col-11">' +

                '<div class="row"><h3>' +
                firstAdress.nom +
                '</h3></div>' +
                '<div class="row headerAddTemps">' +
                '<div class="col-6 text-left">' +
                '<img class="iconModal" src="/proximite-b/img/timeline/modal/' + preference + '/point.svg">' +
                firstAdress.adresse +
                '</div>' +
                '<div class="col-6 text-left">' +
                '<img class="iconModal" src="/proximite-b/img/timeline/modal/' + preference + '/personnage.svg">' +

                'Temps à pied : ' +
                firstAdress.temps +
                ' minutes</div>' +
                '</div>' +
                '</div></div>');

        $("#otherItemsSingleModal").attr('class', 'modal-body ' + preference + 'ColorModal');
        $("#otherItemsSingleModal").html("")
        //  = $('<div>').css('padding-bottom', "4em");
        var divContent = $('<div>').css('padding-bottom', "4em").attr('class', 'row');


        if (otherAdress.length >= 1) {
            var i = 0;
            var col1 = $('<div>').attr('class', 'col');
            var ul1 = $('<ul>');
            col1.append(ul1);
            var col2 = $('<div>').attr('class', 'col');
            var ul2 = $('<ul>');
            col2.append(ul2);


            otherAdress.forEach(element => {
                if (i >= 5) {
                    ul2.append('<li><p><b>' + element.nom + '</b></p>' + '<p style="font-size:10px">' + element.temps + ' min - ' + element.adresse + '</p></li>');
                }
                else {
                    ul1.append('<li><p><b>' + element.nom + '</b></p>' + '<p style="font-size:10px">' + element.temps + ' min - ' + element.adresse + '</p></li>');
                }
                i++;
            });
            divContent.append(col1);
            if (i >= 5) divContent.append(col2);
            $("#otherItemsSingleModal").append(divContent)

        }
        else {
            $("#otherItemsSingleModal").html("<p>Il n'y a pas d'autre " + d.categorie.toLowerCase() + " à proximité.")
        }
        $("#singleModal").modal('show');
    },

    /**
     * Function used to generate a modal that allow user 
     * to go through items on the same time level
     * 
     * @param {*} d is an ARRAY of object of this form :
     * * {
     *   "img": "./img/timeline/market.svg",
     *   "categorie": "Supermache",
     *   "data": [
     *      { temps: 5, nom: "Boulang1", adresse: "184 Rue XXXXX XX XXX" },
     *      { temps: 9, nom: "Boulang3", adresse: "4 Rue XXX XX XXX" },
     *    ]
     *    }
     */
    createMultipleModal: function (d) {
        console.log(d)
        $("#bodyMultipleModal").html("");

        var col1 = $('<div>').attr('class', 'col');
        var ul1 = $('<ul>');
        col1.append(ul1);

        d.forEach(element => {

            var li = $('<li>');
            var p = $('<p>');
            var img = $('<img>'); //Equivalent: $(document.createElement('img'))
            img.attr("width", 75);
            img.attr("height", 75);
            img.on('click', function () {
                $("#multipleModal").modal('hide');
                TimeKnots.createSingleModal(element)
            });
            img.attr('src', element.img);
            p.append(img)
            p.append('<b>' + element.categorie + ' : </b>' + element.data[0].adresse)
            li.append(p)
            ul1.append(li)
        })
        $("#bodyMultipleModal").append(col1)
        $("#multipleModal").modal('show');
    },
    /**
     * This function is used to generate the timeline and draw it
     * @param {*} id 
     * @param {*} events 
     * @param {*} options 
     */
    draw: function (id, events, options) {
        var cfg = {
            width: 600,
            height: 200,
            radius: 25,
            lineWidth: 4,
            color: ["#999", "#999"],
            background: "#FFF",
            showLabels: false,
            waiting_time: 1000
        };


        //default configuration overrid
        if (options != undefined) {
            for (var i in options) {
                cfg[i] = options[i];
            }
        }







        d3.select(id).selectAll("svg").remove();
        var tip = d3.select(id)
            .append('div')
            .style("opacity", 0)
            .style("position", "absolute")
            .style("font-family", "Helvetica Neue")
            .style("font-weight", "300")
            .style("background", "rgba(0,0,0,0.5)")
            .style("color", "white")
            .style("padding", "5px 10px 5px 10px")
            .style("-moz-border-radius", "8px 8px")
            .style("border-radius", "8px 8px");
        var svg = d3.select(id).append('svg').attr("width", cfg.width).attr("height", cfg.height);


        //Calculate times in terms of timestamps
        var timestamps = events.map(function (d) { if (d.data.length >= 1) { return d.data[0].temps } else { return 0 } });//new Date(d.date).getTime()});
        var maxValue = d3.max(timestamps);
        var minValue = d3.min(timestamps);


        var margin = (d3.max(events.map(function (d) { return d.radius })) || cfg.radius) * 1.5 + cfg.lineWidth;
        var step = ((cfg.width - 2 * margin) / (maxValue - minValue));
        if (maxValue == minValue) { step = 0; margin = cfg.width / 2 }

        linePrevious = {
            x1: null,
            x2: null,
            y1: null,
            y2: null
        }


        //draw the line
        svg.selectAll("line")
            .data(events).enter().append("line")
            .attr("class", "timeline-line")

            .attr("x1", function (d) {
                if (d.data.length >= 1) {
                    var ret;
                    var time = d.data[0].temps;
                    ret = Math.floor(step * (time - minValue) + margin)
                    linePrevious.x1 = ret
                    return ret
                }
                else {
                    return 0
                }
            })
            .attr("x2", function (d) {
                if (d.data.length >= 1) {
                    if (linePrevious.x1 != null) {
                        return linePrevious.x1
                    }
                    var time = d.data[0].temps;
                    ret = Math.floor(step * (time - minValue))
                    return Math.floor(cfg.width / 2)
                }
                else { return 0 }
            })
            .attr("y1", function (d) {
                if (d.data.length >= 1) {
                    var ret;
                    ret = Math.floor(cfg.height / 2)
                    linePrevious.y1 = ret
                    return ret
                }
                else { return 0 }
            })
            .attr("y2", function (d) {
                if (d.data.length >= 1) {
                    if (linePrevious.y1 != null) {
                        return linePrevious.y1
                    }
                    return Math.floor(cfg.height / 2)
                }
                else {
                    return 0
                }
            })
            .style("stroke", function (d) {
                return cfg.color[0]
            })
            .style("stroke-width", cfg.lineWidth);



        var cpt = {};

        //creation des noeuds
        var node = svg.selectAll(".node")
            .data(events)
            .enter()
            .append("g")
            .attr("class", "node")
            ;

        //cercel/images
        node.append("image")
            .each(function (d) {
                if (d.data.length >= 1) {
                    if ((d.categorie != null)) {
                        if (cpt["min" + d.data[0].temps]) {
                            cpt["min" + d.data[0].temps].push(d);

                        }
                        else {
                            cpt["min" + d.data[0].temps] = [d];
                        }

                    }
                    else {
                        cpt["min" + d.data[0].temps] = []
                    }
                }
            })
            .style("opacity", 0)
            .attr("xlink:href", function (d) {
                if (d.data.length >= 1) {
                    return d.img;
                }
            })
            .attr("y", function (d) {
                return Math.floor(cfg.height / 2) - 75
            })
            .attr("x", 0)
            //resize img
            .attr("width", 50)
            .attr("height", 50)
            .attr("pointer-events", "none")
            .on('click', function (d) {
                if (d.data.length >= 1) {
                    if (cpt["min" + d.data[0].temps].length > 1) {
                        TimeKnots.createMultipleModal(cpt["min" + d.data[0].temps]);
                    }
                    else {
                        TimeKnots.createSingleModal(d);
                    }
                }
            })
            .on("mouseover", function (d) {
                if (d.categorie != null) {
                    d3.select(this).style("cursor", "pointer");

                    svg.selectAll("image")
                        .transition()
                        .style("opacity", .2)
                        ;

                    d3.select(this)
                        .style("opacity", 1)
                        .style("fill", function (d) { return cfg.color[0] })
                        .transition()
                        .duration(100)
                        .attr("width", 60)
                        .attr("height", 60)
                        .attr("y", function (d) {
                            return Math.floor(cfg.height / 2) - 80
                        })
                        .attr("x", function (d) {
                            var time = d.data[0].temps;
                            var x = Math.floor(step * (time - minValue) + margin);
                            return x - 30;
                        });
                }
            })
            .on("mouseout", function () {
                svg.selectAll("image")
                    .transition()
                    .style("opacity", 1)
                    .attr("width", 50)
                    .attr("height", 50)
                    .attr("y", function (d) {
                        return Math.floor(cfg.height / 2) - 75
                    })
                    .attr("x", function (d) {
                        if (d.data.length >= 1) {
                            var time = d.data[0].temps;
                            var x = Math.floor(step * (time - minValue) + margin);
                            return x - 25;
                        }
                        else { return 0 }
                    })
                    ;
            })

            .transition()
            // .duration(cfg.waiting_time-1)

            .delay(function (_, i) {
                if (i <= 1) return 0;
                else return (i - 1) * cfg.waiting_time;
            })
            .attr("xlink:href", function (d) {
                if (d.data.length >= 1) {
                    return d.img
                }
            })
            .attr("x", function (d) {
                if (d.data.length >= 1) {
                    var time = d.data[0].temps;
                    var x = Math.floor(step * (time - minValue) + margin);
                    return x - 25;
                }
                else { return 0 }
            })
            .attr("y", function (d) {
                if (d.data.length >= 1) {
                    if (cpt["min" + d.data[0].temps].length > 1) {
                        return Math.floor(cfg.height / 2) - 125
                    }
                    else { return Math.floor(cfg.height / 2) - 75 }
                }
                else { return 0 }
            })
            .style("opacity", 1)
            .duration(0.4 * cfg.waiting_time)

            .transition()
            .attr("y", function (d) {
                return Math.floor(cfg.height / 2) - 75
            })
            .attr("xlink:href", function (d) {
                if (d.data.length >= 1) {
                    if (cpt["min" + d.data[0].temps].length > 1) {
                        return "./img/timeline/plus.svg"
                    }
                    else { return d.img }
                }
                else { return null }
            })

            .transition()
            .delay((events.length - 1) * cfg.waiting_time)
            .attr("pointer-events", "all");





        //petits cercles SUR la frise
        const circlenode = svg.selectAll(null)
            .data(events)
            .enter()
            .append("circle")
            .attr("r", 2 * cfg.lineWidth)
            .style("opacity", 0)
            .attr("cx", 0)
            .attr("cy", function (d) {
                return Math.floor(cfg.height / 2)
            })
            .style("fill", function (d) {
                return cfg.color[1]
            })
            .style("stroke-width", cfg.lineWidth / 2)
            .transition()
            .attr("cx", function (d) {
                if (d.data.length >= 1) {
                    var time = d.data[0].temps;
                    var x = Math.floor(step * (time - minValue) + margin);
                    return x;
                }
                else { return 0 }
            })
            .delay(function (_, i) {
                if (i <= 1) return 0;
                else return (i - 1) * cfg.waiting_time;
            })
            .style("opacity", function (d) { if (d.data.length >= 1) { return 1 } else { return 0 } });




        //chiffres en dessous
        const labels = svg.selectAll(null)
            .data(events)
            .enter()
            .append("text")
            .text(function (d) { if (d.data.length >= 1) { return d.data[0].temps + " min" } else { return null } })
            .attr("y", function (d) {
                return Math.floor(cfg.height / 2) + 30

            })
            //-5 pour centrer le texte
            .attr("x", function (d) {
                if (d.data.length >= 1) {
                    var time = d.data[0].temps;
                    var x = Math.floor(step * (time - minValue) + margin);
                    return x - 20;
                }
                else { return 0 }
            })
            .style("opacity", 0)

            .transition()
            .delay(function (_, i) {
                if (i <= 1) return 0;
                else return (i - 1) * cfg.waiting_time;
            })
            .style("opacity", 1);
    }
}

