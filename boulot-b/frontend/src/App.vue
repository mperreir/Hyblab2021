<template>
    <div id="app">
    <img  id="wazzo" src="@/assets/wazzo.svg"/>
      <router-view />
  </div>
</template>

<script>
import Buildings from "@/components/Buildings";
export default {
  components: {
    Buildings
  }
}

</script>
<style lang="scss">

#wazzo {
  margin: 40px;
  width: 10%;
}

</style>
