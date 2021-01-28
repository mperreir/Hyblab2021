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
        var interests = _app_stores['criteres']['interests'];
        var disinterests = _app_stores['criteres']['disinterests'];
        if (data.length >=1){
            var time = data[0].temps; //TODO : au cas ou l'arrondi 0 marche pas : c'est le cas pour l'instant
            if (time ==0) {time=1}
            if (interests.includes(critere)){
               return (interests.length - interests.indexOf(critere)+1)/time;
            }
            if (disinterests.includes(critere)){
               return (-1)*(disinterests.length - disinterests.indexOf(critere)+1)/time;
            }
        }
        else{
            if (interests.includes(critere)){
                return 0;
            }

            if (disinterests.includes(critere)){
                return 1;
            }
        }
    
    },
    
    /**
     *     
     * Function used to generate and draw the progress bar
     * @param {*} id id of the div where 2 bar will be added
     */
    draw: async function (id,dataTimeLine1,dataTimeLine2,waiting_time) {

        var S1 = 1;
        var S2 = 1;
        var Somme = S1 + S2;

        $(id).html("")
        var b1 = $('<div>');
        b1.attr('class', 'progress-bar bar-T1')
            .attr('role', 'progressbar')
            .css("width", (S1 / (Somme)) * 100 + '%')
            .attr('aria-valuemin', '0')
            .attr('aria-valuenow', S1)
            .attr('aria-valuemax', Somme)
            .text("adresse1");

        var b2 = $('<div>');
        b2.attr('class', 'progress-bar bar-T2')
            .attr('role', 'progressbar')
            .css("width", (S2 / (Somme)) * 100 + '%')
            .attr('aria-valuemin', '0')
            .attr('aria-valuenow', S2)
            .attr('aria-valuemax', Somme)
            .text("adresse2");;

        $(id).append(b1);
        $(id).append(b2);
        for (let index = 0; index < dataTimeLine1.length; index++) {
            var dataT1 = dataTimeLine1[index].data;
            var dataT2 = dataTimeLine2[index].data;
            var catT1 = dataTimeLine1[index].categorie;
            var catT2 = dataTimeLine2[index].categorie;
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
            Somme = S1 + S2;
            if (dataTimeLine1[index].categorie != null) {
                await ProgressBar.sleep(waiting_time);
            }
            b1.css('width', (S1 / (Somme)) * 100 + '%').attr('aria-valuenow', S1).attr('aria-valuemax', Somme);
            b2.css('width', (S2 / (Somme)) * 100 + '%').attr('aria-valuenow', S2).attr('aria-valuemax', Somme);
        }
    }
}