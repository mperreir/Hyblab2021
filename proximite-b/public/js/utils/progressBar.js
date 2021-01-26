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
    evaluate: function (data, critere) {
        if (data != null){
            interests = ["Supermarche","Boulangerie","Bus"];
            desinterests = ["Ecole","Pharmacie","Docteur","Parc"];
            if (interests.includes(critere)){
                return (interests.length - interests.indexOf(critere)+1)/(data[0].temps);
            }
            if (desinterests.includes(critere)){
                return (-1)*(desinterests.length - desinterests.indexOf(critere)+1)/data[0].temps;
            }
        }
        else{
            if (interests.includes(critere)){
                return 0;
            }

            if (desinterests.includes(critere)){
                return 1;
            }
        }
    
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
            .text("adresse2");

        $("#progressDiv").append(b1);
        $("#progressDiv").append(b2);
        b1.css('width', (S1 / (Somme)) * 100 + '%').attr('aria-valuenow', S1).attr('aria-valuemax', Somme);
        b2.css('width', (S2 / (Somme)) * 100 + '%').attr('aria-valuenow', S2).attr('aria-valuemax', Somme);
        for (let index = 0; index < dataTimeLine1.length; index++) {
            var dataT1 = dataTimeLine1[index].data;
            var dataT2 = dataTimeLine2[index].data;
            var catT1 = dataTimeLine1[index].categorie;
            var catT2 = dataTimeLine2[index].categorie;
            //TODO gestion cas dataT1 ou dataT2 == null - si null alors que desinterets (points ++)
            if ((dataTimeLine1[index].categorie != null)) {
                value = ProgressBar.evaluate(dataT1, catT1);
                if (value < 0) S2 += (-1)*value;
                else S1 += value 
            }
            if ((dataTimeLine2[index].categorie != null)) {
                value = ProgressBar.evaluate(dataT2, catT2);
                if (value < 0) S1 += (-1)*value;
                else S2 += value 
            }
            console.log(S1);
            Somme = S1 + S2;
            if (dataTimeLine1[index].categorie != null) {
                await ProgressBar.sleep(1000);
            }
            b1.css('width', (S1 / (Somme)) * 100 + '%').attr('aria-valuenow', S1).attr('aria-valuemax', Somme);
            b2.css('width', (S2 / (Somme)) * 100 + '%').attr('aria-valuenow', S2).attr('aria-valuemax', Somme);
        }
    }
}