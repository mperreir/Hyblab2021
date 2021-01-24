
var TimeKnots = {
    draw: function (id, events, options) {
        var cfg = {
            maxmax: 15,
            width: 600,
            height: 200,
            radius: 25,
            lineWidth: 4,
            color: ["#999", "#999"],
            background: "#FFF",
            dateFormat: "%Y/%m/%d %H:%M:%S",
            horizontalLayout: true,
            showLabels: false,
            labelFormat: "%Y/%m/%d %H:%M:%S",
            addNow: false,
            seriesColor: d3.scale.category20(),
            dateDimension: true
        };


        //default configuration overrid
        if (options != undefined) {
            for (var i in options) {
                cfg[i] = options[i];
            }
        }
        if (cfg.addNow != false) {
            events.push({ date: new Date(), name: cfg.addNowLabel || "Today" });
        }

        function createSingleModal(d) {
            var firstAdress = d.data[0]
            var otherAdress = d.data.slice(1);
            $("#firstItemSingleModal").html('<img src=' + d.img + ' height="87px"width="100px">' + '<h1>' + d.categorie + ' - ' + firstAdress.nom + '</h1><h3>' + firstAdress.adresse + '</h3>' + '<p>' + firstAdress.temps + ' minutes à pieds</p>');
            $("#otherItemsSingleModal").html("");
            if (otherAdress.length >= 1) {
                otherAdress.forEach(element => {
                    $("#otherItemsSingleModal").append('<p><b>' + element.nom + '</b></p>' + '<p style="font-size:10px">' + element.temps + ' min - ' + element.adresse + '</p>');
                });

            }
            else {
                $("#otherItemsSingleModal").html("<p>Il n'y a pas d'autre " + d.categorie.toLowerCase() + " à proximité.")
            }
            $("#singleModal").modal('show');
        }


        function createMultipleModal(d) {
            console.log('jnfsdjnkfdnjkfdsnjkdsfjnfdjn')
            $("#headerMultipleModal").html("");


            //TODO link to other modal
            d.forEach(element => {
                console.log(element)


                // var img = $('<div>fsdf</div>'); //Equivalent: $(document.createElement('img'))

                // img.appendTo('#headerMultipleModal');
                // img.on('click', function () { alert('blah'); });

                var p = $('<p>');

                var img = $('<img>'); //Equivalent: $(document.createElement('img'))
                img.attr("width", 75);
                img.attr("height", 75);
                img.on('click', function () {
                    $("#multipleModal").modal('hide');
                    createSingleModal(element)


                });

                img.attr('src', element.img);
                p.append(img)
                p.append('<b>' + element.categorie + ' : </b>' + element.data[0].adresse)
                $("#headerMultipleModal").append(p)
                //  img.appendTo('#headerMultipleModal');

            })
            $("#multipleModal").modal('show');

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
        if (!cfg.dateDimension) {
            var timestamps = events.map(function (d) { if (d.data!= null) { return d.data[0].temps } else { return 1 } });//new Date(d.date).getTime()});
            var maxValue = d3.max(timestamps);
            var minValue = d3.min(timestamps);
        } else {
            var timestamps = events.map(function (d) { return Date.parse(d.date); });//new Date(d.date).getTime()});
            var maxValue = d3.max(timestamps);
            var minValue = d3.min(timestamps);
        }


        var margin = (d3.max(events.map(function (d) { return d.radius })) || cfg.radius) * 1.5 + cfg.lineWidth;
        var step = (cfg.horizontalLayout) ? ((cfg.width - 2 * margin) / (maxValue - minValue)) : ((cfg.height - 2 * margin) / (maxValue - minValue));
        var series = [];
        if (maxValue == minValue) { step = 0; if (cfg.horizontalLayout) { margin = cfg.width / 2 } else { margin = cfg.height / 2 } }

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
                if (d.data!= null) {
                    var ret;
                    if (cfg.horizontalLayout) {
                        var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                        ret = Math.floor(step * (datum - minValue) + margin)
                    }
                    else {
                        ret = Math.floor(cfg.width / 2)
                    }
                    linePrevious.x1 = ret
                    return ret
                }
                else {
                    return 0
                }
            })
            .attr("x2", function (d) {
                if (d.data!= null) {
                    if (linePrevious.x1 != null) {
                        return linePrevious.x1
                    }
                    if (cfg.horizontalLayout) {
                        var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                        ret = Math.floor(step * (datum - minValue))
                    }
                    return Math.floor(cfg.width / 2)
                }
                else { return 0 }
            })
            .attr("y1", function (d) {
                if (d.data!= null) {
                    var ret;
                    if (cfg.horizontalLayout) {
                        ret = Math.floor(cfg.height / 2)
                    }
                    else {
                        var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                        ret = Math.floor(step * (datum - minValue)) + margin
                    }
                    linePrevious.y1 = ret
                    return ret
                }
                else { return 0 }
            })
            .attr("y2", function (d) {
                if (d.data!= null) {
                    if (linePrevious.y1 != null) {
                        return linePrevious.y1
                    }
                    if (cfg.horizontalLayout) {
                        return Math.floor(cfg.height / 2)
                    }
                    var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                    return Math.floor(step * (datum - minValue))
                }
                else {
                    return 0
                }
            })
            .style("stroke", function (d) {
                return cfg.color[0]
            })
            .style("stroke-width", cfg.lineWidth);



        var cpt = {

        };

        //draw circles
        var node = svg.selectAll(".node")
            .data(events)
            .enter()

            .append("g")

            .attr("class", "node")
            ;



        node.append("image")
            .each(function (d) {
                if (d.data!= null) {
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
                // console.log("each: " + JSON.stringify(d)); // d is datum
            })
            .style("opacity", 0)

            .attr("xlink:href", function (d) {
                if (d.data!= null) {
                    return d.img;
                }
            })
            .attr("y", function (d) {


                //    TODO gerer colisions


                // console.log(d);
                // console.log(events);

                return Math.floor(cfg.height / 2) - 75

            })
            .attr("x", 0)
            //resize img
            .attr("width", 50)
            .attr("height", 50)
            .attr("pointer-events", "none")
            .on('click', function (d) {
                if (d.data!= null) {
                    if (cpt["min" + d.data[0].temps].length > 1) {
                        console.log('plusplusplus')

                        createMultipleModal(cpt["min" + d.data[0].temps]);



                    }
                    else {
                        createSingleModal(d);

                        console.log("click")
                    }
                }
            })
            .on("mouseover", function (d) {
                if (d.categorie != null & (d.data!= null)) {
                    d3.select(this).style("cursor", "pointer");
                    if (cfg.dateDimension) {
                        var format = d3.time.format(cfg.dateFormat);
                        var datetime = format(new Date(d.date));
                        var dateValue = (datetime != "") ? (d.categorie + " <small>(" + datetime + ")</small>") : d.categorie;
                    } else {
                        var format = function (d) { return d }; // TODO
                        var datetime = d.data[0].temps;
                        var dateValue = JSON.stringify(d);
                    }
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
                            if (cfg.horizontalLayout) {
                                return Math.floor(cfg.height / 2) - 80
                            }
                            var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                            return Math.floor(step * (datum - minValue) + margin)
                        })
                        .attr("x", function (d) {
                            if (cfg.horizontalLayout) {
                                var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                                var x = Math.floor(step * (datum - minValue) + margin);
                                return x - 30;
                            }
                            return Math.floor(cfg.width / 2)
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
                        if (cfg.horizontalLayout) {
                            return Math.floor(cfg.height / 2) - 75
                        }
                        var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                        return Math.floor(step * (datum - minValue) + margin)
                    })
                    .attr("x", function (d) {
                        if (cfg.horizontalLayout) {
                            var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                            var x = Math.floor(step * (datum - minValue) + margin);
                            return x - 25;
                        }
                        return Math.floor(cfg.width / 2)
                    })
                    ;
            })

            .transition()
            .delay(function (_, i) {
                if (i <= 1) return 0;
                else return (i - 1) * 1000;
            })
            .attr("xlink:href", function (d) {
                if (d.data!= null) {
                    return d.img
                }
            })

            .attr("x", function (d) {
                if (d.data!= null) {
                    if (cfg.horizontalLayout) {
                        var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                        var x = Math.floor(step * (datum - minValue) + margin);
                        return x - 25;
                    }
                    return Math.floor(cfg.width / 2)
                }
                else { return 0 }
            })

            .attr("y", function (d) {

                if (d.data!= null) {
                    if (cpt["min" + d.data[0].temps].length > 1) {
                        return Math.floor(cfg.height / 2) - 150
                    }
                    else { return Math.floor(cfg.height / 2) - 75 }
                }
                else { return 0 }


                // console.log(d);
                // console.log(events);


            })
            .style("opacity", 1)





            .transition()

            .attr("xlink:href", function (d) {
                if (d.data!= null) {
                    if (cpt["min" + d.data[0].temps].length > 1) {
                        return "./img/timeline/plus.svg"
                    }
                    else { return d.img }
                }
                else { return null }
            })
            .attr("y", function (d) {

                return Math.floor(cfg.height / 2) - 75


                // console.log(d);
                // console.log(events);


            })
            .transition()
            .delay((events.length - 1) * 1000)


            .attr("pointer-events", "all")
            ;




        console.log("each: " + JSON.stringify(cpt)); // d is datum

        const circlenode = svg.selectAll(null)
            .data(events)
            .enter()
            .append("circle")
            .attr("r", 2 * cfg.lineWidth)
            .style("opacity", 0)


            .attr("cx", 0)
            .attr("cy", function (d) {
                if (cfg.horizontalLayout) {
                    return Math.floor(cfg.height / 2)
                }
                var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                return Math.floor(step * (datum - minValue) + margin)
            })


            .style("fill", function (d) {
                return cfg.color[1]
            })
            .style("stroke-width", cfg.lineWidth / 2)
            .transition()
            .attr("cx", function (d) {
                if (d.data!= null) {
                    if (cfg.horizontalLayout) {
                        var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                        var x = Math.floor(step * (datum - minValue) + margin);
                        return x;
                    }
                    return Math.floor(cfg.width / 2)
                }
                else { return 0 }
            })

            .delay(function (_, i) {
                if (i <= 1) return 0;
                else return (i - 1) * 1000;
            })

            .style("opacity", function (d) { if (d.data!= null) { return 1 } else { return 0 } });











        //chiffres en dessous
        const labels = svg.selectAll(null)
            .data(events)
            .enter()
            .append("text")
            .text(function (d) { if (d.data!= null) { return d.data[0].temps + " min" } else { return null } })
            .attr("y", function (d) {
                if (cfg.horizontalLayout) {
                    return Math.floor(cfg.height / 2) + 30
                }
                var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                return Math.floor(step * (datum - minValue) + margin)
            })
            //-5 pour centrer le texte
            .attr("x", function (d) {
                if (d.data!= null) {
                    if (cfg.horizontalLayout) {
                        var datum = (cfg.dateDimension) ? new Date(d.date).getTime() : d.data[0].temps;
                        var x = Math.floor(step * (datum - minValue) + margin);
                        return x - 20;
                    }
                    return Math.floor(cfg.width / 2) - 5
                }
                else { return 0 }
            })
            .style("opacity", 0)

            .transition()
            .delay(function (_, i) {
                if (i <= 1) return 0;
                else return (i - 1) * 1000;
            })
            .style("opacity", 1);





        //tooltip box au dessus des cercles
        svg.on("mousemove", function () {
            tipPixels = parseInt(tip.style("height").replace("px", ""));
            return tip.style("top", (d3.event.pageY - tipPixels - margin) + "px").style("left", (d3.event.pageX + 20) + "px");
        })
            .on("mouseout", function () { return tip.style("opacity", 0).style("top", "0px").style("left", "0px"); });
    }
}

