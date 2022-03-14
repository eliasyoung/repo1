import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router";

Vue.use(Router);

// import Home from "@/pages/Home/index.vue";
// import Search from "@/pages/Search/index.vue";
// import Register from "@/pages/Register/index.vue";
// import Login from "@/pages/Login/index.vue";

const Home = () => import("@/pages/Home/index.vue");
const Search = () => import("@/pages/Search/index.vue");
const Register = () => import("@/pages/Register/index.vue");
const Login = () => import("@/pages/Login/index.vue");

export default new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/search/:keyword?",
      // path: "/search",
      component: Search,
      name: "search",
    },
    {
      path: "/register",
      component: Register,
      meta: { hideFooter: true },
    },
    { path: "/login", component: Login, meta: { hideFooter: true } },
    {
      path: "*",
      redirect: "/home",
    },
  ],
});
