<template>
  <div v-on:click="click(text)" v-bind:id=color class="button">
    {{ text }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.component("buttonCustom", {
  name: "buttonCustom",
  props: ['color', 'text'],
  methods: {
    click(text) {
      this.$emit("getChoice", text)
    }
  }
});
</script>

<style scoped>
  .button {
    display: block;
    position: relative;

    text-align: center;
    margin-bottom: 5px;
  }

  #yellow {
    background-color: yellow;
  }

  #blue {
    background-color: #0ec0ec;
  }
</style>