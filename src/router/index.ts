import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  //パスが登録されていない場合はログイン画面へ
  // {
  //   path: "*",
  //   component: () => import("../views/Login.vue"),
  // },
  {
    path: "/orderFinished",
    component: () => import("../views/OrderFinished.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
