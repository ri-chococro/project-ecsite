import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/cartList",
    component: () => import("../views/CartList.vue"),
  },
  //パスが登録されていない場合はログイン画面へ
  // {
  //   path: "*",
  //   component: () => import("../views/Login.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
