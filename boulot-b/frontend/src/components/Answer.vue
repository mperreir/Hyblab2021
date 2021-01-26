<template>
  <div>
    <div v-for="answer in answers" :key="answer">
      <p> {{ answer }} </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.component("answer", {
  name: "answer",
  props: ["answers"],
});
</script>

<style scoped>
</style>