import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import router from "@/router/index";
import VueRouter from "vue-router";
import store from './store'

import TripMenu from "@/components/TripMenu";

Vue.component(TripMenu.name, TripMenu);

const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve || reject) {
    return originPush.call(this, location, resolve, reject);
  }
  return originPush.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      return err;
    }
    return Promise.reject(err);
  });
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve || reject) {
    return originReplace.call(this, location, resolve, reject);
  }
  return originReplace.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      return err;
    }
    return Promise.reject(err);
  });
};

new Vue({
  render: (h) => h(App),
  router,
  store,
  mounted(){
    // store.dispatch("home/getBaseCategoryList");
  }
}).$mount("#app");
