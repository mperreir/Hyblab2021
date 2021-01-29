<template>
  <div>
    <div v-show="showAnim === Anim.VIDEO" id="video-anim" />
    <div v-show="showAnim === Anim.LOGO" id="wazo-anim" />
    <div v-show="showAnim === Anim.CANARI" id="canari-come" />
  </div>
</template>

<script>
import lottie from "lottie-web";
import logoAnim from "@/assets/animationJson/wazo_logo_anim.json";
import canariAnim from "@/assets/animationJson/wazo_intro.json";
import sonCanari from "@/assets/son/canari.mp3";
import videoAnim from '@/assets/animationJson/video_intro.json'

const Anim = {
  VIDEO: "video",
  LOGO: "logo",
  CANARI: "canari"
}

export default {
  name: "Home",
  data() {
    return {
      Anim,
      showAnim: Anim.VIDEO
    };
  },
  mounted: function () {
    const wazzo = document.getElementById("wazzo");
    wazzo.style.display = "none";
    const audio = new Audio(sonCanari);
    const {logo, canari, video} = this.loadAnim();
    video.play();
    video.addEventListener("complete", () => {
      this.showAnim = Anim.LOGO
      logo.play();
    })
    logo.addEventListener("complete", () => {
      this.showAnim = Anim.CANARI
      audio.play();
      canari.play();
    });
    canari.addEventListener("complete", () => {
      audio.pause();
      const canariCome = document.getElementById("canari-come");
      canariCome.classList.add("fade");
      canariCome.addEventListener("transitionend", () => {
        wazzo.style.display = "block";
        this.$router.push({ name: "questionnaire" });
      });
    });
  },
  methods: {
    loadAnim() {
      const video = lottie.loadAnimation({
        container: document.getElementById("video-anim"),
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: videoAnim,
      });
      const logo = lottie.loadAnimation({
        container: document.getElementById("wazo-anim"),
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: logoAnim,
      });
      const canari = lottie.loadAnimation({
        container: document.getElementById("canari-come"),
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: canariAnim,
      });
      return {logo, canari, video};
    },
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