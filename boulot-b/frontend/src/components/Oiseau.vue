<template>
  <div >
      <div class="bubble">
        <transition name="fade" mode="out-in">
          <p class="text" :key="message" >{{message}} </p>
        </transition>
      </div>
    <div id="wazo-anim" > </div>
  </div>
</template>


<script >
import lottie from "lottie-web";
import canariAnimation from "../assets/animationJson/wazo_vanilla_gauche.json";

export default {
  name: "Oiseau",
  props: {
    message: String,
    anim: {
      default: () => canariAnimation
    }
  },
    mounted () {
    lottie.loadAnimation({
    container : document.getElementById('wazo-anim'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: this.anim
      })
    }
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
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0;
    text-align: left;
  }
  #wazo-anim {
    width: 200px;
  }

  .bubble{
    background: $bulle;
    color:#fff;
    padding:5px 15px;
    border-radius:3px;
    width:350px;
  }

  .bubble::after{
    content:"";
    border-left:20px solid transparent;
    border-right:20px solid transparent;
    border-top: 20px solid $bulle;
    position: absolute;
  }

</style>

