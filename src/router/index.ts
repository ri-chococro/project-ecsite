import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // パスが登録されていない場合は商品一覧画面
  {
    path: "*",
    component: () => import("../views/itemList.vue"),
  },
  {
    path: "/itemList",
    component: () => import("../views/itemList.vue"),
  },
  {
    path: "/registerUser",
    component: () => import("../views/RegisterUser.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/logout",
    component: () => import("../views/Logout.vue"),
  },
  {
    path: "/orderFinished",
    component: () => import("../views/OrderFinished.vue"),
  },
  {
    path: "/orderConfirm",
    component: () => import("../views/OrderConfirm.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
