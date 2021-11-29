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
    // ログインユーザ情報
    user: new User(0, "", "", "", "", "", ""),
    // カート内商品一覧
    itemsInCart: new Array<OrderItem>(),
    // ログインされているかどうかのフラグ(ログイン時:true/ログアウト時:false)
    isLogin: false,
    // カートリストからログイン画面に遷移された時に立てるフラグ
    fromCartList: false,
  },
  mutations: {
    /**
     *商品一覧を取得してstateに格納する.
     * @param state  - ステート
     * @param payload - WebAPIから取得した商品情報
     */
    showItemList(state, payload) {
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
    /**
     * 並び替え種類によってstateのitem配列の中身を並び替える.
     * @param state - ステート
     * @param payload - 並び替えの種類
     */
    sortOrderByPrice(state, payload) {
      if (payload === "高い順") {
        state.items.sort(function (a, b) {
          return a.priceM < b.priceM ? 1 : -1;
        });
      } else if (payload === "安い順") {
        state.items.sort(function (a, b) {
          return a.priceM < b.priceM ? -1 : 1;
        });
      } else if (payload === "おすすめ順") {
        state.items.sort(function (a, b) {
          return a.id < b.id ? -1 : 1;
        });
      }
    },
    /** カートリストからログイン画面に遷移された時にフラグを立てる.
     * @param state - ステート
     */
    fromCartListFlagOn(state) {
      state.fromCartList = true;
    },
    /**
     * カートリストからログイン後フラグをおろす.
     * @param state - ステート
     */
    fromCartListFlagOff(state) {
      state.fromCartList = false;
    },
    /**
     * カートの中身をリセットする.
     *
     * @param state - ステート
     */
    resetCart(state) {
      state.itemsInCart = new Array<OrderItem>();
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
        return state.items.filter((item) =>
          item.name.toUpperCase().includes(name.toUpperCase())
        );
      };
    },

    /**
     * カート内商品一覧取得して返す.
     * @remarks
     * リロード時のJavaScriptコンパイル時にクラス内のgetter/setterが読み込めなくなるため、
     * クラス内のフィールド変数を直接読み込み、インスタンス化したカートリストを新しい配列に格納し返す
     *
     * @param state - state(itemsInCart)を利用するための引数
     * @returns カート内商品一覧
     */
    getItemsInCart(state) {
      // 呼び出し元に返すための新しい配列（OrderItem型）
      const returnItemsInCart: Array<OrderItem> = [];
      // stateのカートリストをfor文でまわし、インスタンス化する
      for (const itemInCart of state.itemsInCart) {
        // OrderItemの中のitemの中のtoppingListを新しい配列に格納する
        const itemInCartToppingList: Array<Topping> = [];
        for (const cartToppingList of itemInCart._item._toppingList) {
          itemInCartToppingList.push(
            new Topping(
              cartToppingList.id,
              cartToppingList.type,
              cartToppingList.name,
              cartToppingList.priceM,
              cartToppingList.priceL
            )
          );
        }

        // OrderItemの中のorderToppingListを新しい配列に格納する
        const itemInCartOrdertoppingList = new Array<OrderTopping>();
        // orderTopingListの中のtoppingを変数に代入する
        for (const cartOrderToppingList of itemInCart._orderToppingList) {
          let topping = new Topping(-1, "0", "トッピングなし", 0, 0);
          // トッピングなしの場合
          if (cartOrderToppingList._topping._id === -1) {
            topping = new Topping(-1, "0", "トッピングなし", 0, 0);
            //トッピングありの場合
          } else {
            topping = new Topping(
              cartOrderToppingList._topping.id,
              cartOrderToppingList._topping.type,
              cartOrderToppingList._topping.name,
              cartOrderToppingList._topping.priceM,
              cartOrderToppingList._topping.priceL
            );
          }

          // let topping = new Topping(-1, "0", "トッピングなし", 0, 0);
          // if (cartOrderToppingList._topping) {
          //   topping = new Topping(
          //     cartOrderToppingList._topping._id,
          //     cartOrderToppingList._topping._type,
          //     cartOrderToppingList._topping._name,
          //     cartOrderToppingList._topping._priceM,
          //     cartOrderToppingList._topping._priceL
          //   );
          // }

          // もしcartOrderToppingList._toppingが存在しなければ
          // →OrderToppingのToppingにnew Topping(-1, "0", "トッピングなし", 0, 0)をいれる
          // もしcartOrderToppingList._toppingが存在していれば
          // →OrderToppingのToppingに以下を入れる
          //           new Topping(
          //   cartOrderToppingList._topping.id,
          //   cartOrderToppingList._topping.type,
          //   cartOrderToppingList._topping.name,
          //   cartOrderToppingList._topping.priceM,
          //   cartOrderToppingList._topping.priceL
          // )

          itemInCartOrdertoppingList.push(
            new OrderTopping(
              cartOrderToppingList._id,
              cartOrderToppingList._toppingId,
              cartOrderToppingList._orderItemId,
              topping
            )
          );
        }

        // カート商品一覧を格納して返す
        returnItemsInCart.push(
          new OrderItem(
            itemInCart._id,
            itemInCart._itemId,
            itemInCart._orderId,
            itemInCart._quantity,
            itemInCart._size,
            new Item(
              itemInCart._item._id,
              itemInCart._item._type,
              itemInCart._item._name,
              itemInCart._item._description,
              itemInCart._item._priceM,
              itemInCart._item._priceL,
              itemInCart._item._imagePath,
              itemInCart._item._deleted,
              itemInCartToppingList
            ),
            itemInCartOrdertoppingList
          )
        );
      }
      return returnItemsInCart;
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
    /**

     * カートリスト遷移フラグを返す.
     * @param state - ステート
     * @returns カートリスト遷移フラグ
     */
    getFromCartListFlag(state) {
      return state.fromCartList;
    },
    /**
     * ログインしているユーザーの情報を返す.
     *
     * @param state -ステート
     * @returns - ログインユーザー情報
     */
    getLoginUser(state) {
      return state.user;
    },
  },
  modules: {},
  //ログイン状態フラグを保持するプラグイン
  plugins: [
    createPersistedState({
      // ストレージのキーを指定
      key: "vuex",
      // isLoginフラグのみセッションストレージに格納しブラウザ更新しても残るようにしている(ログイン時:true / ログアウト時:false)
      paths: ["isLogin", "itemsInCart"],
      // ストレージの種類
      storage: window.sessionStorage,
    }),
  ],
});
