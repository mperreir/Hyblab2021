let initAddress = function(){
    //--------------AUDIO-----------

    document.getElementById('debut_audio').pause();

    let x = document.getElementById("volumeAdresse");
    x.setAttribute("src", "./img/common/volume_on.svg");

    if(isSonOn){
        document.getElementById('adresse_audio').play();
    }
    else{
        x.setAttribute("src", "./img/common/volume_off.svg");
    }
    d3.selectAll('.volume').on('click', function (){
        if(isSonOn){
            this.setAttribute("src", "./img/common/volume_off.svg");
            isSonOn = Boolean(false);
            document.getElementById('adresse_audio').pause();
        }
        else{
            this.setAttribute("src", "./img/common/volume_on.svg");
            isSonOn = Boolean(true);
            document.getElementById('adresse_audio').play();
        }
    });


    //--------------HEADER-------------
    d3.select('.logoAccueil1').on('click', function (){
        mySlidr.slide('home-page');
        initHome();
        resetHome();
    });


    d3.select(".button-next-address-from-continue").on("click", function (){
        const addressInput = document.querySelector('#address1');

        if(addressInput.value == null || addressInput.value === ''){
            alert('Merci de saisir votre addresse ou vous localiser')
        }else{
            mySlidr.slide('right');
            initHour();
        }
    });

    d3.select(".button-next-address-from-nevermind").on("click", function (){
        mySlidr.slide('right');
        initHour();
    });

    //Bouton Suivant
    let tl_suivant_address_over = anime.timeline({
        easing: 'linear',
        loop:true
    });

    d3.select('.button-next-address-from-continue').on('mouseover', function (){
        tl_suivant_address_over
            .add({
                targets: ".button-next-address-from-continue",
                scale: 1.1,
                duration: 500
            })
            .add({
                targets: ".button-next-address-from-continue",
                scale: 0.9,
                duration: 500
            })
            .add({
                targets: ".button-next-address-from-continue",
                scale: 1,
                duration: 500
            })
    });

    d3.select('.button-next-address-from-continue').on('mouseleave' ,function (){
        anime({
            targets: ".button-next-address-from-continue",
            scale: 1,
            duration: 200,
            ease: 'linear'
        });
        tl_suivant_address_over.pause();
    });

    d3.select(".arianne-2-address").on('click', function (){
        document.getElementById('adresse_audio').pause();
        let prevSon = isSonOn;
        if(prevSon) {isSonOn = false;}
        mySlidr.slide('right');
        setTimeout(function (){
            if(prevSon) {isSonOn = true;}
            initHour();
        }, 1200);
    });

    d3.select(".arianne-3-address").on('click', function (){
        document.getElementById('adresse_audio').pause();
        let prevSon = isSonOn;
        if(prevSon) {isSonOn = false;}
        mySlidr.slide('right');
        setTimeout(function(){
            mySlidr.slide('right');
        }, 1500);
        setTimeout(function (){
            if(prevSon) {isSonOn = true;}
            initAge();
        }, 2700);
    });

    d3.select(".arianne-4-address").on('click', function (){
        document.getElementById('adresse_audio').pause();
        let prevSon = isSonOn;
        if(prevSon) {isSonOn = false;}
        mySlidr.slide('right');
        setTimeout(function(){
            mySlidr.slide('right');
        }, 1500);
        setTimeout(function(){
            mySlidr.slide('right');
        }, 3000);
        setTimeout(function (){
            if(prevSon) {isSonOn = true;}
            initAccess();
        }, 4200);
    });

    d3.select(".arianne-5-address").on('click', function (){
        document.getElementById('adresse_audio').pause();
        let prevSon = isSonOn;
        if(prevSon) {isSonOn = false;}
        mySlidr.slide('right');
        setTimeout(function(){
            mySlidr.slide('right');
        }, 1500);
        setTimeout(function(){
            mySlidr.slide('right');
        }, 3000);
        setTimeout(function(){
            mySlidr.slide('up');
        }, 4500);
        setTimeout(function (){
            if(prevSon) {isSonOn = true;}
            initFaunaFlora();
        }, 5700);
    });

    d3.select(".arianne-6-address").on('click', function (){
        document.getElementById('adresse_audio').pause();
        let prevSon = isSonOn;
        if(prevSon) {isSonOn = false;}
        mySlidr.slide('right');
        setTimeout(function(){
            mySlidr.slide('right');
        }, 1500);
        setTimeout(function(){
            mySlidr.slide('right');
        }, 3000);
        setTimeout(function(){
            mySlidr.slide('up');
        }, 4500);
        setTimeout(function(){
            mySlidr.slide('right');
        }, 6000);
        setTimeout(function (){
            if(prevSon) {isSonOn = true;}
            initActivities();
        }, 7200);
    });
};



new AddressAutocomplete('#address1', function (result) {
    geoAttribute(result.coordinates.lat, result.coordinates.lng);
});

const geoFindMe = async () => {
    const addressInput = document.querySelector('#address1');
    const iconLocalize = document.querySelector('#address-localize');
    const iconLocalizeLoading = document.querySelector('#address-localize-loading');
    const localizeButton = document.querySelector('#localization-button');


    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        geoAttribute(latitude, longitude);

        const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&result_type=street_address&key='+GOOGLE_API_KEY);
        const address = await response.json();

        addressInput.value = address['results'][0]['formatted_address'];
        iconLocalize.classList.remove("hidden");
        iconLocalizeLoading.classList.add("hidden");
        localizeButton.disabled = false;
    }

    function error() {
        iconLocalize.classList.remove("hidden");
        iconLocalizeLoading.classList.add("hidden");
        localizeButton.disabled = false;
        alert('Impossible de vous localiser');
    }

    if(!navigator.geolocation) {
        alert('La géolocalisation n\'est pas supportée par votre navigateur');
    } else {
        localizeButton.disabled = true;
        iconLocalize.classList.add("hidden");
        iconLocalizeLoading.classList.remove("hidden");
        navigator.geolocation.getCurrentPosition(success, error);
    }

};

document.querySelector('#localization-button').addEventListener('click', geoFindMe);

const
    range = document.getElementById('localize-range'),
    rangeValue = document.getElementById('rangeValue'),
    setValue = ()=>{
        const
            newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
            newPosition = 10 - (newValue * 0.2) + (range.value - 10)*1.7 ;

        if(range.value === range.min){
            rangeValue.innerHTML = `<span class="font-slider"><${range.value} km</span>`;
        }else if(range.value === range.max){
            rangeValue.innerHTML = `<span class="font-slider">>${range.value} km</span>`;
        }else{
            rangeValue.innerHTML = `<span class="font-slider">${range.value} km</span>`;
        }

        rangeValue.style.left = `calc(${newValue}% + (${newPosition}vw))`;
    };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);
