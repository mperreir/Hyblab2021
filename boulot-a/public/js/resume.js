const resume = function(add,map,center,zoomlevel) {
    let nb = add.data.places.length;
    let section_template = document.querySelector('section[data-slidr="template"]');
    let section_ajout = document.querySelector('section[data-slidr="page-10"]').querySelector(".resume_bar");
    let first_element = section_template.querySelector('.'+add.data.places[0].type);
    let flechefirst = section_template.querySelector('.fleche-resume');
    section_ajout.prepend(flechefirst);
    section_ajout.prepend(first_element);
    for(let i = 1; i<nb;i++){
        let section =  section_template.querySelector('.'+add.data.places[i].type);
        console.log(section);
        console.log('.'+add.data.places[i].type);

        if(add.data.places[i].type!=="work") {
            section.querySelector('.tittle_resume').textContent = add.data.places[i].name;
            let clone = section.cloneNode(true);
            clone.style.width = (100 / (nb - 2)) + "%";
            section_ajout.querySelector('.bodyResumeBar').appendChild(clone);
        }else {
            let clone = section.cloneNode(true);
            section_ajout.appendChild(clone);
        }
    }
    d3.select('.mail_end').on('mouseover', function () {
        anime({
            targets: '.mail_end',
            scale: 1.3
        });
    });

    d3.select('.mail_end').on('mouseout', function () {
        anime({
            targets: '.mail_end',
            scale: 1
        });
    });
    d3.select('.mail_end').on('click', function () {
        alert("Fonctionalité en cours d'implémentation.");
    });
    document.querySelector('section[data-slidr="page-10"]>.button_tuto').addEventListener('click',function(){
        mySlidr.slide('page-11');
    })
    document.querySelector('section[data-slidr="page-10"]>.button_tuto_precedent').addEventListener('click',function(){
        dezoom(map,center,zoomlevel);
        mySlidr.slide('page-8');
    })

}



let logo_credits =  document.querySelector('#credit_logo_ecole').children;
["#agr","#OML","#polytech","#logonantes"].forEach(d=>{
    let logo = document.querySelector(d)
    logo.addEventListener('mouseover',function (e){
        anime({
            targets: d,
            scale: 1.2
        });
    });
    logo.addEventListener('mouseout',function (e){
        anime({
            targets: d,
            scale: 1
        });
    });
})