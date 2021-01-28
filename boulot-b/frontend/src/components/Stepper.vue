<template>
  <div id="nav">
    <img @click="back_home" id="home" src="@/assets/home.svg" alt="home" title="Accueil"/>

    <ul class="progressbar">
        <li id="1" v-on="actif>1 ? {click: () => clickMethod(1)} : { click: ($event) => $event.preventDefault()}" :class="{clickable: actif>1}"></li>
        <li id="2" v-on="actif>2 ? {click: () => clickMethod(2)} : { click: ($event) => $event.preventDefault()}" :class="{clickable: actif>2}"></li>
        <li id="3" v-on="actif>3 ? {click: () => clickMethod(3)} : { click: ($event) => $event.preventDefault()}" :class="{clickable: actif>3}"></li>
        <li id="4" v-on="actif>4 ? {click: () => clickMethod(4)} : { click: ($event) => $event.preventDefault()}" :class="{clickable: actif>4}"></li>
        <li id="5" v-on="actif>5 ? {click: () => clickMethod(5)} : { click: ($event) => $event.preventDefault()}" :class="{clickable: actif>5}"></li>
        <li id="6" v-on="actif>6 ? {click: () => clickMethod(6)} : { click: ($event) => $event.preventDefault()}" :class="{clickable: actif>6}"></li>

    </ul>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "stepper",
  props: {
      actif: {
          type: Number,
          default: 0
      }
  },
  methods: {
    back_home() {
      this.$router.push({name: "Home"})
    },
    setClassActive() {
        let elem = document.getElementById(this.actif);
        elem.className = 'active';
    },
    clickMethod(n) {
        let listRoutes = this.$router.options.routes; 
        this.$router.push({name: listRoutes[n-1].name});
    },
  },
  mounted: function() {
      this.setClassActive()
  }
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
        margin-left: 25px;
    }
    .progressbar {
        width: 80%;
        margin: 20px;
        padding-left: 0;
    }
    .progressbar li {
        list-style-type: none;
        float: left;
        width: 15%;
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
    .clickable:before {
        cursor: pointer;
    }
</style>