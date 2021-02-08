let currentIndex = 1;
let currentSlide = 7;
let chargedOnce = false;
//let user;

async function getPlaceholder() {
    var request = new XMLHttpRequest();
    request.open("GET", "data/user.json", true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let my_JSON_object = JSON.parse(request.responseText);
            return my_JSON_object;
        }
    }
    return request;
}


const initSlide3 = async function (user) {
    console.log(user)
    setupCarousel();

    d3.select('#submit-questions').on('click', function () {
        mySlidr.slide('page-7.5');
        let new_user = user;
        if (!new_user.demo){
            console.log(new_user)
            let homeCoords = Object.values(new_user.home.latlng);
            let workCoords = Object.values(new_user.work.latlng);
            let schoolCoords = null;
            if (new_user.school) schoolCoords = Object.values(new_user.school.latlng);
            let startFromHome = new_user.startFromHome;

            let request = {
                "homeCoords": homeCoords,
                "workCoords": workCoords,
                "schoolCoords": schoolCoords,
                "startFromHome": startFromHome,
                "transport": new_user.transport,
                "menu": {
                    "culinary": new_user.culinaire,
                    "cultural": new_user.culture,
                    "pointofinterest": new_user.insolite
                }
            }
            //Utilisation de l'API
            fetch('api/generate_story/', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            })
                .then(response => { return response.json() })
                .then(myReceivedObject => {
                    mySlidr.slide('page-8');
                    customMap(myReceivedObject, request);
                })
        }
        else{
            /// Utilisation du chemin pré fait
            setTimeout(function(){
            fetch('data/fake_path/path01.json')
                .then(response => { return response.json() })
                .then(myReceivedObject => {
                    console.log(myReceivedObject);
                    myReceivedObject.Demo = true;
                    mySlidr.slide('page-8');
                    customMap(myReceivedObject, null);
                })
            },4000)
        }
    });


    /// Utilisation du chemin pré fait


    function setupCarousel() {
        let carousel = document.getElementById("carousel");
        let svg1 = carousel.children[0];
        let svg2 = carousel.children[1];
        carousel.innerHTML = "";
        carousel.appendChild(svg1);
        carousel.appendChild(svg2);
        console.log(carousel);

        createItems();
        createEventListeners();
        chargedOnce = true;

    }

    function createEventListeners() {
        document.querySelector('#carousel-next')
            .addEventListener('click', function () {

                let previous = document.querySelector('.carousel-item[idx="' + getIndex(currentIndex - 1) + '"]');
                let current = document.querySelector('.carousel-item[idx="' + getIndex(currentIndex) + '"]');
                let next = document.querySelector('.carousel-item[idx="' + getIndex(currentIndex + 1) + '"]');

                currentIndex = getIndex(currentIndex + 1);

                current.setAttribute('idx', getIndex(currentIndex));
                next.setAttribute('idx', getIndex(currentIndex + 1));
                previous.setAttribute('idx', getIndex(currentIndex - 1));

            });
        document.querySelector('#carousel-previous')
            .addEventListener('click', function () {
                let previous = document.querySelector('.carousel-item[idx="' + getIndex(currentIndex - 1) + '"]');
                let current = document.querySelector('.carousel-item[idx="' + getIndex(currentIndex) + '"]');
                let next = document.querySelector('.carousel-item[idx="' + getIndex(currentIndex + 1) + '"]');

                currentIndex = getIndex(currentIndex - 1);

                current.setAttribute('idx', getIndex(currentIndex));
                next.setAttribute('idx', getIndex(currentIndex + 1));
                previous.setAttribute('idx', getIndex(currentIndex - 1));


            });

        document.querySelector('#retour-carousel')
            .addEventListener('click', function () {
                // mySlidr.slide('page-' + (currentSlide - 1));
                mySlidr.slide('page-6');
            });

        document.querySelector('#checkbox-home-container')
            .addEventListener('click', function (e) {
                console.log("yooooo")
                e.target.checked = true;
                console.log(e.target);
                document.querySelector('#checkbox-work').checked = false;
                user.startFromHome = true;
            });
        document.querySelector('#checkbox-work-container')
            .addEventListener('click', function (e) {
                e.target.checked = true;
                document.querySelector('#checkbox-home').checked = false;
                user.startFromHome = false;
            })
        /*document.querySelector('#checkbox-school-container')
            .addEventListener('click', function (e){
                e.stopPropagation();
                e.preventDefault();
                let target = document.querySelector('#checkbox-school')
                target.checked = !target.checked;
                user_infos.startFromHome =  !user_infos.startFromHome;

            })*/
    }

    function getIndex(idx) {
        let res = idx % 3;
        if (res < 0)
            return 2;
        else
            return res;
    }

    function createItems() {
        let idx = 0;
        d3.json('data/carrousel.json')
            .then(function (data) {
                Object.entries(data.carousel).forEach(function (elem) {
                    let key = elem[0];
                    let content = elem[1];

                    let carousel = document.querySelector('#carousel');

                    let item = document.createElement('div');
                    item.setAttribute('class', 'carousel-item');
                    item.setAttribute('id', 'carousel-item-' + key);
                    item.setAttribute('idx', idx++);
                    item.style.backgroundColor = content.color;

                    let image = document.createElement('img');
                    image.setAttribute('class', 'item-image');
                    image.setAttribute('src', content.image);

                    let item_infos = document.createElement('div');
                    item_infos.setAttribute('class', "item-div");

                    let title = document.createElement('span');
                    title.setAttribute('class', 'item-title');
                    title.textContent += content.titre;

                    let description = document.createElement('a');
                    description.setAttribute('class', 'item-description');
                    description.textContent += content.description;

                    let question = document.createElement('a');
                    question.setAttribute('class', 'item-question');
                    question.textContent += content.question;

                    let divButton = document.createElement('div');
                    divButton.setAttribute('class', 'item-buttons');

                    let yesButton = document.createElement('input');
                    yesButton.setAttribute('type', 'button');
                    yesButton.setAttribute('value', content.reponse1);
                    yesButton.setAttribute('answer', '0');
                    yesButton.setAttribute('class', 'item-button');
                    yesButton.setAttribute('id', 'item-button-yes-' + key);

                    let noButton = document.createElement('input');
                    noButton.setAttribute('type', 'button');
                    noButton.setAttribute('value', content.reponse2);
                    noButton.setAttribute('answer', '1');
                    noButton.setAttribute('class', 'item-button');
                    noButton.setAttribute('id', 'item-button-no-' + key);

                    let otherButton = document.createElement('input');
                    otherButton.setAttribute('type', 'button');
                    otherButton.setAttribute('value', content.reponse3);
                    otherButton.setAttribute('answer', '2');
                    otherButton.setAttribute('class', 'item-button');
                    otherButton.setAttribute('id', 'item-button-other-' + key);

                    for (let bt of [yesButton, noButton, otherButton]) {
                        bt.addEventListener('click', addEventAnswer);
                    }

                    //divButton.append(question);
                    divButton.append(yesButton);
                    divButton.append(noButton);
                    divButton.append(otherButton);

                    item_infos.append(title);
                    item_infos.append(description);
                    item_infos.append(question);
                    item_infos.append(divButton);

                    item.append(image);
                    item.append(item_infos);
                    carousel.append(item);
                })
            })

        function addEventAnswer(event) {
            let button = event.target;
            let re = /-/g;
            let str = button.id;
            let split = re[Symbol.split](str);

            let value = parseInt(button.getAttribute("answer"));

            switch (split[3]) {
                case 'culinaire':
                    user.culinaire = value;
                    break;
                case 'culture':
                    user.culture = value;
                    break;
                case 'insolite':
                    user.insolite = value;
                    break;
            }

            let test = !(user.culinaire != null && user.culture != null && user.insolite != null);
            document.querySelector('#submit-questions').disabled = test;


            let parent = button.parentNode;
            parent.childNodes.forEach(function (elem) {

                if (elem.nodeName === "INPUT") {
                    if (elem.id === button.id)
                        elem.style.backgroundColor = "rgba(255,255,255,1)";
                    else
                        elem.style.backgroundColor = "rgba(255,255,255,0.7)";
                }
            })

            let previous = document.querySelector('.carousel-item[idx="' + getIndex(currentIndex - 1) + '"]');
            let current = document.querySelector('.carousel-item[idx="' + getIndex(currentIndex) + '"]');
            let next = document.querySelector('.carousel-item[idx="' + getIndex(currentIndex + 1) + '"]');

            currentIndex = getIndex(currentIndex + 1);

            current.setAttribute('idx', getIndex(currentIndex));
            next.setAttribute('idx', getIndex(currentIndex + 1));
            previous.setAttribute('idx', getIndex(currentIndex - 1));


        }
    }
}
