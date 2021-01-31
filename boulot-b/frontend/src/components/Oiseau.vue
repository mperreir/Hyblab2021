<template>
  <div >
    <transition name="fade" mode="out-in">
      <div class="bubble" :key="msg">
          <p class="text" >{{msg}} </p>
      </div>
    </transition>
    <div @click="tellJoke" id="wazo-anim"  > </div>
  </div>
</template>


<script >
import lottie from "lottie-web";
import {Humeur, Themes} from "@/store";

import canariVanilla from "../assets/animationJson/wazo_vanilla_gauche.json";
import canariCulture from "../assets/animationJson/wazo_culture.json";
import canariSport from "../assets/animationJson/wazo_sport";
import canariCultureSport from "../assets/animationJson/wazo_culture_sport.json";
import canariSportNature from "../assets/animationJson/wazo_sport_nature.json";
import canariNature from "../assets/animationJson/wazo_nature.json";
import jokes from '@/assets/joke.json'

function Joke() {
  this.state = question(this)
  this.tellJoke = () => {
    return this.state()
  }
}

function question(Joke) {
  return () => {
    const jokeItem = jokes[Math.floor(Math.random() * jokes.length)];
    Joke.state =  answer(Joke, jokeItem.answer)
    return jokeItem.joke
  }
}

function answer(Joke, ans) {
  return  () => {
    Joke.state =  question(Joke)
    return ans
  }
}


export default {
  name: "Oiseau",
  props: {
    message: String,
    anim: {
      default: () => canariVanilla
    }
  },
  data() {
    const choixhumeur =this.$root.$data.state.choice.humeur;
    const choixtheme = this.$root.$data.state.choice.theme;
    let animm;
    if(choixhumeur === Humeur.OUI || choixhumeur === Humeur.PLUTOT ){
      if( choixtheme === Themes.NATURE ){
          animm = canariSportNature
      }
      else if (choixtheme === Themes.CULTURE ){
          animm = canariCultureSport
      } else {
          animm = canariSport
      }
    } else {
        if( choixtheme === Themes.NATURE ){
          animm = canariNature
      }
      else if (choixtheme === Themes.CULTURE ){
          animm = canariCulture
      }else{
          animm = canariVanilla
      }
    }
    return {
      animm,
      msg : this.message,
      joke: new Joke()
    }
  },
  methods: {
    tellJoke() {
      this.msg = this.joke.tellJoke()
    }
  },
  watch: {
    message() {
      this.msg = this.message
    }
  },
  mounted () {
      lottie.loadAnimation({
      container : document.getElementById('wazo-anim'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: this.animm, // par défaut
    })
  },

};
</script>

<style scoped lang="scss">
  $bulle: #139ee0;

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .text {
    font-family: Poppins,serif;
    font-size: 1.2em;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0;
    text-align: center;
  }


  #wazo-anim {
    width: 300px;
  }
  #wazo-anim:hover {
    opacity: 0.5;
    cursor: pointer;
  }

  .bubble{
    background: $bulle;
    color:#fff;
    padding:5px 15px;
    border-radius: 50px;
    width:350px;
  }

  .bubble::after{
    content:"";
    border-left:30px solid transparent;
    border-right:30px solid transparent;
    border-top: 30px solid $bulle;
    margin-left: 150px;
    position: absolute;
  }

</style>

