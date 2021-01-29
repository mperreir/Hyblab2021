<template>
  <button   @click="click" :class=color class="button">
    {{ text }}
  </button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.component("buttonCustom", {
  name: "buttonCustom",
  props: {
    color: String,
    text: String
  },
  methods: {
    click() {
      this.$emit("click")
    }
  }
});
</script>

<style scoped lang="scss">
$blue:  #0ec0ec;
$yellow: #ffdb27;
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

  .yellow {
    background-color: $yellow;
  }
  .yellow:hover {
    background-color: darken($yellow, 20%);
  }
  .blue:hover {
    background-color: darken($blue,20%);
  }

  .blue {
    background-color: $blue;
  }

</style>