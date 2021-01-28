<template>
  <div id="wazo-anim"/>
</template>

<script>
import lottie from "lottie-web"
import introAnim from "@/assets/animationJson/wazo_logo_anim.json"
export default {
  name: "Home",
  mounted () {
    const intro = lottie.loadAnimation({
      container : document.getElementById('wazo-anim'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: introAnim
    })
    intro.addEventListener("complete", () => {
      this.$router.push({name:"choix-type"})
    });
  }
}
</script>

<style scoped>

#wazo-anim {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

</style>