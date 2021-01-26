<template>
  <div id="nav">
    <img @click="back_home" id="home" src="@/assets/home.svg" alt="home" title="Home"/>

    <ul class="progressbar">
        <li class="active"></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Nav",
  methods: {
    back_home() {
      this.$emit("switch-component", "PointDeDepart");
    },
  },
});
</script>

<style scoped>
    #nav {
        width: 30%;
        display: flex;
        align-content: center;
    }
    #home {
        cursor: pointer;
        margin: 10px;
    }
    .progressbar {
        width: 80%;
        margin: 20px;
        padding-left: 0;
    }
    .progressbar li {
        list-style-type: none;
        float: left;
        width: 20%;
        position: relative;
        text-align: center;
    }
    .progressbar li:before {
        content: '';
        width: 20px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #FFDB27;
        border-radius: 50%;
        display: block;
        text-align: center;
        margin: 0 auto 0 auto;
        background-color: #FFDB27;
    }
    .progressbar li:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 5px;
        background-color: #FFDB27;
        top: 10px;
        left: -50%;
        z-index: -1;
    }
    .progressbar li:first-child:after {
        content: none;
    }
    .progressbar li.active:before {
        border: 3px solid #35DBFF;
    }
</style>