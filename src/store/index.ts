import { OrderItem } from "@/types/orderItem";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    items: new Array<OrderItem>(),
  },
  mutations: {},
  getters: {
    getItemsInCart(state) {
      return state.items;
    },
  },
  actions: {},
  modules: {},
});
