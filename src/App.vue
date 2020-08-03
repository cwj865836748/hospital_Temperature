<template>
  <div id="app">
    <keep-alive class="keep">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="noKeep" v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>

export default {

  name: 'App'

}
</script>

<style lang="scss">
  @import "assets/css/reset.scss";
  [v-cloak]{ display:none}
  #app {
    width: 100% !important;
    height: 100%;

  }

</style>
