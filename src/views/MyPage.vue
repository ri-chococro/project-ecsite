<template>
  <div class="profile-wrapper">
    <div class="container">
      <div class="icon-name">
        <img src="/img_aloha/no-profile.png" class="profile-img" />
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
                <th>ステータス</th>
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
                  <div>
                    <span v-if="hasDelivered(order.deliveryTime)">
                      <i class="fas fa-check-circle fa-lg check-icon"></i>
                      <span>お届け済</span>
                    </span>
                    <span v-else
                      >{{ formattedDeliveryTime(order.deliveryTime) }}<br />
                      お届け予定</span
                    >
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
                              <router-link
                                :to="'/itemDetail/' + orderItem.item.id"
                                class="link"
                                >商品ページへ</router-link
                              >
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
                        <div>
                          <p>受取人：{{ order.destinationName }}</p>
                          <p>お届け先：{{ order.destinationAddress }}</p>
                        </div>
                        <div>
                          <p>合計 {{ order.totalPrice.toLocaleString() }}円</p>
                          <p>(内税 {{ order.tax.toLocaleString() }}円)</p>
                        </div>
                      </div>
                      <button
                        class="btn close-btn"
                        v-on:click="hide(String(i))"
                      >
                        閉じる
                      </button>
                      <!-- 配送時間の2時間前までならキャンセルできるため、キャンセルボタン表示 -->
                      <!-- キャンセルボタンを押すと、確認のモーダルが開く -->
                      <button
                        class="btn pink lighten-2"
                        v-if="canCancel(order.deliveryTime)"
                        v-on:click="show('cancel')"
                      >
                        注文をキャンセル
                      </button>
                      <!-- キャンセルの確認モーダル -->
                      <modal name="cancel" width="400px" height="200px">
                        <div class="modal-body cancel-modal">
                          <p>⚠️本当に注文をキャンセルしてよろしいですか。</p>
                          <button
                            class="btn pink lighten-2 yes-btn"
                            v-on:click="cancelOrder(i)"
                          >
                            はい
                          </button>
                          <button class="btn" v-on:click="hide('cancel')">
                            いいえ
                          </button>
                        </div>
                      </modal>
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
import { format } from "date-fns/esm";
import { addHours } from "date-fns";

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
    // ログインしていなければログイン画面へ遷移
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
      return;
    }

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

    //IDの降順に並び替える
    this.orderHistory.sort(function (a, b) {
      return a.id > b.id ? -1 : 1;
    });
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
  /**
   * 配送状況を返す.
   *
   * @param - 配送日時
   * @return - 配送状況 配送済みならtrue, 未配送ならfalse
   */
  hasDelivered(date: string): boolean {
    // 現在の日時より配送日時が過去なら配送済み
    let now = new Date();
    let deliveryTime = new Date(date);
    if (deliveryTime < now) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * 配送日時をフォーマットする.
   *
   * @param - 配送日時
   */
  formattedDeliveryTime(date: string): string {
    let deliveryTime = new Date(date);
    return format(deliveryTime, "yyyy/MM/dd HH時");
  }
  /**
   * キャンセルできるかどうかを返す.
   *
   * @remarks
   * 配送日時の2時間前までならキャンセルできる
   *
   * @param - 配送日時
   * @return - 配送時間の2時間前までならtrue, それ以外ならfalse
   */
  canCancel(date: string): boolean {
    let now = new Date();
    let deliveryTime = new Date(date);

    if (deliveryTime > addHours(now, 2)) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * 注文をキャンセルする.
   *
   * @param - 注文履歴のインデックス
   */
  cancelOrder(i: number): void {
    this.orderHistory.splice(i, 1);
    // モーダルを閉じる
    this.hide("cancel");
    this.hide(String(i));
  }
}
</script>

<style scoped>
.profile-wrapper {
  margin-top: -20px;
  text-align: center;
  background-image: url("/imggggg/img_aloha/");
  background-size: 250px;
}
.container {
  width: 750px;
  padding: 20px 120px;
  background-color: #f7f7f7;
  position: relative;
}
.icon-name {
  display: flex;
  align-items: center;
  padding-left: 10%;
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
}
.check-icon {
  color: rgb(65, 146, 65);
  margin-right: 10px;
}

/* モーダルのスタイル */
.modal-body {
  padding: 10px 25px 50px;
}
.modal-title {
  text-align: center;
}
.modal-bottom {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
.close-btn {
  margin-right: 15px;
}
.link {
  text-decoration: underline;
  color: #333;
}

.cancel-modal {
  text-align: center;
  margin-top: 50px;
  font-size: 16px;
}
.yes-btn {
  margin-right: 15px;
}
</style>
