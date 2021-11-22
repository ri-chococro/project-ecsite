<template>
  <div class="container">
    <h2 class="page-title">お届け先情報</h2>
    <div class="order-confirm-delivery-info">
      <div class="row">
        <div class="input-field">
          <input id="name" type="text" v-model="distinationName" />
          <label for="name">お名前</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="email" type="email" v-model="distinationEmail" />
          <label for="email">メールアドレス</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input
            id="zipcode"
            type="text"
            maxlength="7"
            v-model="distinationZipcode"
          />
          <label for="zipcode">郵便番号(ハイフンなし)</label>
          <button class="btn" type="button">
            <span>住所検索</span>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="address" type="text" v-model="distinationAddress" />
          <label for="address">住所</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="tel" type="tel" v-model="distinationTel" />
          <label for="tel">電話番号</label>
        </div>
      </div>
      <div class="row order-confirm-delivery-datetime">
        <div class="input-field">
          <input id="deliveryDate" type="date" v-model="deliveryDate" />
          <label for="address">配達日時</label>
        </div>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="10時"
            checked="checked"
            v-model="deliveryTime"
          />
          <span>10時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="11時"
            v-model="deliveryTime"
          />
          <span>11時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="12時"
            v-model="deliveryTime"
          />
          <span>12時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="13時"
            v-model="deliveryTime"
          />
          <span>13時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="14時"
            v-model="deliveryTime"
          />
          <span>14時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="15時"
            v-model="deliveryTime"
          />
          <span>15時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="16時"
            v-model="deliveryTime"
          />
          <span>16時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="17時"
            v-model="deliveryTime"
          />
          <span>17時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="18時"
            v-model="deliveryTime"
          />
          <span>18時</span>
        </label>
      </div>
    </div>

    <h2 class="page-title">お支払い方法</h2>
    <div class="row order-confirm-payment-method">
      <span>
        <label class="order-confirm-payment-method-radio">
          <input
            name="paymentMethod"
            type="radio"
            value="1"
            v-model.number="paymentMethod"
          />
          <span>代金引換</span>
        </label>
        <label class="order-confirm-payment-method-radio">
          <input
            name="paymentMethod"
            type="radio"
            value="2"
            v-model.number="paymentMethod"
          />
          <span>クレジットカード</span>
        </label>
      </span>
    </div>
    <div class="row order-confirm-btn">
      <button class="btn" type="button" v-on:click="onDoOrder">
        <span>この内容で注文する</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ShippingInformation extends Vue {
  // 名前
  private distinationName = "";
  // メールアドレス
  private distinationEmail = "";
  // 郵便番号
  private distinationZipcode = "";
  // 住所
  private distinationAddress = "";
  // 電話番号
  private distinationTel = "";
  // 配達日時 文字列で入ってくるtype="date"インプット
  private deliveryDate = ""; // 2021-11-16
  // 配達時間
  private deliveryTime = "";
  // 支払い方法
  private paymentMethod = "";
  // 商品リスト
  private orderItemList = [];
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

.order-confirm-btn {
  text-align: center;
}
</style>
