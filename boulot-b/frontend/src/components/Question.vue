<template>
  <div>
    <p> {{ question }} </p>
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
</style>
