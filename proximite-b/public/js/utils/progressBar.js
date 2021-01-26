



var ProgressBar = {
    /**
     * Function used to wait x ms
     * @param {*} ms 
     */
    sleep: function (ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }
    ,
    /**
     *  "criteres":{
     *  "interests":["supermarche","bus","boulangerie","pharmacie","parc"],
     *  "disinterests":["culte","ecole"]}
     *  }
     * @param {*} d 
     */
    evaluate: function (d) {
        // console.log(stores.criteres)

        return d.temps;
    },
    /**
     * Function used to generate and draw the progress bar
     */
    draw: async function () {

        var S1 = 1;
        var S2 = 1;
        var Somme = S1 + S2;

        $("#progressDiv").html("")
        var b1 = $('<div>');
        b1.attr('id', 'bar1')
            .attr('class', 'progress-bar bar-T1')
            .attr('role', 'progressbar')
            .css("width", '50%')
            .attr('aria-valuemin', '0')
            .attr('aria-valuemax', '100')
            .text("adresse1");

        var b2 = $('<div>');
        b2.attr('id', 'bar2')
            .attr('class', 'progress-bar bar-T2')
            .attr('role', 'progressbar')
            .css("width", '50%')
            .attr('aria-valuemin', '0')
            .attr('aria-valuemax', '100')
            .text("adresse2");;

        $("#progressDiv").append(b1);
        $("#progressDiv").append(b2);
        b1.css('width', (S1 / (Somme)) * 100 + '%').attr('aria-valuenow', S1).attr('aria-valuemax', Somme);
        b2.css('width', (S2 / (Somme)) * 100 + '%').attr('aria-valuenow', S2).attr('aria-valuemax', Somme);
        for (let index = 0; index < dataTimeLine1.length; index++) {
            var dataT1 = dataTimeLine1[index].data
            var dataT2 = dataTimeLine2[index].data
            if ((dataT1 != null) & (dataTimeLine1[index].categorie != null)) {
                S1 += ProgressBar.evaluate(dataT1[0]);
            }
            if ((dataT2 != null) & (dataTimeLine2[index].categorie != null)) {
                S2 += ProgressBar.evaluate(dataT2[0]);
            }
            Somme = S1 + S2;
            if (dataTimeLine1[index].categorie != null) {
                await ProgressBar.sleep(1000);
            }
            b1.css('width', (S1 / (Somme)) * 100 + '%').attr('aria-valuenow', S1).attr('aria-valuemax', Somme);
            b2.css('width', (S2 / (Somme)) * 100 + '%').attr('aria-valuenow', S2).attr('aria-valuemax', Somme);
        }
    }
}