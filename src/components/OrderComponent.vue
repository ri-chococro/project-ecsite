<template>
  <div>
    <h2 class="page-title">お届け先情報</h2>
    <div class="order-confirm-delivery-info">
      <div class="row">
        <div class="input-field">
          <input id="name" type="text" v-model="distinationName" />
          <label for="name">お名前</label>
          <div class="error">{{ nameErrorMessage }}</div>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="email" type="email" v-model="distinationEmail" />
          <label for="email">メールアドレス</label>
          <div class="error">{{ emailErrorMessage }}</div>
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
          <button class="btn" type="button" v-on:click="searchAddress">
            <span>住所検索</span>
          </button>
          <div class="error">{{ zipcodeErrorMessage }}</div>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="address" type="text" v-model="distinationAddress" />
          <label for="address" :class="{ active: distinationAddress }"
            >住所</label
          >
          <div class="error">{{ addressErrorMessage }}</div>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input id="tel" type="tel" v-model="distinationTel" />
          <label for="tel">電話番号</label>
          <div class="error">{{ telErrorMessage }}</div>
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
            value="10"
            v-model.number="deliveryTime"
          />
          <span>10時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="11"
            v-model.number="deliveryTime"
          />
          <span>11時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="12"
            v-model.number="deliveryTime"
          />
          <span>12時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="13"
            v-model.number="deliveryTime"
          />
          <span>13時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="14"
            v-model.number="deliveryTime"
          />
          <span>14時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="15"
            v-model.number="deliveryTime"
          />
          <span>15時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="16"
            v-model.number="deliveryTime"
          />
          <span>16時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="17"
            v-model.number="deliveryTime"
          />
          <span>17時</span>
        </label>
        <label class="order-confirm-delivery-time">
          <input
            name="deliveryTime"
            type="radio"
            value="18"
            v-model.number="deliveryTime"
          />
          <span>18時</span>
        </label>
      </div>
      <div class="error">{{ deliveryDateErrorMessage }}</div>
    </div>

    <h2 class="page-title">お支払い方法</h2>
    <div class="row order-confirm-payment-method">
      <span>
        <label class="order-confirm-payment-method-radio">
          <input
            name="paymentMethod"
            type="radio"
            :value="1"
            v-model.number="paymentMethod"
          />
          <span>代金引換</span>
        </label>
        <label class="order-confirm-payment-method-radio">
          <input
            name="paymentMethod"
            type="radio"
            :value="2"
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
import { Prop, Component, Vue } from "vue-property-decorator";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axiosJsonpAdapter = require("axios-jsonp");
import { addHours, format } from "date-fns";
import { OrderItem } from "@/types/orderItem";
import { User } from "@/types/user";

@Component
export default class OrderComponent extends Vue {
  @Prop()
  totalPrice!: number;
  @Prop()
  orderItems!: OrderItem[];

  // ログインユーザー
  private loginUser!: User;
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
  // 配達日時
  private deliveryDate = "";
  // 配達時間
  private deliveryTime = "";
  // 支払い方法
  private paymentMethod = 1;
  // 商品リスト
  private orderItemList = [];
  // 名前のエラーメッセージ
  private nameErrorMessage = "";
  // メールアドレスのエラーメッセージ
  private emailErrorMessage = "";
  // 郵便番号のエラーメッセージ
  private zipcodeErrorMessage = "";
  // 住所のエラーメッセージ
  private addressErrorMessage = "";
  // 電話番号のエラーメッセージ
  private telErrorMessage = "";
  // 配達日時のエラーメッセージ
  private deliveryDateErrorMessage = "";
  /**
   * ログインユーザーを取得.
   */
  created(): void {
    this.loginUser = this.$store.getters.getLoginUser;
  }
  /**
   * 注文する.
   */
  async onDoOrder(): Promise<void> {
    // エラーがあれば注文に進まない
    if (this.hasInputErrors()) {
      return;
    }

    // 代金引換の場合:1 / クレジットカード決済の場合:2
    let status;
    if (this.paymentMethod === 1) {
      status = 1;
    } else if (this.paymentMethod === 2) {
      status = 2;
    }

    let deliveryDate = new Date(this.deliveryDate);
    // deliveryDateと時間から、配達日時を求める
    const deliveryDateTime = new Date(
      deliveryDate.getFullYear(),
      deliveryDate.getMonth(),
      deliveryDate.getDate(),
      Number(this.deliveryTime)
    );

    // 配達日時が現在時刻の3時間後より前の場合はエラー
    let now = new Date();
    if (deliveryDateTime < addHours(now, 3)) {
      this.deliveryDateErrorMessage = "今から3時間後以降の日時をご入力ください";
      return;
    }
    // 配達日時をフォーマット
    const formattedDeliveryTime = format(
      deliveryDateTime,
      "yyyy/MM/dd HH:mm:ss"
    );

    // WEB APIに渡す注文商品のリストを作成
    let orderItemFormList = [];
    for (let orderItem of this.orderItems) {
      // 注文商品のリストに渡すトッピングのリストを作成
      let orderToppingFormList = [];
      for (let topping of orderItem.orderToppingList) {
        orderToppingFormList.push({ toppingId: topping.toppingId });
      }
      orderItemFormList.push({
        itemId: orderItem.itemId,
        quantity: orderItem.quantity,
        size: orderItem.size,
        orderToppingFormList,
      });
    }

    const URL = "http://153.127.48.168:8080/ecsite-api/order";

    const response = await axios.post(URL, {
      userId: this.loginUser.id,
      status,
      totalPrice: this.totalPrice,
      destinationName: this.distinationName,
      destinationEmail: this.distinationEmail,
      destinationZipcode: this.distinationZipcode,
      destinationAddress: this.distinationAddress,
      destinationTel: this.distinationTel,
      deliveryTime: formattedDeliveryTime,
      paymentMethod: this.paymentMethod,
      orderItemFormList,
    });

    console.dir("response:" + JSON.stringify(response));

    this.$router.push("/orderFinished");
  }

  /**
   * 入力値をチェックする.
   *
   * @returns true:エラーあり, false:エラーなし
   */
  hasInputErrors(): boolean {
    this.nameErrorMessage = "";
    this.emailErrorMessage = "";
    this.zipcodeErrorMessage = "";
    this.addressErrorMessage = "";
    this.telErrorMessage = "";
    this.deliveryDateErrorMessage = "";

    let hasError = false;

    if (this.distinationName === "") {
      this.nameErrorMessage = "名前を入力してください";
      hasError = true;
    }
    let emailPattern = /[A-Za-z0-9_.-]{1,}@{1}[A-Za-z0-9_.-]{1,}$/;
    if (this.distinationEmail === "") {
      this.emailErrorMessage = "メールアドレスを入力して下さい";
      hasError = true;
    } else if (emailPattern.test(this.distinationEmail) === false) {
      this.emailErrorMessage = "メールアドレスの形式が不正です";
      hasError = true;
    }
    if (this.distinationZipcode === "") {
      this.zipcodeErrorMessage = "郵便番号を入力して下さい";
      hasError = true;
    }
    if (this.distinationAddress === "") {
      this.addressErrorMessage = "住所を入力して下さい";
      hasError = true;
    }
    let telephonePattern = /^[0-9]{1,5}-[0-9]{1,4}-[0-9]{4}$/;
    if (this.distinationTel === "") {
      this.telErrorMessage = "電話番号を入力して下さい";
      hasError = true;
    } else if (telephonePattern.test(this.distinationTel) === false) {
      this.telErrorMessage = "電話番号はXXXX-XXXX-XXXXの形式で入力してください";
      hasError = true;
    }
    if (this.deliveryDate === "" || this.deliveryTime === "") {
      this.deliveryDateErrorMessage = "配達日時を入力して下さい";
      hasError = true;
    }

    return hasError;
  }

  /**
   * 郵便番号から住所を取得する.
   */
  async searchAddress(): Promise<void> {
    try {
      const url = "https://zipcoda.net/api";
      const response = await axios.get(url, {
        adapter: axiosJsonpAdapter,
        params: {
          zipcode: this.distinationZipcode,
        },
      });
      console.dir("response:" + JSON.stringify(response.data.items[0].address));
      this.distinationAddress = response.data.items[0].address;
    } catch (error) {
      console.log(error);
      this.zipcodeErrorMessage = "存在しない郵便番号です";
    }
  }
}
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
