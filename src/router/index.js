import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import("views/Login");
const Layout = () => import("views/Layout");
const Home = () => import("views/Home");
const Category = () => import("views/Category");
const User = () => import("views/User");
const Video = () => import("views/Video");

export const routes = [
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
        meta: {
          title: "首页",
          icon: 'el-icon-s-home',
        },
      },
    ],
  },
  {
    path: "/category",
    redirect: "/category",
    component: Layout,
    children: [
      {
        path: "/category",
        name: "category",
        component: Category,
        meta: {
          title: "分类",
          icon:'el-icon-s-grid'
        },
      },
    ],
  },
  {
    path: "/user",
    redirect: "/user",
    component: Layout,
    children: [
      {
        path: "/user",
        name: "user",
        component: User,
        meta: {
          title: "用户",
          icon:'el-icon-user'
        },
      },
    ],
  },
  {
    path: "/video",
    redirect: "/video",
    component: Layout,
    children: [
      {
        path: "/video",
        name: "video",
        component: Video,
        meta: {
          title: "视频",
          icon:'el-icon-video-camera'
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
