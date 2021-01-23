
function dist (lat1, lon1, lat2, lon2) {
        return (lat1-lat2)**2 + (lon1-lon2)**2
}
exports.dist;

exports.filter = (plages, filtres, n) => {


    plages.sort((a, b) => dist(a.latitude, a.longitude, filtres.latitude, filtres.longitude) - dist(b.latitude, b.longitude, filtres.latitude, filtres.longitude));
    return plages.slice(0, n)
}