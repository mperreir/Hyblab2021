'user strict';

exports.e400 = (msg) => {
    return {
        ok: false,
        status: 400,
        descritption: `Bad request`,
        details: msg
    };
}

exports.e204 = (d) => {
    return  {
        ok: false,
        status: 204,
        descritption: `There is no beaches respecting criterias.`,
        details: d
    };
}

exports.e = (code, msg) => {
    return {
        ok: false,
        status: code,
        descritption: msg
    };
}
