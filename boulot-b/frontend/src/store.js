const store = {
    debug: true,
    subscribers: [],
    state: {
        actif: 1,
        choice: {
            typeDeplacement: undefined,
            theme: undefined,
            style: undefined,
            lieux: [],
            humeur: undefined,
            path: {depart: undefined, arrive: undefined}
        }
    },
    subscribe(state,callback) {
        this.subscribers.push({[state]: callback})
    },
    notify(state, value) {
        this.subscribers.forEach((subscriber) => {
            subscriber[state](value)
        })
    },
    setActif(newActif) {
        if (this.debug) console.log('set actif', newActif)
        this.state.actif = newActif
        this.notify("actif", newActif)
    },
    setTypeDeplacement(type) {
        if (this.debug) console.log('set type déplacement', type)
        this.state.choice.typeDeplacement = type;
    },
    setTheme(theme) {
        if (this.debug) console.log('set theme', theme);
        this.state.choice.theme = theme;
    },
    setStyle(style) {
        if (this.debug) console.log('set style', style);
        this.state.choice.style = style;
    },
    setHumeur(humeur) {
        if (this.debug) console.log('set humeur', humeur);
        this.state.choice.humeur = humeur;
    },
    setLieux(lieux) {
        if (this.debug) console.log('set lieux', lieux);
        this.state.choice.lieux = lieux;
    },
    setPath(path) {
        if (this.debug) console.log('set path', path);
        this.state.choice.path = path;
    },
    clearChoice(choiceName) {
        console.log("clear de ",choiceName)
        this.state.choice[choiceName] = undefined
    },
}

const Humeur = Object.freeze({
    OUI: "oui",
    PLUTOT:"plutot",
    BOF: "bof",
    PAS_DU_TOUT: "pas du tout"
})

const TypeDeplacement = Object.freeze({
    VELO: "velo",
    PIED: "pied"
})

const Styles = Object.freeze({
    BOULEVARDS: "boulevards",
    RUELLES: "ruelles"
})

const Themes = Object.freeze({
    ALEA: "alea",
    NATURE: "nature",
    CULTURE: "culture"
})

export {store, TypeDeplacement, Styles, Themes, Humeur}