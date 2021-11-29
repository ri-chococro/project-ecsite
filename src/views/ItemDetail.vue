<template>
  <div class="container">
    <!-- ローディング中であればスケルトンローディングを表示 -->
    <div v-if="isLoading">
      <SkeletonLoader />
    </div>
    <div v-if="!isLoading" class="container">
      <h1 class="page-title">{{ currentItem.name }}</h1>
      <div class="row">
        <div class="row item-detail">
          <div class="item-icon">
            <img v-bind:src="currentItem.imagePath" />
          </div>
          <div class="item-intro">
            {{ currentItem.description }}
          </div>
        </div>
        <div class="row item-size">
          <div class="item-hedding">サイズ</div>
          <div>
            <label>
              <input
                id="size-m"
                name="size"
                type="radio"
                value="M"
                v-model="size"
                v-on:change="realTimeCalcPrice"
              />
              <span>
                &nbsp;<span class="price">Ｍ</span>&nbsp;&nbsp;{{
                  currentItem.priceM.toLocaleString()
                }}円(税抜)</span
              >
            </label>
            <label>
              <input
                id="size-l"
                name="size"
                type="radio"
                value="L"
                v-model="size"
                v-on:change="realTimeCalcPrice"
              />
              <span>
                &nbsp;<span class="price">Ｌ</span>&nbsp;&nbsp;{{
                  currentItem.priceL.toLocaleString()
                }}円(税抜)</span
              >
            </label>
          </div>
        </div>
        <div class="row item-toppings">
          <div class="item-hedding">
            トッピング： &nbsp;1つにつき<span>&nbsp;Ｍ&nbsp;</span>&nbsp;&nbsp;
            {{ toppingPriceM.toLocaleString() }}円(税抜)
            <span>&nbsp;Ｌ</span>&nbsp;&nbsp;
            {{ toppingPriceL.toLocaleString() }}円(税抜)
          </div>
          <span
            v-for="topping of currentItem.toppingList"
            v-bind:key="topping.id"
          >
            <label class="item-topping">
              <input
                type="checkbox"
                v-model="toppingIds"
                v-bind:value="topping.id"
                v-on:change="realTimeCalcPrice"
              />
              <span>{{ topping.name }}</span>
            </label>
          </span>
        </div>
        <div class="row item-quantity">
          <div class="item-hedding item-hedding-quantity">数量</div>
          <div class="item-quantity-selectbox">
            <div class="input-field col s12">
              <select
                class="browser-default"
                v-model="quantity"
                v-on:change="realTimeCalcPrice"
              >
                <option value="" disabled selected>選択して下さい</option>
                <option value="1">1</option>
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
            </div>
          </div>
        </div>
        <div class="row item-total-price">
          <span
            >この商品金額：{{ realTimePrice.toLocaleString() }}円(税抜)</span
          >
        </div>
        <div class="row item-cart-btn">
          <button class="btn" type="button" v-on:click="onClickAddCart">
            <span>カートに入れる</span>
          </button>
        </div>
      </div>
      <!-- end container -->
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "@/types/item";
import { OrderItem } from "@/types/orderItem";
import { OrderTopping } from "@/types/orderTopping";
import { Topping } from "@/types/topping";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import SkeletonLoader from "../components/SkeletonLoader.vue";

@Component({
  components: {
    SkeletonLoader,
  },
})
export default class ItemDetail extends Vue {
  //Itemオブジェクト
  private currentItem = new Item(
    0,
    "XXXX",
    "XXXX",
    "XXXX",
    0,
    0,
    "/img_aloha/noImage.png",
    true,
    []
  );
  //商品数量
  private quantity = 1;
  //商品サイズ
  private size = "M";
  //選択したトッピングID
  private toppingIds = [];
  //選択した商品ID
  private itemId = 0;
  //選択したトッピング情報
  private checkToppings = new Array<Topping>();
  //選択したトッピング情報をオーダートッピング型に変換
  private orderToppings = new Array<OrderTopping>();
  //リアルタイム金額表示
  private realTimePrice = 0;
  //トッピングMの金額
  private toppingPriceM = 0;
  //トッピングLの金額
  private toppingPriceL = 0;
  // ローディング中かどうかのフラグ
  private isLoading = true;

  /**
   * 金額をリアルタイムで表示する.
   */
  realTimeCalcPrice(): void {
    if (this.size === "M") {
      const itemSubTotal = this.currentItem.priceM * this.quantity;
      const toppingSubTotal =
        this.toppingIds.length *
        this.currentItem.toppingList[0].priceM *
        this.quantity;
      this.realTimePrice = itemSubTotal + toppingSubTotal;
    } else {
      const itemSubTotal = this.currentItem.priceL * this.quantity;
      const toppingSubTotal =
        this.toppingIds.length *
        this.currentItem.toppingList[0].priceL *
        this.quantity;
      this.realTimePrice = itemSubTotal + toppingSubTotal;
    }
  }
  /**
   * Vuexストアで受け取ったリクエストパラメータのIDから１件の商品情報を取得する.
   */
  async created(): Promise<void> {
    // データ取得前にローディング中のフラグをtrueにする
    this.isLoading = true;

    // 送られてきたリクエストパラメータのidをnumberに変換して取得する
    const itemId = parseInt(this["$route"].params.id);

    const response = await axios.get(
      `http://153.127.48.168:8080/ecsite-api/item/${itemId}`
    );
    console.dir("response" + JSON.stringify(response));
    this.currentItem = new Item(
      response.data.item.id,
      response.data.item.type,
      response.data.item.name,
      response.data.item.description,
      response.data.item.priceM,
      response.data.item.priceL,
      response.data.item.imagePath,
      response.data.item.deleted,
      response.data.item.toppingList
    );

    //金額のリアルタイム表示の初期値
    this.realTimePrice = this.currentItem.priceM;
    //トッピングMの金額
    this.toppingPriceM = this.currentItem.toppingList[0].priceM;
    //トッピングLの金額
    this.toppingPriceL = this.currentItem.toppingList[0].priceL;

    // データが取得されたらローディング中のフラグをfalseにする
    this.isLoading = false;
  }
  /**
   * 選択した商品情報とトッピング情報をOrderItemオブジェクトに追加する.
   */
  onClickAddCart(): void {
    this.checkToppings = [];
    this.orderToppings = [];
    // 選択したトッピングIDのIDを取得する
    if (this.toppingIds.length === 0) {
      this.checkToppings.push(new Topping(-1, "0", "トッピングなし", 0, 0));
    } else {
      for (let toppingId of this.toppingIds) {
        for (let currentItemToppingList of this.currentItem.toppingList) {
          if (toppingId === currentItemToppingList.id) {
            this.checkToppings.push(currentItemToppingList);
          }
        }
      }
    }
    console.log(this.checkToppings);
    // for (let toppingId of this.toppingIds) {
    //   this.checkToppings=this.currentItem.toppingList.filter(
    //     (topping) => topping.id === toppingId
    //   );
    // }

    //取得したトッピング情報をOrderTopping型に変換する
    for (let checkTopping of this.checkToppings) {
      this.orderToppings.push(
        new OrderTopping(-1, checkTopping.id, this.currentItem.id, checkTopping)
      );
    }
    console.log(this.orderToppings);

    //ストアのミューテーションを呼び出す
    this["$store"].commit(
      "addItemInCart",
      new OrderItem(
        -1,
        this.currentItem.id,
        -1,
        this.quantity,
        this.size,
        new Item(
          this.currentItem.id,
          this.currentItem.type,
          this.currentItem.name,
          this.currentItem.description,
          this.currentItem.priceM,
          this.currentItem.priceL,
          this.currentItem.imagePath,
          this.currentItem.deleted,
          this.currentItem.toppingList
        ),
        this.orderToppings
      )
    );
    const currentItem = this.$store.getters.getItemsInCart;
    console.log(currentItem);
    console.log(`${this.quantity}${this.size}${this.toppingIds}`);
    this["$router"].push("/cartList");
  }
}
</script>

<style scoped>
.item-detail {
  display: flex;
  /* 中央揃え */
  justify-content: center;
}
.item-icon img {
  margin: auto;
  display: block;
  border-radius: 30px;
  width: 250px;
  height: 250px;
  padding: 0 0 15px 0;
}

.item-intro {
  width: 400px;
  padding-top: 50px;
  padding-left: 50px;
  font-size: 20px;
}

.item-hedding {
  font-weight: bold;
  font-size: 17px;
  text-align: left;
}
.item-size {
  /* text-align: center; */
  font-size: 15px;
  margin-bottom: 20px;
  padding: 0 200px 0 200px;
}

/* サイズをオレンジ〇で囲む */
.price {
  background-color: #ff4500;
  border-radius: 50%; /* 角丸にする設定 */
  color: black;
}

.item-toppings {
  font-size: 15px;
  padding: 0 200px 0 200px;
}

.item-topping {
  margin-right: 10px;
}

.item-hedding-quantity {
  margin-left: 200px;
}

.item-quantity {
  text-align: center;
  font-size: 15px;
}

.item-quantity-selectbox {
  padding: 0 300px 0 300px;
}

.item-total-price {
  font-size: 35px;
  text-align: center;
}

.item-cart-btn {
  text-align: center;
}
</style>
