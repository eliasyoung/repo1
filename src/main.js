import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import router from "@/router/index";
import VueRouter from "vue-router";
import store from "./store";

import TripMenu from "@/components/TripMenu";
import CarouselComponent from "@/components/Carousel";
import PaginationComponent from "@/components/Pagination";

import "@/mock/mockServe";

import "swiper/css/swiper.css";

Vue.component(TripMenu.name, TripMenu);
Vue.component(CarouselComponent.name, CarouselComponent);
Vue.component(PaginationComponent.name, PaginationComponent);

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
  created() {
    Vue.prototype.$bus = this;
  },
  mounted() {
    // store.dispatch("home/getBaseCategoryList");
  },
}).$mount("#app");
