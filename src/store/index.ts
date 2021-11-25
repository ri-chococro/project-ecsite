import Vue from "vue";
import Vuex from "vuex";
import { Item } from "../types/item";
import axios from "axios";
import { User } from "@/types/user";
import { OrderItem } from "@/types/orderItem";
import { Topping } from "@/types/topping";

// 使うためには「npm install vuex-persistedstate」を行う
import createPersistedState from "vuex-persistedstate";
import { OrderTopping } from "@/types/orderTopping";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    //商品数
    totalItemCount: 0,
    //商品情報
    items: new Array<Item>(),
    user: new User(0, "", "", "", "", "", ""),

    // カート内商品一覧
    itemsInCart: new Array<OrderItem>(),
    // ログインされているかどうかのフラグ(ログイン時:true/ログアウト時:false)
    isLogin: false,
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
    /**
     * ログインユーザ情報をstateに格納.
     * @param state - ステート
     * @param payload - ユーザ情報
     */
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
    /**

     * ログインする.
     * @param state - ステート
     */
    logined(state) {
      state.isLogin = true;
    },
    /**
     * ログアウトする.
     * @param state - ステート
     */
    logouted(state) {
      state.isLogin = false;
    },
    /**
     * カート内から商品を1件削除する.
     * @param state - state(itemsInCart)を利用するための引数
     * @param payload - 削除したい商品のインデックス番号
     */
    deleteItemInCart(state, payload) {
      state.itemsInCart.splice(payload, 1);
    },
    /**
     * 取得したショッピングカート情報をステートオブジェクトに追加する.
     * @param state  - ステートオブジェクト
     * @param payload  - ショッピングカートに追加した商品情報
     */
    addItemInCart(state, payload) {
      state.itemsInCart.push(payload);
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
    /**

     * カート内商品一覧取得して返す.
     * @param state - state(itemsInCart)を利用するための引数
     * @returns カート内商品一覧
     */
    getItemsInCart(state) {
      return state.itemsInCart;
      // const returnItemsInCart = new Array<OrderItem>();
      // //
      // for (const itemInCart of state.itemsInCart) {
      //   // itemの中のトッピングリスト
      //   const itemInCartToppingList = new Array<Topping>();
      //   for (const cartToppingList of itemInCart.item.toppingList) {
      //     itemInCartToppingList.push(
      //       new Topping(
      //         cartToppingList.id,
      //         cartToppingList.type,
      //         cartToppingList.name,
      //         cartToppingList.priceM,
      //         cartToppingList.priceL
      //       )
      //     );
      //   }
      //   // OrderToppingList
      //   const itemInCartOrdertoppingList = new Array<OrderTopping>();
      //   for (const cartOrderToppingList of itemInCart.orderToppingList) {
      //     itemInCartOrdertoppingList.push(
      //       new OrderTopping(
      //         cartOrderToppingList.id,
      //         cartOrderToppingList.toppingId,
      //         cartOrderToppingList.orderItemId,
      //         new Topping(
      //           cartOrderToppingList.Topping.id,
      //           cartOrderToppingList.Topping.type,
      //           cartOrderToppingList.Topping.name,
      //           cartOrderToppingList.Topping.priceM,
      //           cartOrderToppingList.Topping.priceL
      //         )
      //       )
      //     );
      //   }
      //   //
      //   returnItemsInCart.push(
      //     new OrderItem(
      //       itemInCart.id,
      //       itemInCart.itemId,
      //       itemInCart.orderId,
      //       itemInCart.quantity,
      //       itemInCart.size,
      //       new Item(
      //         itemInCart.item.id,
      //         itemInCart.item.type,
      //         itemInCart.item.name,
      //         itemInCart.item.description,
      //         itemInCart.item.priceM,
      //         itemInCart.item.priceL,
      //         itemInCart.item.imagePath,
      //         itemInCart.item.deleted,
      //         itemInCartToppingList
      //       ),
      //       itemInCartOrdertoppingList
      //     )
      //   );
      // }
      // return returnItemsInCart;
    },
    /**
     * ログイン状態を返す.
     * @param state - ステート
     * @returns true:ログイン済/false:ログアウト済
     */
    getLoginStatus(state) {
      return state.isLogin;
    },

    /** 商品Idを取得して返す.
     * @param state - ステート
     * @returns - 商品ID
     */
    getItemById(state) {
      return (itemId: number) => {
        const items = state.items.filter((item) => item.id === itemId);
        return items[0];
      };
    },
  },
  modules: {},
  //ログイン状態フラグを保持するプラグイン
  plugins: [
    createPersistedState({
      // ストレージのキーを指定
      key: "vuex",
      // isLoginフラグのみセッションストレージに格納しブラウザ更新しても残るようにしている(ログイン時:true / ログアウト時:false)
      paths: ["isLogin"],
      // ストレージの種類
      storage: window.sessionStorage,
    }),
  ],
});
