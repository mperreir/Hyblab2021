<template>
  <div>michel</div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "question",
  methods: {
    back_home() {
      this.$emit("switch-component");
    },
  },
});
</script>

<style scoped>
</style>
