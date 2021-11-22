
import { OrderItem } from "@/types/orderItem";
import { User } from "@/types/user";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    user: new User(0, "", "", "", "", "", ""),
    itemsInCart: Array<OrderItem>(),
  },
  mutations: {
    setLoginUser(state, payload) {
      state.user = new User(
        payload.id,
        payload.name,
        payload.email,
        payload.password,
        payload.zipcode,
        payload.address,
        payload.telephone
      );
    },
  },
  actions: {},
  modules: {},
  getters: {
    getIemsInCart(state) {
      return state.itemsInCart;
    },
  },
});
