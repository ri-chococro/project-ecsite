<template>
  <div>
    <div class="container">
      <h1 class="page-title">決済が完了しました！</h1>
      <div class="order-finished-thanks-message">
        <p>この度はご注文ありがとうございます。</p>
        <p>
          お支払い先は、お送りしたメールに記載してありますのでご確認ください。
        </p>
        <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
      </div>
      <div class="row order-finished-btn">
        <button class="btn" type="button" v-on:click="onClickToTop">
          <span>トップ画面を表示する</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

/**
 * 注文完了画面のクラスコンポーネント.
 */
@Component
export default class OrderFinished extends Vue {
  created(): void {
    // ログインしていなければログイン画面へ遷移
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
      return;
    }
  }

  /**
   * トップ画面へ戻る
   */
  onClickToTop(): void {
    this.$router.push("/itemList");
  }
}
</script>

<style scoped>
.order-finished-thanks-message {
  text-align: center;
}

.order-finished-btn {
  text-align: center;
}
</style>
