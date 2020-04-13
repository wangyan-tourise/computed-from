<template>
  <div id="app">
    <Menus></Menus>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Menus from './components/menus'
export default {
  name: 'App',
  components: {
    Menus,
  }
}
</script>

<style scoped>
#app {
  height: 100%;
	width: 100%;
	display: inline-block;
}
#app .content {
  width: 85%;
  height: 100%;
  background: black;
  float: right;
}
</style>
