<template>
  <div class="cart-list">
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">ショッピングカート</h1>
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
                  >&nbsp;&nbsp;{{ currentCartItem.itemPrice }}円 &nbsp;&nbsp;{{
                    currentCartItem.quantity
                  }}個
                </td>
                <td>
                  <ul
                    v-for="topping of currentCartItem.orderToppingList"
                    v-bind:key="topping.id"
                  >
                    <li>
                      {{ topping.Topping.name
                      }}{{ currentCartItem.toppingPrice }}円
                    </li>
                  </ul>
                </td>
                <td>
                  <div class="text-center">
                    {{ currentCartItem.calcSubTotalPrice.toLocaleString() }}円
                  </div>
                </td>
                <td>
                  <button class="btn" type="button">
                    <span>削除</span>
                  </button>
                </td>
              </tr>

              <!-- <tr>
                <td class="cart-item-name">
                  <div class="cart-item-icon">
                    <img src="img/1.jpg" />
                  </div>
                  <span>ハワイアンパラダイス</span>
                </td>
                <td>
                  <span class="price">&nbsp;Ｌ</span>&nbsp;&nbsp;2,380円
                  &nbsp;&nbsp;1個
                </td>
                <td>
                  <ul>
                    <li>ピーマン300円</li>
                    <li>オニオン300円</li>
                    <li>あらびきソーセージ300円</li>
                  </ul>
                </td>
                <td><div class="text-center">3,280円</div></td>
                <td>
                  <button class="btn" type="button">
                    <span>削除</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="cart-item-name">
                  <div class="cart-item-icon">
                    <img src="img/1.jpg" />
                  </div>
                  <span>ハワイアンパラダイス</span>
                </td>
                <td>
                  <span class="price">&nbsp;Ｌ</span>&nbsp;&nbsp;2,380円
                  &nbsp;&nbsp;1個
                </td>
                <td>
                  <ul>
                    <li>ピーマン300円</li>
                    <li>オニオン300円</li>
                    <li>あらびきソーセージ300円</li>
                  </ul>
                </td>
                <td><div class="text-center">3,280円</div></td>
                <td>
                  <button class="btn" type="button">
                    <span>削除</span>
                  </button>
                </td>
              </tr> -->
            </tbody>
          </table>
        </div>

        <div class="row cart-total-price">
          <div>消費税：8,000円</div>
          <div>ご注文金額合計：38,000円 (税込)</div>
        </div>
        <div class="row order-confirm-btn">
          <button
            class="btn"
            type="button"
            onclick="location.href='order_confirm.html'"
          >
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
  private currentCartItems: Array<OrderItem> = [];
  private totalPrice = 0;
  private taxPrice = 0;
  private noItem = true;

  created(): void {
    this.currentCartItems = this.$store.getters.getItemsInCart();
    if (this.currentCartItems.length === 0) {
      this.noItem = false;
    }
    for (let currentCartItem of this.currentCartItems) {
      this.totalPrice += currentCartItem.calcSubTotalPrice;
    }
    const tax = 0.1;
    this.taxPrice = Math.floor(this.totalPrice * tax);
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
</style>
