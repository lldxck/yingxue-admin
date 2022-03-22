import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import("views/Login");
const Layout = () => import("views/Layout");
const Home = () => import("views/Home");

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/index",
    redirect: "/index",
    component: Layout,
    children: [
      {
        path: "/index",
        name: "home",
        component: Home,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
