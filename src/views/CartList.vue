<template>
  <div class="cart-list">
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">ショッピングカート</h1>
        <div v-if="noItem" class="error-message">カートに商品がありません</div>
        <!-- table -->
        <div v-if="!noItem" class="row">
          <table class="striped">
            <thead>
              <tr>
                <th class="cart-table-th">商品名</th>
                <th>サイズ、価格(税抜)、数量</th>
                <th>トッピング、価格(税抜)</th>
                <th>小計</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(currentCartItem, i) of currentCartItems"
                v-bind:key="currentCartItem.id"
              >
                <td class="cart-item-name">
                  <div class="cart-item-icon">
                    <img v-bind:src="currentCartItem.item.imagePath" />
                  </div>
                  <span>{{ currentCartItem.item.name }}</span>
                </td>
                <td>
                  <span class="price">&nbsp;{{ currentCartItem.size }}</span
                  >&nbsp;&nbsp;{{
                    currentCartItem.itemPrice.toLocaleString()
                  }}円 &nbsp;&nbsp;{{ currentCartItem.quantity }}個
                </td>
                <td>
                  <ul
                    v-for="topping of currentCartItem.orderToppingList"
                    v-bind:key="topping.id"
                  >
                    <li>
                      {{ topping.topping.name
                      }}{{ currentCartItem.toppingPrice.toLocaleString() }}円
                    </li>
                  </ul>
                </td>
                <td>
                  <div class="text-center">
                    {{ currentCartItem.calcSubTotalPrice.toLocaleString() }}円
                  </div>
                </td>
                <td>
                  <button
                    class="btn"
                    type="button"
                    v-on:click="onDeleteClick(i)"
                  >
                    <span>削除</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!noItem" class="row cart-total-price">
          <div>消費税：{{ taxPrice.toLocaleString() }}円</div>
          <div>ご注文金額合計：{{ totalPrice.toLocaleString() }}円 (税込)</div>
        </div>
        <div v-if="!noItem" class="row order-confirm-btn">
          <button class="btn" type="button" v-on:click="onGoOrder">
            <span>注文に進む</span>
          </button>
        </div>
      </div>
      <!-- end container -->
    </div>
    <!-- end top-wrapper -->
  </div>
</template>

<script lang="ts">
import { OrderItem } from "@/types/orderItem";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CartList extends Vue {
  // カート内の商品
  private currentCartItems: Array<OrderItem> = [];
  // 商品小計（税抜）
  private totalPrice = 0;
  // 消費税
  private taxPrice = 0;
  // カート内商品有無のフラグ
  private noItem = false;

  /**
   * Vuexストア内ゲッター経由でstateからカート内商品を取得し、初期画面表示を行う.
   *
   * @remarks
   * Vueインスタンスが生成されたタイミングでVuexストア内のゲッターを呼ぶ。
   * カート内商品がない場合、エラーメッセージを表示。
   * 商品小計、消費税を計算して変数に格納する。
   *
   */
  created(): void {
    console.log("createdが呼ばれた");
    // Vuexストアのゲッター経由でカート内の商品を取得
    this.currentCartItems = this.$store.getters.getItemsInCart;
    console.log(this.currentCartItems);
    // カート内に商品ない場合フラグを立てる
    if (this.currentCartItems.length === 0) {
      this.noItem = true;
    }
    // OrderItemクラス内のメソッドを利用し、商品小計を取得
    for (let currentCartItem of this.currentCartItems) {
      this.totalPrice += currentCartItem.calcSubTotalPrice;
    }
    // 消費税の計算
    const tax = 0.1;
    this.taxPrice = Math.floor(this.totalPrice * tax);
    this.totalPrice += this.taxPrice;
  }

  /**
   * 削除ボタンが押された際にVuexストア内のミューテーションを呼ぶ.
   *
   * @param index - 削除したい商品のインデックス番号
   */
  onDeleteClick(index: number): void {
    this.$store.commit("deleteItemInCart", index);
    this.totalPrice = 0;
    // Vuexストアのゲッター経由でカート内の商品を取得
    this.currentCartItems = this.$store.getters.getItemsInCart;
    // カート内に商品ない場合フラグを立てる
    if (this.currentCartItems.length === 0) {
      this.noItem = true;
    }
    // OrderItemクラス内のメソッドを利用し、商品小計を取得
    for (let currentCartItem of this.currentCartItems) {
      this.totalPrice += currentCartItem.calcSubTotalPrice;
    }
    // 消費税の計算
    const tax = 0.1;
    this.taxPrice = Math.floor(this.totalPrice * tax);
    this.totalPrice += this.taxPrice;
  }

  /**
   * 注文に進むボタンが押された際の処理.
   */
  onGoOrder(): void {
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
    } else {
      this.$router.push("/orderConfirm");
    }
  }
}
</script>

<style scoped>
.cart-table-th {
  text-align: center;
}
.cart-item-icon img {
  margin: auto;
  display: block;
  border-radius: 20px;
  width: 100px;
  height: 100px;
  padding: 0 0 15px 0;
}
.cart-item-name {
  text-align: center;
  font-size: 15px;
}

.cart-total-price {
  font-size: 35px;
  text-align: center;
}

.order-confirm-btn {
  text-align: center;
}
.error-message {
  color: red;
}
</style>
