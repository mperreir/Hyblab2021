<template>
    <div id="app">
    <img  id="wazo" src="@/assets/wazzo.png"/>
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

#wazo {
  margin: 10px;
  width: 10%;
}

</style>
