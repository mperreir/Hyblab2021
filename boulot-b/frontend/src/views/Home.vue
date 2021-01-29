<template>
  <div>
    <div v-show="showAnim.logo" id="wazo-anim" />
    <div v-show="showAnim.canari" id="canari-come" />
  </div>
</template>

<script>
import lottie from "lottie-web";
import logoWazzo from "@/assets/animationJson/wazo_logo_anim.json";
import canariCome from "@/assets/animationJson/wazo_intro.json";
import sonCanari from "@/assets/son/canari.mp3";

export default {
  name: "Home",
  data() {
    return {
      showAnim: {
        logo: true,
        canari: false,
      },
    };
  },
  mounted() {
    const wazzo = document.getElementById("wazzo");
    wazzo.style.display = "none";
    const audio = new Audio(sonCanari);
    const logo = lottie.loadAnimation({
      container: document.getElementById("wazo-anim"),
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: logoWazzo,
    });
    const canari = lottie.loadAnimation({
      container: document.getElementById("canari-come"),
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: canariCome,
    });
    logo.addEventListener("complete", () => {
      this.showAnim.logo = false;
      this.showAnim.canari = true;
      audio.play();
      canari.play();
    });
    canari.addEventListener("complete", () => {
      audio.pause();
      const canariCome = document.getElementById("canari-come");
      canariCome.classList.add("fade");
      canariCome.addEventListener("transitionend", () => {
        this.$router.push({ name: "questionnaire" });
      });
    });
  },
};
</script>

<style scoped>
.fade {
  transition: opacity 0.3s;
}

.fade {
  opacity: 0;
}

#wazo-anim,
#canari-come {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>