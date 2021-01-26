<template>
  <div id="app">
    <img  id="wazo" src="@/assets/wazo.png"/>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

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
