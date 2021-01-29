function overrideAnim(data) {
    anime.remove(data.targets);
    anime(data);
}

const initButtons = function () {
    d3.selectAll('.fancy-button').on('mouseover', function () {
        overrideAnim({
            targets: this,
            scale: 0.95
        });
    });

    d3.selectAll('.fancy-button').on('mouseout', function () {
        overrideAnim({
            targets: this,
            scale: 1
        });
    });
};

const fetchJsonData = function(addr, callback) {
    fetch(addr)
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(data) {
                callback(data);
            })
            .catch(e => {console.error(e);});
        } else {
            console.error(response+" is not valid");
        }
    })
    .catch(e => {console.error(e);});
};
