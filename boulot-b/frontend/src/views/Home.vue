<template>
  <div>
    <div v-show="showAnim.logo" id="wazo-anim"/>
    <div v-show="showAnim.canari" id="canari-come"/>
  </div>
</template>

<script>
import lottie from "lottie-web"
import logoWazzo from "@/assets/animationJson/wazo_logo_anim.json"
import canariCome from "@/assets/animationJson/wazo_intro.json"

export default {
  name: "Home",
  data() {
    return {
      showAnim: {
        logo: true,
        canari: false
      }
    }
  },
  mounted () {
    const logo = lottie.loadAnimation({
      container : document.getElementById('wazo-anim'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: logoWazzo
    })
    const canari = lottie.loadAnimation({
      container : document.getElementById('canari-come'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: canariCome
    })
    logo.addEventListener("complete", () => {
      this.showAnim.logo = false;
      this.showAnim.canari = true;
      canari.play()
    });
    canari.addEventListener("complete", () => {
      this.$router.push({name: "questionnaire" })
    });
  }
}
</script>

<style scoped>

#wazo-anim, #canari-come {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

</style>