const Home = () => import("@/pages/Home/index.vue");
const Search = () => import("@/pages/Search/index.vue");
const Register = () => import("@/pages/Register/index.vue");
const Login = () => import("@/pages/Login/index.vue");
const Detail = () => import("@/pages/Detail/index.vue");

export default [
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
    path: "/detail/:skuId",
    component: Detail,
    name: "detail",
  },
  {
    path: "*",
    redirect: "/home",
  },
];
