<template>
  <header>
    <div class="container">
      <div class="header">
        <div class="header-left">
          <router-link to="/top">
            <img class="logo" src="/img_aloha/header_logo.png" />
          </router-link>
        </div>
        <div class="header-right">
          <router-link to="/itemList">商品一覧</router-link>
          <router-link to="/registerUser" v-if="!isLogin">会員登録</router-link>
          <router-link to="/cartList">
            <i class="fas fa-shopping-cart"> </i>カート
          </router-link>
          <router-link to="/login" v-if="!isLogin">
            <i class="fas fa-sign-in-alt"></i>ログイン
          </router-link>
          <router-link to="/logout" v-if="isLogin">
            <i class="fas fa-sign-in-alt"></i>ログアウト
          </router-link>
          <router-link to="/myPage" v-if="isLogin"
            ><img src="/img_aloha/no-profile.png" class="profile-img"
          /></router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  /**
   * ログイン状態かどうかを取得.
   *
   * @return ログイン状態かどうかのフラグ
   */
  get isLogin(): boolean {
    return this.$store.getters.getLoginStatus;
  }
}
</script>

<style scoped>
header {
  height: 100px;
  width: 100%;
  background-color: rgba(255, 255, 255);
  position: fixed; /* スクロールしてもヘッダが表示されるように位置を固定する */
  z-index: 10; /* ヘッダが一番上に表示されるようにする(数が多いほど上に来る。例えば-1にするとヘッダが裏側に行き見えなくなります) */
}

.header {
  display: flex; /* ヘッダロゴと右側のリンクを横並びにする */
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 230px;
  margin-top: 0;
}

.header-right {
  display: flex; /* ヘッダ右側のリンクを横に並べる */
}

.header-right a {
  line-height: 100px; /* 行の高さを指定(文字が上下の真ん中に配置される) */
  padding: 0 25px;
  color: gray;
  font-size: 1.1rem;
  display: block; /* a要素をブロック要素に変更(borderまでがクリックできるようになる) */
  transition: all 0.5s; /* アニメーションの設定 all=変化の対象 0.5s=変化にかかる時間 hoverと組み合わせることが多い */
}

.header-right a:hover {
  color: #000;
  text-decoration: underline;
}

/* fontawesome(カートアイコン＆ログインアイコンの設定) */
.fas {
  margin-right: 5px;
}

.profile-img {
  width: 50px;
  height: 50px;
  margin-top: 20px;
}

/* スマートフォン用のメニューアイコン */
.menu-icon {
  display: none; /* メディアクエリで画面がスマホサイズになるまでは非表示 */
  color: gray;
  float: right;
  font-size: 25px;
  padding: 21px 0;
}
</style>
