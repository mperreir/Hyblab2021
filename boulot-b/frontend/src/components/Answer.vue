<template>
  <div class="answers">
    <div v-for="answer in answers" :key="answer">
      <buttonCustom v-bind:text="answer" v-bind:color=chooseColor(color)></buttonCustom>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ButtonCustom from "../components/ButtonCustom.vue"

export default Vue.component("answer", {
  name: "answer",
  props: ["answers"],
  components: {
    ButtonCustom
  },

  methods: {
    chooseColor() {
      if (this.color === 'yellow') {
        this.color = 'blue';
        return 'yellow';
      }
      this.color = 'yellow';
      return 'blue';
    }
  },
  
  data() {
    return {
      color: 'yellow'
    }
  }
});
</script>

<style scoped>
  .answers {
    display: inline;
    position: relative;
  }
</style>