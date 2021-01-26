<template>
  <div>
    <question v-bind:question="question" v-bind:answers="answers"></question>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Question from "../components/Question.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Question
  },
  data() {
    return {
      question: "Question ?",
      answers: ['Q1', 'Q2']
    };
  },
});
</script>