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
