const resume = function(add,map,center,zoomlevel) {
    let nb = add.data.places.length;
    let section_template = document.querySelector('section[data-slidr="template"]');
    let section_ajout = document.querySelector('section[data-slidr="page-10"]').querySelector(".resume_bar");
    console.log(add);
    if(section_ajout.id==="not_modify") {
        section_ajout.id="modify";
        let first_element = section_template.querySelector('.' + add.data.places[0].type);
        let flechefirst = section_template.querySelector('.fleche-resume');
        section_ajout.prepend(flechefirst);
        section_ajout.prepend(first_element);
        for (let i = 1; i < nb; i++) {
            let section = section_template.querySelector('.' + add.data.places[i].type);
            console.log(section);
            console.log('.' + add.data.places[i].type);
            if (add.data.places[i].type !== "work" && add.data.places[i].type !== "home") {
                section.querySelector('.tittle_resume').textContent = add.data.places[i].name;
                let clone = section.cloneNode(true);
                clone.style.width = (100 / (nb - 2)) + "%";
                section_ajout.querySelector('.bodyResumeBar').appendChild(clone);
            } else {
                let clone = section.cloneNode(true);
                section_ajout.appendChild(clone);
            }
        }
        anime({
            targets: '#logo_mail',
            scale: 1.3,
            direction: 'alternate',
            easing:"easeInOutSine",
            loop: true

        });

        d3.select('#logo_mail').on('click', function (e) {
            anime({
                targets: '#logo_mail',
                scale: 0.2,
                direction: 'alternate',
                easing:"easeInOutSine",
                loop: 2,
                duration: 500

            });
            let email = document.querySelector('input[type="email"]');
            emailjs.init('user_xhCLlKt9X5sfI6rzQSzwX');
            var today = new Date();
            var dd = today.getDate();

            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            let templateParams = {
                date :dd+"-"+mm+"-"+yyyy,
                point0:add.data.places[0].name,
                point1 : add.data.places[1].name,
                point2 : add.data.places[2].name,
                point3 : add.data.places[3].name,
                point4 : add.data.places[4].name,
                lien : 'www.google.com/maps/dir/'+add.data.places[0].coord[0] +',' +add.data.places[0].coord[1]+'/'+add.data.places[1].coord[0] +',' +add.data.places[1].coord[1]+'/'+add.data.places[2].coord[0] +',' +add.data.places[2].coord[1]+'/'+add.data.places[3].coord[0] +',' +add.data.places[3].coord[1]+'/'+add.data.places[4].coord[0] +',' +add.data.places[4].coord[1]+'/',
                email: email.value,
            };
            if(email.value!==""){
                emailjs.send('service_51ttlcs', 'template_ca5ixkg', templateParams)
                    .then(function(response) {
                        document.querySelector('#logo_mail').style.visibility = "hidden";
                        document.querySelector('#tick_mail').style.visibility = "visible";
                        console.log('SUCCESS!', response.status, response.text);
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
            }
        });
        document.querySelector('section[data-slidr="page-10"]>.button_tuto').addEventListener('click', function () {
            mySlidr.slide('page-11');
        })
        document.querySelector('section[data-slidr="page-10"]>.button_tuto_precedent').addEventListener('click', function () {
            dezoom(map, center, zoomlevel);
            mySlidr.slide('page-8');
        })
    }
}

let logo_credits =  document.querySelector('#credit_logo_ecole').children;
["#agr","#OML","#polytech","#logonantes","#Audencia"].forEach(d=>{
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