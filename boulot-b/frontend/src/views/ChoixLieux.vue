<template>
  <Container>
    <template #question >
      <Question question="Sélectionne les lieux qui t'intéressent!">
        <div id="choix">
          <img id="haltere" src="@/assets/map/haltere.svg" alt="haltere">
          <ButtonCustom id="sport" @click="checkSalle" v-model="salleDeSport" :class="{checkedYellow: salleDeSport}" text="Salle de Sport" color="yellow" />
          <ButtonCustom id="bar" @click="checkBar" v-model="bar" :class="{checkedBlue: bar}" text="Bar" color="blue" />
          <img id="verre" src="@/assets/map/verre.png" alt="verre">
          <img id="pain" src="@/assets/map/baguette.svg" alt="pain">
          <ButtonCustom id="boulangerie" @click="checkBoulangerie" v-model="boulangerie" :class="{checkedBlue: boulangerie}" text="Boulangerie" color="blue" />
          <ButtonCustom id="pharmacie" @click="checkPharmacie" v-model="pharmacie" :class="{checkedYellow: pharmacie}" text="Pharmacie" color="yellow"/>
          <img id="meds" src="@/assets/map/medicament.svg" alt="medicament">
        </div>
      <!-- <Question>
        <Checkbox v-model="pharmacie"  color="yellow" >Pharmacie</Checkbox>
        <Checkbox v-model="bar" color="blue" >Bar</Checkbox>
        <Checkbox v-model="boulangerie" color="yellow" >Boulangerie</Checkbox>
        <Checkbox v-model="salleDeSport" color="blue" >Salle de sport</Checkbox>-->
        <ButtonCustom class="button-launch" @click="next" text="Afficher la carte !" color="blue" />
      </Question>
    </template>
    <template #buildings>
      <Buildings/>
    </template>
    <template #canari>
      <Oiseau :message="message" />
    </template>
    <template #stepper>
      <Stepper :actif=actif />
    </template>
  </Container>
</template>

<script>
import Container from "@/views/Container"
import Stepper from "@/components/Stepper";
import Question from "@/components/Question";
import Checkbox from "@/components/Checkbox";
import ButtonCustom from "@/components/ButtonCustom";
import Oiseau from "@/components/Oiseau";
import Buildings from "@/components/Buildings";

export default {
  choice: "lieux",
  name: "ChoixLieux",
  props: {
    actif: Number
  },
  data() {
    return {
      message: "J’ai trouvé plusieurs lieux qui pourraient t’intéresser, ça te dit d’y passer ?",
      pharmacie: false,
      bar: false,
      boulangerie: false,
      salleDeSport:false
    }
  },
  methods : {
    async next() {
      this.message = " Merci pour tes réponses ! Je génère ton trajet, plus que quelques secondes à patienter avant de pouvoir prendre ton envol !"
      this.$root.$data.setLieux({pharmacie: this.pharmacie,
        boulangerie: this.boulangerie,
        bar: this.bar,
        salleDeSport: this.salleDeSport})
      try {
        await this.$root.$data.fetchTrajet()
        this.$root.$data.setActif(this.actif +1)
      } catch(e) {
        this.message = "Désolé, je n'ai pas trouvé de chemin"
      }
    },
    checkPharmacie() {
      this.pharmacie = !this.pharmacie;
    },
    checkBoulangerie() {
      this.boulangerie = !this.boulangerie;
    },
    checkBar() {
      this.bar = !this.bar;
    },
    checkSalle() {
      this.salleDeSport = !this.salleDeSport;

    },
    hover() {
      const sport = document.getElementById('sport');
      const bar = document.getElementById('bar');
      const boulang = document.getElementById('boulangerie');
      const pharma = document.getElementById('pharmacie');
      const haltere = document.getElementById('haltere');
      sport.addEventListener("mouseover", function () {
        haltere.style.display = "block";
      })
      sport.addEventListener("mouseleave", function () {
        haltere.style.display = "none";
      })    
      const verre = document.getElementById('verre');
      bar.addEventListener("mouseover", function () {
        verre.style.display = "block";
      })
      bar.addEventListener("mouseleave", function () {
        verre.style.display = "none";
      })
      const pain = document.getElementById('pain');
      boulang.addEventListener("mouseover", function () {
        pain.style.display = "block";
      })
      boulang.addEventListener("mouseleave", function () {
        pain.style.display = "none";
      })
      const meds = document.getElementById('meds');
      pharma.addEventListener("mouseover", function () {
        meds.style.display = "block";
      })
      pharma.addEventListener("mouseleave", function () {
        meds.style.display = "none";
      })
    }
  },
  components: {
    ButtonCustom,
    Question,
    Checkbox,
    Container,
    Stepper,
    Oiseau,
    Buildings
  },
  mounted: function () {
    this.hover();
  }
}
</script>

<style scoped>
  #choix {
    display: flex;
    position: relative;
    min-width: 400px;
    max-width: 510px;
    width: 60%;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .button {
    min-width: 100px;
    width: 40%;
    margin: 20px;
  }

  .checkedYellow:before {
    content: '';
    position: absolute;
    width: 110%;
    height: 126%;
    left: -7%;
    top: -20%;
    border-radius: 30px;
    border: solid 3px  #ffdb27;
  }
    .checkedBlue:before {
    content: '';
    position: absolute;
    width: 110%;
    height: 126%;
    left: -7%;
    top: -20%;
    border-radius: 30px;
    border: solid 3px  #0ec0ec;
  }
  #haltere {
    pointer-events: none;
    display: none;
    position: absolute;
    left: -5%;
    top: -10%;
    z-index: 12;
  }
  #verre {
    pointer-events: none;
    display: none;
    position: absolute;
    width: 8%;
    right: 5%;
    top: -8%;
    z-index: 12;
  }
  #pain {
    pointer-events: none;
    display: none;
    position: absolute;
    left: -9%;
    bottom: 10%;
    z-index: 12;
  }
  #meds {
    pointer-events: none;
    display: none;
    position: absolute;
    right: 0%;
    bottom: 10%;
    z-index: 12;
  }
</style>
