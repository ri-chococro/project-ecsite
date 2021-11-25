<template>
  <div class="container">
    <form>
      <h2 class="page-title">クレジットカード情報</h2>
      <span class="error">{{ creditCardError }}</span>
      <span class="error">{{ cardNumberError }}</span>
      <div class="input-field col s6">
        <input
          id="credit-number"
          type="text"
          class="validate"
          maxlength="16"
          v-model="cardNumber"
          required
        />
        <label for="credit-number">クレジットカード番号</label>
      </div>
      <div class="date-of-expiry">
        有効期限：<select
          name="card_exp_month"
          class="browser-default"
          v-model.number="cardExpMonth"
        >
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        月
        <select
          name="card_exp_year"
          id=""
          class="browser-default"
          v-model.number="cardExpYear"
        >
          <option value="2021" selected>2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
          <option value="2031">2031</option>
          <option value="2032">2032</option>
          <option value="2033">2033</option>
          <option value="2034">2034</option>
          <option value="2035">2035</option>
          <option value="2036">2036</option>
          <option value="2037">2037</option>
          <option value="2038">2038</option>
          <option value="2039">2039</option>
          <option value="2040">2040</option>
          <option value="2041">2041</option>
        </select>
        年
      </div>
      <span class="error"> {{ cardNameError }}</span>
      <div class="input-field col s6">
        <input
          id="credit-name"
          type="text"
          class="validate"
          maxlength="50"
          v-model="cardName"
          required
        />
        <label for="credit-name">カード名義人</label>
      </div>
      <span class="error"> {{ cvvError }}</span>

      <div class="input-field col s6">
        <input
          id="credit-cord"
          type="text"
          class="validate"
          maxlength="4"
          v-model.number="cvv"
          required
        />
        <label for="credit-cord">セキュリティコード</label>
        <button type="button" v-on:click="onclick">ぼたん</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CreditCardComponent extends Vue {
  // クレジットカード番号
  private cardNumber = "";
  // 有効期限（月）
  private cardExpMonth = "";
  // 有効期限（年）
  private cardExpYear = "";
  //カード名義人
  private cardName = "";
  // セキュリティコード
  private cvv = "";
  // クレジットカード番号のエラー
  private cardNumberError = "";
  // 名義人のエラー
  private cardNameError = "";
  // セキュリティコードのエラー
  private cvvError = "";
  // カード
  private creditCardError = "";
  
  async onclick(): Promise<void> {
    let hasError = false;
    this.cardNumberError = "";
    this.cardNameError = "";
    this.cvvError = "";

    let cardNumberPattern = /^[0-9]{14,16}$/;
    if (this.cardNumber === "") {
      this.cardNumberError = "クレジットカード番号を入力してください";
      hasError = true;
    }
    // クレジットカード番号を半角数字で14〜16桁にする
    else if (cardNumberPattern.test(this.cardNumber) === false) {
      this.cardNumberError =
        "クレジットカード番号は半角数字で14桁~16桁で入力してください";
      hasError = true;
    }

    let cardNamePattern = /[A-Z]{1,50}$/;
    if (this.cardName === "") {
      this.cardNameError = "カード名義人を入力してください";
      hasError = true;
    }
    // 名義人を半角英字で50桁以内にする
    else if (cardNamePattern.test(this.cardName) === false) {
      this.cardNameError = "名義人は半角英字で50桁以内で入力してください";
      hasError = true;
    }
    let cvvPattern = /^[0-9]{3,4}$/;
    if (this.cvv === "") {
      this.cvvError = "セキュリティコードを入力してください";
      hasError = true;
    }
    // セキュリティコードを半角数字で3桁または4桁にする
    else if (cvvPattern.test(this.cvv) === false) {
      this.cvvError =
        "セキュリティコードは半角数字で3桁〜4桁以内で入力してください";
      hasError = true;
    }
    if (hasError === true) {
      return;
    }

    const userId = this["$store"].getters.getUserId;
    const response = await axios.post(
      "http://153.127.48.168:8080/sample-credit-card-web-api/credit-card/payment",
      {
        user_id: userId,
        amount: 1,
        card_number:this.cardNumber,
        card_exp_month:this.cardExpMonth,
        card_exp_year:this.cardExpYear,
        card_name: this.cardName,
        card_cvv: this.cvv,
      }
    );
    console.log(response);
    if (response.data.status === "error") {
      this.creditCardError = "クレジットカード情報が不正です";
      return;
    }
    this["$router"].push("/orderFinished");
  }
}
</script>

<style scoped>
.date-of-expiry {
  display: flex;
}
.browser-default {
  width: auto;
  height: auto;
}
.container {
  width: 500px;
  text-align: center;
}
.error {
  text-align: left;
}
</style>
