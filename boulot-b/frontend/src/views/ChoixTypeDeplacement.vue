<template>
  <div>
    <div id="velo-anim"/>
    <div id="pied-anim"/>
  <Container>
    <template #question >
      <Question  question="Tu te déplaces...">
          <ButtonCustom @click="nextPied"  text="A pied" color="yellow"/>
          <ButtonCustom @click="nextVelo"   text="A vélo" color="blue" />
      </Question>
    </template>
    <template #canari>
      <Oiseau/>
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
  name: "ChoixTypeDeplacement",
  props: {
    actif: Number
  },
  methods: {
    nextVelo() {
     const velo= document.getElementById("velo-anim");
      velo.addEventListener("animationend", () => {
        this.$root.$data.setTypeDeplacement(TypeDeplacement.VELO)
        this.$router.push({name:"choix-destination" })
      });
     velo.classList.add("slide-lr");
      velo.style.display = "block";
    },
    nextPied() {
      document.getElementById("pied-anim").style.display = "block";
      this.pied.play()
      this.pied.setSpeed(2)
      this.pied.addEventListener("complete", () => {
        this.$root.$data.setTypeDeplacement(TypeDeplacement.PIED)
        this.$router.push({name:"choix-destination" })
      });
    },
  },
  mounted() {
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
  #velo-anim, #pied-anim  {
    display: none;
  }

  .slide-lr {
    width: 30%;
    animation: slide-lr 1s ease-in both;
  }

</style>