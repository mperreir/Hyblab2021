const initSlide2 =  function () {
    document.querySelector("#submit-form").disabled = true;
    let user = new User();
    initAutocomplete(user);

    d3.select('#submit-form').on('click', async function () {
        console.log("test");
        user.transport = document.querySelector('#transport-list').value;
        console.log(user)
        mySlidr.slide('page-7');
        await initSlide3(user);
    });
};

function initAutocomplete(user){
    const work =  places({
        appId: 'pl9HZE11XI7A',
        apiKey: 'bd1b8fef957d3ff5f91d2d83deb1867c',
        container: document.getElementById('work-input'),
        language: 'fr'
    });
    const school =  places({
        appId: 'pl9HZE11XI7A',
        apiKey: 'bd1b8fef957d3ff5f91d2d83deb1867c',
        container: document.getElementById('school-input'),
        language: 'fr'
    });
    const home =  places({
        appId: 'pl9HZE11XI7A',
        apiKey: 'bd1b8fef957d3ff5f91d2d83deb1867c',
        container: document.getElementById('home-input'),
        language: 'fr'
    });

    work.on('change', e => user.updateWork(e.suggestion));
    home.on('change', e => user.updateHome(e.suggestion));
    school.on('change', e => user.updateSchool(e.suggestion));

    work.on('clear', e => user.updateWork(null));
    home.on('clear', e =>user.updateHome(null));
    school.on('clear', e => user.updateSchool(null));
}


