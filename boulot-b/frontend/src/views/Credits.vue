<template>
    <div id="main">
        <div id="logo_wazzo">
            <img @click="backHome" id="wazzo" src="@/assets/wazzo.svg"/>
        </div>
        <section id="auteurs">
            <div class="names" id="production">
                <h1>Production éditoriale</h1>
                <p>Vincent Raoul</p>
                <p>Eva Corman</p>
            </div>
            <div class="names" id="graphistes">
                <h1>Graphistes</h1>
                <p>Rebecca Grima</p>
                <p>Charles Gauthier</p>
            </div>
            <div class="names" id="devs">
                <h1>Développeurs</h1>
                <p>Antoine Garnier </p>
                <p>Clément Hue</p>
                <p>Corentain Foulon</p>
                <p>Florent Riviere</p>
                <p>Evan Gisdal</p>
                <p>Emile Vigin</p>
                <p>Tran Mickaël Lumière</p>
            </div>
            <div id="liens">
                <p>données et informations</p>
                <a href="https://www.nantes-tourisme.com/fr">www.nantes-tourisme.com</a>
                <a href="https://fr.wikipedia.org/">fr.wikipedia.org</a>
                <a href="https://metropole.nantes.fr/">metropole.nantes.fr</a>
            </div>
            <img @click="goBack" id="retour" src="@/assets/retour.svg" alt="retour">
        </section>
        <div id="logos">
            <img class="logo" src="@/assets/hyblab.svg" alt="hyblab">
            <img class="logo" src="@/assets/OML.svg" alt="ouest_media_lab">
            <img class="logo" src="@/assets/polytech.svg" alt="polytech">
            <img class="logo" src="@/assets/agr.svg" alt="agr">
            <img class="logo" src="@/assets/audencia.svg" alt="audencia">
            <img class="logo" src="@/assets/univ_nantes.svg" alt="univ_nantes">
            <img class="logo" src="@/assets/open_source.svg" alt="open_source">
            <img class="logo" src="@/assets/logoCC.svg" alt="logoCC">
        </div>
    </div>
</template>
<script>
export default {
  name: "Credits",
  methods: {
    backHome() {
      this.$root.$data.setActif(0);
    },
    goBack() {
        this.$root.$data.setActif(6);
    }
  }
}
</script>

<style scoped>
#main {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    color: white;
    font-size: 1.1em;
}
#logo_wazzo {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
}
#wazzo {
    width: 12%;
    padding-top: 3%;
    padding-bottom: 2%;
    cursor: pointer;
}
h1 {
    font-size: 1.5em;
    font-weight: bold;
}
#auteurs {
    display: flex;
    flex-wrap: wrap;
    min-height: 15%;
    justify-content: center;
    align-content: center;
}
.names {
    text-align: center;
    padding: 25px;
    width: 20%;
}
#devs {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: left;

}
#devs h1 {
    padding: 0;
    margin: 20px auto 0 auto;
    width: 100%;
}
#devs p {
    width: 45%;
    padding-right: 5px;
}
#liens {
    width: 100%;
    text-align: center;
}
a {
    display: block;
    color: white;
    font-weight: bold;
    text-decoration: none;
}
#retour {
    width: 3%;
    margin-top: 2%;
    margin-bottom: 2%;
}
#logos {
    display: flex;
    align-content: center;
    justify-content: space-between;
    background: white;
    min-height: 10vh;
    padding: 15px;
}
.logo {
    max-width: 10%;
}

</style>