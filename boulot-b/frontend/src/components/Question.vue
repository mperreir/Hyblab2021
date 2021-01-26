<template>
  <div>michel</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "question",
  methods: {
    launch() {
      this.$emit("switch-component");
    },
  },
});
</script>

<style scoped>
</style>
