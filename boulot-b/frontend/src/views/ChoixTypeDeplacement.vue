<template>
  <div>
    <div id="velo-anim"/>
    <div id="pied-anim"/>
  <Container>
    <template #question >
      <Question  question="Tu te déplaces...">
          <ButtonCustom @click="nextPied" class="pied" text="A pied" color="yellow"/>
          <ButtonCustom @click="nextVelo" class="velo"  text="A vélo" color="blue" />
      </Question>
    </template>
    <template #canari>
      <Oiseau/>
    </template>
    <template #stepper>
      <Stepper :actif=1 />
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
import lottie from "lottie-web";

export default {
  name: "ChoixTypeDeplacement",
  methods: {
    nextVelo() {
     const velo= document.getElementById("velo-anim");
      velo.addEventListener("animationend", () => {
        this.$router.push({name:"choix-style" })
      });
     velo.classList.add("slide-lr");
      velo.style.display = "block";
    },
    nextPied() {
      this.pied.play()
      this.pied.setSpeed(2)
      this.pied.addEventListener("complete", () => {
        this.$router.push({name:"choix-style" })
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
  #velo-anim  {
    display: none;
  }

  .slide-lr {
    width: 30%;
    animation: slide-lr 1s ease-in both;
  }
</style>