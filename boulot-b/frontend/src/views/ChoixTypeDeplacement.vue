<template>
  <div>
    <div class="hide" id="velo-anim"/>
    <div class="hide" id="pied-anim"/>
  <Container>
    <template #question >
      <Question  question="Tu te déplaces...">
          <ButtonCustom @click="nextPied"  text="A pied" color="yellow"/>
          <ButtonCustom @click="nextVelo"   text="A vélo" color="blue" />
      </Question>
    </template>
    <template #canari>
      <Oiseau :message="message"  />
    </template>
    <template #stepper>
      <Stepper :actif=actif />
    </template>
  </Container>
  </div>
</template>

<script>
import Container from "@/views/Container"
import Question from "@/components/Question";
import ButtonCustom from "@/components/ButtonCustom";
import Stepper from "@/components/Stepper";
import Oiseau from "@/components/Oiseau";
import velo from "@/assets/animationJson/wazo_velo.json"
import pied from "@/assets/animationJson/wazo_pas.json"
import {TypeDeplacement} from "@/store";
import lottie from "lottie-web";

export default {
  choice: "typeDeplacement",
  name: "ChoixTypeDeplacement",
  data() {
    return {
      message: "Tout d’abord, quel moyen de transport souhaites-tu emprunter ? "
    }
  },
  props: {
    actif: Number
  },
  methods: {
    next() {
      const listRoutes = this.$router.getRoutes();
      this.$router.push({name: listRoutes[this.actif + 1].name});
    },
    nextVelo() {
      this.message = "Super ! Sais-tu que tu as économisé .... en Co2 ? La planète te remercie"
     const velo= document.getElementById("velo-anim");
      velo.classList.add("slide-lr");
      velo.addEventListener("animationend", () => {
        this.$root.$data.setTypeDeplacement(TypeDeplacement.VELO)
        this.next();
      });
    },
    nextPied() {
      this.message = "Super ! Sais-tu que tu as économisé .... en Co2 ? La planète te remercie"
      document.getElementById("pied-anim").style.display = "block";
      this.pied.play()
      this.pied.addEventListener("complete", () => {
        this.$root.$data.setTypeDeplacement(TypeDeplacement.PIED)
        this.next();
      });
    },
  },
  mounted() {
     const wazzo = document.getElementById('wazzo');
     wazzo.style.display = 'block';
     this.pied = lottie.loadAnimation({
      container: document.getElementById("pied-anim"), // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: pied,
    });
    lottie.loadAnimation({
      container: document.getElementById("velo-anim"), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: velo
    });
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
@keyframes slide-lr {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(300%);
  }
}
  .hide {
    display: none;
  }

  .slide-lr {
    display: block;
    width: 30%;
    animation: slide-lr 1s ease-in both;
  }

</style>