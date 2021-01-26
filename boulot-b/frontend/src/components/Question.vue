<template>
  <div id="allQuestion">
    <p id="question"> {{ question }} </p>
    <answer v-bind:answers="answers"></answer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Answer from "../components/Answer.vue"

export default Vue.component("question", {
  name: "question",
  props: ["question", "answers"],
  components: {
    Answer
  }
});
</script>

<style scoped>
  #allQuestion {
    display: block;
    position: absolute;
    width: 30%;
    top: 30%;
    left: 30%;
  }

  #question {
    display: block;
    color: white;
    position: relative;

    text-align: center;
    font-weight: bold;
  }
</style>
