<template>
  <div class="order-confirm">
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">注文内容確認</h1>
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
                    {{ currentCartItem.calcSubTotalPrice }}円
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!noItem" class="row cart-total-price">
          <div>消費税：{{ taxPrice.toLocaleString() }}円</div>
          <div>ご注文金額合計：{{ totalPrice.toLocaleString() }}円 (税込)</div>
        </div>
      </div>
      <!-- end container -->
    </div>
    <!-- end top-wrapper -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class OrderConfirm extends Vue {}
</script>

<style scoped>
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
</style>
