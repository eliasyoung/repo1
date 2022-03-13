<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <AppHeader></AppHeader>
    <router-view></router-view>
    <app-footer v-show="!this.$route.meta.hideFooter"></app-footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import AppHeader from "@/components/Header/index.vue";
import AppFooter from "@/components/Footer/index.vue";

export default {
  name: "App",
  components: {
    // HelloWorld
    AppHeader,
    AppFooter,
  },
  mounted() {
    this.$store.dispatch("home/getBaseCategoryList");
  },
};
</script>

<style lang="less">
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#nprogress {
  .bar {
    background: black !important;
  }
}
</style>
