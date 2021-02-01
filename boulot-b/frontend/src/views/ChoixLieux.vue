<template>
  <Container>
    <template #question >
      <Question question="Sélectionne les lieux qui t'intéressent!">
        <div id="choix">
          <img id="haltere" src="@/assets/map/haltere.svg" alt="haltere">
          <ButtonCustom @click="checkSalle" v-model="salleDeSport" :class="{checkedYellow: salleDeSport}" text="Salle de Sport" color="yellow" />
          <ButtonCustom @click="checkBar" v-model="bar" :class="{checkedBlue: bar}" text="Bar" color="blue" />
          <img id="verre" src="@/assets/map/verre.svg" alt="verre">
          <img id="pain" src="@/assets/map/baguette.svg" alt="pain">
          <ButtonCustom @click="checkBoulangerie" v-model="boulangerie" :class="{checkedBlue: boulangerie}" text="Boulangerie" color="blue" />
          <ButtonCustom @click="checkPharmacie" v-model="pharmacie" :class="{checkedYellow: pharmacie}" text="Pharmacie" color="yellow"/>
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
        await this.$root.$data.fetchTrajet()
        this.$root.$data.setActif(this.actif +1)
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
    position: absolute;
    left: -5%;
    top: -10%;
    z-index: 12;
  }
  #verre {
    position: absolute;
    right: -8%;
    top: -10%;
    z-index: 12;
  }
  #pain {
    position: absolute;
    left: -9%;
    bottom: 10%;
    z-index: 12;
  }
  #meds {
    position: absolute;
    right: 0%;
    bottom: 10%;
    z-index: 12;
  }
</style>
