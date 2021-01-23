
'user strict';

function dist (lat1, lon1, lat2, lon2) {
        return (lat1-lat2)**2 + (lon1-lon2)**2
}
exports.dist;

exports.nearest = (plage, object) => {
    let nearest = object[0];
    for (const node in object) {
        if (dist(plage.latitude, plage.longitude, node.latitude, node.longitude) < nearest) {
            nearest = node;
        }
    }
    return nearest;
}

exports.filter = (plages, filtres, n) => {
    plages.sort((a, b) => dist(a.latitude, a.longitude, filtres.latitude, filtres.longitude) - dist(b.latitude, b.longitude, filtres.latitude, filtres.longitude));
    return plages.slice(0, n)
}

