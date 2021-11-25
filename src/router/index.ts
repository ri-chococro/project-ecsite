import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // パスが登録されていない場合は商品一覧画面
  {
    path: "*",
    component: () => import("../views/ItemList.vue"),
  },
  {
    path: "/itemList",
    component: () => import("../views/ItemList.vue"),
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
    path: "/itemDetail/:id",
    component: () => import("../views/ItemDetail.vue"),
  },
  {
    path: "/orderFinished",
    component: () => import("../views/OrderFinished.vue"),
  },
  {
    path: "/myPage",
    component: () => import("../views/MyPage.vue"),
  },
  {
    path: "/orderConfirm",
    component: () => import("../views/OrderConfirm.vue"),
  },
  {
    path: "/cartList",
    component: () => import("../views/CartList.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
