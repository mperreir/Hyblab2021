<template>
  <div id="allQuestion">
    <p id="question">{{ question }}</p>
    <div id="answers">
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Answer from "../components/Answer.vue";

export default Vue.component("question", {
  name: "question",
  props: ["question"],
  components: {
    Answer,
  },
});
</script>

<style scoped>


#answers {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: center;
}


#question {
  display: block;
  color: white;
  font-size: 1.2em;
  position: relative;
  text-align: center;
  font-weight: bold;
}
</style>
