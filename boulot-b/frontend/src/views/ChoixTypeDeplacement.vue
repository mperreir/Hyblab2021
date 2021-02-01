<template>
  <div>
    
    
  <Container>
    
    <template #question >
      <Question  question="Tu te déplaces...">
          <ButtonCustom @click="nextPied"  text="À pied" color="yellow"/>
          <ButtonCustom @click="nextVelo"   text="À vélo" color="blue" />
      </Question>
    </template>
    <template #canari>
      <Oiseau :message="message"  />
    </template>
    <img id="nuage1" src="@/assets/nuages_svg/nuage3.svg" alt="nuage"/>
    <img id="nuage2" src="@/assets/nuages_svg/nuage2.svg" alt="nuage" />
    <img id="nuage3" src="@/assets/nuages_svg/nuage3.svg" alt="nuage" />
    <img id="nuage4" src="@/assets/nuages_svg/nuage1.svg" alt="nuage" />
    <div id="velo-anim"/>
    <div id="pied-anim"/>
    <template #stepper>
      <Stepper  :actif=actif />
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
import sonVelo from "@/assets/son/sonnette_velo.mp3"
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
      this.$root.$data.setActif(this.actif +1)
    },
    nextVelo() {
      this.message = "Super ! En selle !"
     const velo= document.getElementById("velo-anim");
     const audio = new Audio(sonVelo);
     audio.volume=0.2;
     audio.play();
      velo.classList.add("slide-lr");
      velo.addEventListener("animationend", () => {
        this.$root.$data.setTypeDeplacement(TypeDeplacement.VELO)
        this.next();
      });
    },
    nextPied() {
      this.message = "Super ! "
      document.getElementById("pied-anim").style.display = "block";
      this.pied.play()
      this.pied.addEventListener("complete", () => {
        this.$root.$data.setTypeDeplacement(TypeDeplacement.PIED)
        this.next();
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
    transform: translateX(400%);
  }
}
  .hide {
    display: none;
  }
  #velo-anim {
    position: absolute;
    width: 30%;
    bottom: -19%;
    left: -8%;
    z-index: -1;
  }
   #pied-anim {
    position: absolute;
    width: 55%;
    rotate: 13deg;
    bottom: -45%;
    right: -10%;
    z-index: -1;
  }
  .slide-lr {
    display: block;
    width: 30%;
    animation: slide-lr 1s ease-in both;
  }
  #nuage1, #nuage2, #nuage3, #nuage4 {
    position: absolute;
    z-index: -1;
  }  
  #nuage1 {
    top: 25%;
    left: -6%;
    width: 25%;
  }
  #nuage2 {
    top: 20%;
    left: 20%;
    width: 8%;
  }
  #nuage3 {
    bottom: 52%;
    right: -12%;
    width: 50%;
  }
  #nuage4 {
    bottom: 25%;
    left: 25%;
    width: 10%;
  }
</style>