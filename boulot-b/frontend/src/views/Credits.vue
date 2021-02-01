<template>
    <div id="main">
        <div id="logo_wazzo">
            <img @click="backHome" id="wazzo" src="@/assets/wazzo.svg"/>
        </div>
        <section id="auteurs">

        </section>
        <div id="logos">

        </div>
    </div>
</template>
<script>
export default {
  name: "Credits",
  methods: {
    backHome() {
      this.$root.$data.setActif(0)
    }
  }
}
</script>

<style scoped>
#main {
    display: flex;
    border: solid red 1px;
    width: 100%;
    height: 100vh;
}
#wazzo {
    cursor: pointer;
}
</style>