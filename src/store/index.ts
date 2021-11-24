import Vue from "vue";
import Vuex from "vuex";
import { Item } from "../types/item";
import axios from "axios";
import { User } from "@/types/user";
import { OrderItem } from "@/types/orderItem";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    //商品数
    totalItemCount: 0,
    //商品情報
    items: new Array<Item>(),
    user: new User(0, "", "", "", "", "", ""),
    itemsInCart: new Array<OrderItem>(),
  },
  mutations: {
    /**
     *商品一覧を取得してstateに格納する.
     * @param state  - ステート
     * @param payload - WebAPIから取得した商品情報
     */
    showItemList(state, payload) {
      console.log("totalItemCount:" + payload.totalItemCount);
      // payloadの中(WebAPIから取得したJSON)のitemsをstateのitemsに代入する
      state.totalItemCount = payload.totalItemCount;
      //Itmeオブジェクトに変換する
      state.items = new Array<Item>();
      for (const item of payload.items) {
        state.items.push(
          new Item(
            item.id,
            item.type,
            item.name,
            item.discription,
            item.priceM,
            item.priceL,
            item.imagePath,
            item.deleted,
            item.toppingList
          )
        );
      }
      //価格の安い順に並び替える
      state.items.sort(function (a, b) {
        return a._priceM < b._priceM ? -1 : 1;
      });
    },
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
    deleteItemInCart(state, payload) {
      state.itemsInCart.splice(payload, 1);
    },
  },
  actions: {
    /**
     *外部APIから商品情報を取得する.
     * @param context - コンテクスト
     */
    async getItemList(context) {
      const response = await axios.get(
        `http://153.127.48.168:8080/ecsite-api/item/items/aloha`
      );
      console.dir("response" + JSON.stringify(response));
      const payload = response.data;
      context.commit("showItemList", payload);
    },
  },
  getters: {
    /**
     *商品情報を取得して返す.
     * @param state - ステート
     * @returns - 商品情報
     */
    getAllItems(state) {
      return state.items;
    },
    /**
     *商品数を取得して返す.
     * @param state - ステート
     * @returns - 商品数
     */
    getItemCount(state) {
      return state.totalItemCount;
    },
    /**
     *商品を名前で部分一致検索する.
     * @param state - ステート
     * @returns - 商品情報
     */
    getSearchByName(state) {
      return (name: string) => {
        return state.items.filter((item) => item.name.includes(name));
      };
    },
    getItemsInCart(state) {
      return state.itemsInCart;
    },
  },
  modules: {},
});
