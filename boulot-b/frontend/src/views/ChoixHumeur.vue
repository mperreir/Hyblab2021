<template>
  <Container>
    <template #question >
      <Question  >
        <ButtonCustom  @click="oui" text="Oui, très !" color="yellow"/>
        <ButtonCustom  @click="plutot"  text="Plutôt oui !" color="blue" />
        <ButtonCustom  @click="bof" text="Hum bof" color="yellow" />
        <ButtonCustom  @click="pasDuTout" text="Pas du tout !" color="blue" />
      </Question>
    </template>
    <template #canari>
      <Oiseau :message="message"/>
    </template>
    <img id="nuage1" src="@/assets/nuages_svg/nuage3.svg" alt="nuage"/>
    <img id="nuage2" src="@/assets/nuages_svg/nuage2.svg" alt="nuage" />
    <img id="nuage3" src="@/assets/nuages_svg/nuage3.svg" alt="nuage" />
    <template #stepper>
      <Stepper :actif=actif />
    </template>
  </Container>
</template>

<script>
import Container from "@/views/Container"
import Question from "@/components/Question";
import ButtonCustom from "@/components/ButtonCustom";
import Stepper from "@/components/Stepper";
import Oiseau from "@/components/Oiseau";
import {Humeur, TypeDeplacement} from "@/store";

export default {
  choice: "humeur",
  name: "ChoixHumeur",
  data() {
    return {
      message: "C’est noté ! Es-tu d’humeur sportive aujourd’hui ?"
    }
  },
  props: {
    actif: Number
  },
  methods: {
    next() {
      setTimeout(() => {
        this.$root.$data.setActif(this.actif +1)
      }, 1500)
    }
    ,oui() {
      this.$root.$data.setHumeur(Humeur.OUI)
      this.message = "J’ai remarqué que tu avais l’âme d’un sportif !"
      this.next();
    },
    plutot() {
      this.$root.$data.setHumeur(Humeur.PLUTOT)
      this.message = "Super, on est partit !";
      this.next();
    },
    bof() {
      this.$root.$data.setHumeur(Humeur.BOF)
      this.message = "Moi aussi je suis un peu fatigué"
      this.next();
    },
    pasDuTout() {
      this.$root.$data.setHumeur(Humeur.PAS_DU_TOUT)
      this.message = "Après ta journée, je te comprends"
      this.next();
    }
  },
  components: {
    Question,
    Container,
    ButtonCustom,
    Stepper,
    Oiseau
  }
}
</script>

<style scoped>
#nuage1, #nuage2, #nuage3 {
  position: absolute;
  z-index: -1;
}
  #nuage1 {
    top: 40%;
    left: -6%;
    width: 25%;
  }
  #nuage2 {
    top: 35%;
    left: 20%;
    width: 8%;
  }
  #nuage3 {
    bottom: 15%;
    right: -12%;
    width: 35%;
  }
</style>
