import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/registerUser",
    component: () => import("../views/RegisterUser.vue"),
  },
  //パスが登録されていない場合はログイン画面
  {
    path: "*",
    component: () => import("../views/Login.vue"),
  },

  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/logout",
    component: () => import("../views/Logout.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
