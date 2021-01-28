const store = {
    debug: true,
    state: {
        choice: {
            typeDeplacement: undefined,
            theme: undefined,
            style: undefined,
            lieux: [],
            humeur: undefined,
            path: {depart: undefined, arrive: undefined}
        }
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
    clearChoice(listChoice) {
        listChoice.forEach((choice) => {
            this.state.choice[choice] = undefined
        })
    }
}

const TypeDeplacement = Object.freeze({
    VELO: "velo",
    PIED: "pied"
})

export {store, TypeDeplacement}