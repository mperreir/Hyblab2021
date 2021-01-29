<template>
    <div id="app">
    <img  id="wazzo" src="@/assets/wazzo.svg"/>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#wazzo {
  margin: 40px;
  width: 10%;
}

</style>
