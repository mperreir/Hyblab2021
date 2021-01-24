let initAddress = function(){
    d3.select(".button-next-address-from-continue").on("click", function (){
        const addressInput = document.querySelector('#address1');

        if(addressInput.value == null || addressInput.value === ''){
            alert('Merci de saisir votre addresse ou vous localiser')
        }else{
            mySlidr.slide("age-page");
            initAge();
        }
    });

    d3.select(".button-next-address-from-nevermind").on("click", function (){
        mySlidr.slide("age-page");
        initAge();
    });
};

new AddressAutocomplete('#address1', function (result) {
    console.log(result);
});

const geoFindMe = async () => {
    const addressInput = document.querySelector('#address1');
    const iconLocalize = document.querySelector('#address-localize');
    const iconLocalizeLoading = document.querySelector('#address-localize-loading');
    const localizeButton = document.querySelector('#localization-button');


    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

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

}

document.querySelector('#localization-button').addEventListener('click', geoFindMe);