<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import Login from "./views/Login.vue";
// import Home from "./views/Home.vue";

export default {
  name: "app",
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f5f7f9;

  width: 100vw;
  height: 100vh;
  overflow: hidden;

  --border: 1px solid #d7dde4;
}
</style>
