import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router";

import routes from "./routes";

Vue.use(Router);

// import Home from "@/pages/Home/index.vue";
// import Search from "@/pages/Search/index.vue";
// import Register from "@/pages/Register/index.vue";
// import Login from "@/pages/Login/index.vue";

export default new VueRouter({
  routes,
  scrollBehavior(to) {
    if (to.name == "detail") return { y: 0 };
  },
});
