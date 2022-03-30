import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router";

import routes from "./routes";

Vue.use(Router);

export default new VueRouter({
  routes,
  scrollBehavior(to) {
    if (to.name == "detail") return { y: 0 };
  },
});
