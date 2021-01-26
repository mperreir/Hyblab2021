<template>
  <button @click="click" :id=color class="button">
    {{ text }}
  </button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.component("buttonCustom", {
  name: "buttonCustom",
  props: ['color', 'text'],
  methods: {
    click() {
      this.$emit("click")
    }
  }
});
</script>

<style scoped>
  .button {
    margin: 10px;
    display: block;
    border: none;
    border-radius: 5px;
    position: relative;
    color: white;
    font-weight: bold;
    padding: 8px 30px;
    cursor: pointer;
    text-align: center;
  }

  #yellow {
    background-color: yellow;
  }
  #yellow:hover {
    background-color: #bbbb00;
  }
  #blue:hover {
    background-color: #0790a8;
  }

  #blue {
    background-color: #0ec0ec;
  }

</style>