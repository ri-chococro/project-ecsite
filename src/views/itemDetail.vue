<template>
  <div class="container">
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">{{ currentItem.name }}</h1>
        <div class="row">
          <div class="row item-detail">
            <div class="item-icon">
              <img v-bind:src="currentItem.imagePath" />
            </div>
            <div class="item-intro">
              {{ currentItem.discription }}
            </div>
          </div>
          <div class="row item-size">
            <div class="item-hedding">サイズ</div>
            <div>
              <label>
                <input id="size-m" name="size" type="radio" checked="checked" />
                <span>
                  &nbsp;<span class="price">Ｍ</span>&nbsp;&nbsp;{{
                    currentItem.priceM
                  }}円(税抜)</span
                >
              </label>
              <label>
                <input id="size-l" name="size" type="radio" />
                <span>
                  &nbsp;<span class="price">Ｌ</span>&nbsp;&nbsp;{{
                    currentItem.priceL
                  }}円(税抜)</span
                >
              </label>
            </div>
          </div>
          <div class="row item-toppings">
            <div class="item-hedding">
              トッピング：&nbsp;1つにつき
              <span>&nbsp;Ｍ&nbsp;</span>&nbsp;&nbsp;200円(税抜)
              <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
            </div>
            <div>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアンソルト</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアンマヨネーズ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアントマト</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ブルーチーズ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアンチョコレート</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>アンチョビ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>エビ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ガーリックスライス</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>トロピカルフルーツ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ココナッツ</span>
              </label>
            </div>
          </div>
          <div class="row item-quantity">
            <div class="item-hedding item-hedding-quantity">数量</div>
            <div class="item-quantity-selectbox">
              <div class="input-field col s12">
                <select>
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
            <span>この商品金額：38,000 円(税抜)</span>
          </div>
          <div class="row item-cart-btn">
            <button
              class="btn"
              type="button"
              onclick="location.href='cart_list.html'"
            >
              <span>カートに入れる</span>
            </button>
          </div>
        </div>
      </div>
      <!-- end container -->
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "@/types/item";
import { Topping } from "@/types/topping";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ItemDetail extends Vue {
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

  async created(): Promise<void> {
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
      response.data.item.discription,
      response.data.item.priceM,
      response.data.item.priceL,
      response.data.item.imagePath,
      response.data.item.deleted,
      response.data.item.toppingList
    );
  }
}
</script>

<style></style>
