<template>
  <div class="profile-wrapper">
    <div class="container">
      <div class="icon-name">
        <img src="img_aloha/no-profile.png" class="profile-img" />
        <div class="name">{{ loginUser.name }}</div>
      </div>
      <div>
        <div class="title">登録情報</div>
        <div class="user-info">
          <p><i class="fas fa-envelope fa-lg icon"></i>メールアドレス</p>
          <p class="info">{{ loginUser.email }}</p>
          <p><i class="fas fa-map-marker-alt fa-lg icon"></i>住所</p>
          <p class="info">{{ loginUser.address }}</p>
          <p><i class="fas fa-phone fa-lg icon"></i>電話番号</p>
          <p class="info">{{ loginUser.telephone }}</p>
        </div>
      </div>
      <div>
        <div class="title">注文履歴</div>
        <div class="row order-history">
          <table class="striped">
            <thead>
              <tr>
                <th>注文ID</th>
                <th>注文日</th>
                <th>合計金額</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, i) of orderHistory" :key="order.id">
                <td>
                  <span>{{ order.id }}</span>
                </td>
                <td>
                  <span>{{ order.orderDate }}</span>
                </td>
                <td>
                  <div class="text-center">
                    {{ order.totalPrice.toLocaleString() }}円
                  </div>
                </td>
                <td>
                  <button
                    class="btn"
                    type="button"
                    v-on:click="show(String(i))"
                  >
                    <span>詳細</span>
                  </button>
                  <!-- 注文詳細を表示するモーダル -->
                  <modal
                    :name="String(i)"
                    :adaptive="true"
                    width="850"
                    height="auto"
                    :scrollable="true"
                  >
                    <div class="title modal-title">注文内容</div>
                    <div class="modal-body">
                      <table class="striped">
                        <thead>
                          <tr>
                            <th>画像</th>
                            <th>商品名</th>
                            <th>サイズ、数量</th>
                            <th>トッピング</th>
                            <th>小計</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="orderItem of order.orderItemList"
                            :key="orderItem.id"
                          >
                            <td>
                              <div>
                                <img
                                  v-bind:src="orderItem.item.imagePath"
                                  height="100px"
                                />
                              </div>
                            </td>
                            <td>
                              <span>{{ orderItem.item.name }}</span>
                            </td>
                            <td>
                              <span class="price"
                                >&nbsp;{{ orderItem.size }}</span
                              >
                              &nbsp;&nbsp;{{ orderItem.quantity }}個
                            </td>
                            <td>
                              <ul
                                v-for="topping of orderItem.orderToppingList"
                                v-bind:key="topping.id"
                              >
                                <li>
                                  {{ topping.topping.name }}
                                </li>
                              </ul>
                            </td>
                            <td>
                              <div class="text-center">
                                {{ orderItem.subTotal.toLocaleString() }}円
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="modal-bottom">
                        <button class="btn" v-on:click="hide(String(i))">
                          閉じる
                        </button>
                        <div>
                          <p>合計 {{ order.totalPrice.toLocaleString() }}円</p>
                          <p>(内税 {{ order.tax.toLocaleString() }}円)</p>
                        </div>
                      </div>
                    </div>
                  </modal>
                  <!-- ここまでモーダル -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Order } from "@/types/order";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import { User } from "../types/user";
import VModal from "vue-js-modal";

Vue.use(VModal);

/**
 * プロフィール画面を表示するクラスコンポーネント.
 */
@Component
export default class MyPage extends Vue {
  // ログインユーザー情報
  private loginUser!: User;
  // 注文履歴
  private orderHistory: Array<Order> = [];

  /**
   * コンポーネント作成時に呼ぶ.
   *
   * @remarks
   * ログインユーザー情報を取得し、注文履歴を取得する。
   */
  async created(): Promise<void> {
    this.loginUser = this.$store.getters.getLoginUser;

    await this.getOrderHistory();
  }
  /**
   * WEB APIで注文履歴を取得する
   */
  async getOrderHistory(): Promise<void> {
    const url = `http://153.127.48.168:8080/ecsite-api/order/orders/aloha/${this.loginUser.id}`;

    const response = await axios.get(url);
    this.orderHistory = response.data.orders;
  }
  /**
   * 注文詳細のモーダルを開く
   *
   * @param - 注文履歴のインデックス
   */
  show(i: string): void {
    this.$modal.show(i);
  }
  /**
   * 注文詳細のモーダルを閉じる
   *
   * @param - 注文履歴のインデックス
   */
  hide(i: string): void {
    this.$modal.hide(i);
  }
}
</script>

<style scoped>
.profile-wrapper {
  margin: -20px;
  background-color: #f7f7f7;
  text-align: center;
}
.container {
  width: 600px;
  padding: 30px 0;
}
.icon-name {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding-left: 80px;
  gap: 30px;
}
.profile-img {
  width: 80px;
  height: 80px;
}
.name {
  font-size: 30px;
}
.title {
  font-size: 24px;
  margin-top: 40px;
  border-bottom: 1px solid #ccc;
}
.user-info {
  width: 500px;
  padding: 20px;
  box-shadow: black 2px 2px 5px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: white;
  text-align: left;
}

.icon {
  color: rgb(65, 146, 65);
  margin-right: 30px;
}

.info {
  margin-left: 50px;
  border-bottom: 1px solid #ccc;
}

.order-history {
  text-align: center;
  padding-left: 50px;
}

/* モーダルのスタイル */
.modal-header,
.modal-body {
  padding: 10px 25px;
}
.modal-header {
  border-bottom: 1px solid #ddd;
}
.modal-title {
  text-align: center;
}
.modal-bottom {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
</style>
