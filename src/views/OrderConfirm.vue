<template>
  <div class="order-confirm">
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">注文内容確認</h1>
        <!-- table -->
        <div class="row">
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
                v-for="currentCartItem of currentCartItems"
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
              </tr>
            </tbody>
          </table>
        </div>
        <div class="coupon-form">
          <label for="coupon">クーポンコード入力欄</label>
          <span
            ><input type="text" name="coupon" v-model="inputCouponCode" />
            <button type="button" v-on:click="couponDiscount(inputCouponCode)">
              適用
            </button>
            {{ couponError }}</span
          >
        </div>

        <div class="row cart-total-price">
          <div>消費税：{{ taxPrice.toLocaleString() }}円</div>
          <div v-if="hasCoupon">
            <div>
              {{ currentCoupon.couponType }}クーポン割引：-{{
                currentCoupon.discountPrice
              }}円
            </div>
            <button type="button" v-on:click="cancelCoupon()">
              クーポン取り消し
            </button>
          </div>
          <div>ご注文金額合計：{{ totalPrice.toLocaleString() }}円 (税込)</div>
        </div>

        <OrderComponent
          :total-price="this.totalPrice"
          :order-items="this.currentCartItems"
        ></OrderComponent>
      </div>
      <!-- end container -->
    </div>
    <!-- end top-wrapper -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { OrderItem } from "@/types/orderItem";
import { Coupon } from "@/types/coupon";
import OrderComponent from "../components/OrderComponent.vue";

@Component({
  components: {
    OrderComponent,
  },
})
export default class OrderConfirm extends Vue {
  // カート内の商品
  private currentCartItems: Array<OrderItem> = [];
  // 商品合計（税込）
  private totalPrice = 0;
  // 消費税
  private taxPrice = 0;
  // クーポンを格納する配列
  private coupons = [
    new Coupon("thankyou", 500, "感謝セール"),
    new Coupon("1225", 300, "クリスマス"),
    new Coupon("Aloha2021", 600, "ハワイキャンペーン"),
  ];
  // 入力されたクーポンコード
  private inputCouponCode = "";
  // 選択したクーポン
  private currentCoupon: Coupon = new Coupon("", 0, "");
  // クーポン有無フラグ
  private hasCoupon = false;
  // クーポンエラー
  private couponError = "";

  /**
   * Vuexストア内ゲッター経由でstateからカート内商品を取得.
   *
   * @remarks
   * Vueインスタンスが生成されたタイミングでVuexストア内のゲッターを呼ぶ。
   * 商品小計、消費税を計算して変数に格納する。
   */
  created(): void {
    // ログインしていなければログイン画面へ遷移
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
      return;
    }

    // Vuexストアのゲッター経由でカート内の商品を取得
    this.currentCartItems = this.$store.getters.getItemsInCart;
    console.log(this.currentCartItems);
    // OrderItemクラス内のメソッドを利用し、商品小計を取得
    for (let currentCartItem of this.currentCartItems) {
      this.totalPrice += currentCartItem.calcSubTotalPrice;
    }
    // 消費税の計算
    const tax = 0.1;
    this.taxPrice = Math.floor(this.totalPrice * tax);
    // 合計金額の計算
    this.totalPrice += this.taxPrice;
  }
  /**
   * クーポン適用ボタン押下時の処理.
   * @remarks
   * エラーチェックを行い、問題なければクーポンに応じた金額を合計金額から値引く
   *
   * @param code - 入力されたクーポンコード
   */
  couponDiscount(code: string): void {
    // 既にクーポンが使われている時にエラーを出す
    if (this.hasCoupon === true) {
      this.couponError = "既にクーポンが使われています";
      return;
    }

    // 入力されたクーポンコードと登録されたクーポンの突合
    for (let coupon of this.coupons) {
      // クーポンコードが入力されていないとき
      if (code === "") {
        this.hasCoupon = false;
        this.couponError = "クーポンコードを入力してください";
        // 登録されていないクーポンコードが入力されたとき
      } else if (coupon.code !== code) {
        this.hasCoupon = false;
        this.couponError = "クーポンコードが存在しません";
        // 正しいクーポンコードが入力されたとき
      } else if (coupon.code === code) {
        this.hasCoupon = true;
        this.couponError = "";
        this.currentCoupon = new Coupon(
          coupon.code,
          coupon.discountPrice,
          coupon.couponType
        );
        // 値引きを行う
        this.totalPrice -= this.currentCoupon.discountPrice;
        return;
      }
    }
  }
  /**
   * クーポン取り消しボタン押下時の処理.
   * @remarks
   * 値引き分の金額を戻す
   */
  cancelCoupon(): void {
    this.hasCoupon = false;
    this.couponError = "";
    this.inputCouponCode = "";
    this.totalPrice += this.currentCoupon.discountPrice;
    this.currentCoupon = new Coupon("", 0, "");
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

.order-confirm-delivery-info {
  margin: 0 200px 0 200px;
}

.order-confirm-delivery-datetime {
  text-align: center;
}

.order-confirm-delivery-time {
  margin-right: 10px;
}

.order-confirm-payment-method {
  text-align: center;
}

.order-confirm-payment-method-radio {
  margin-right: 10px;
}
.coupon-form {
  width: 300px;
}
</style>
