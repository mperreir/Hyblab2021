<template>
  <div id="app">
    <img  id="wazo" src="@/assets/wazzo.png"/>
      <!-- <template>
        <Buildings first-tree-is-active yellow-is-active second-tree-is-active/>
      </template> -->
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

#wazo {
  margin: 10px;
  width: 10%;
}

</style>
