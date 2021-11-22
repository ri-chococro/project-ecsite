<template>
  <div class="container">
    <div class="header">
      <div class="header-left">
        <a href="top.html">
          <img class="logo" src="img/header_logo.png" />
        </a>
      </div>
      <div class="header-right">
        <a href="item_list.html">商品一覧</a>
        <a href="register_admin.html">会員登録</a>
        <a href="cart_list.html">
          <i class="fas fa-shopping-cart"> </i>カート
        </a>
        <a href="login.html" class="login">
          <i class="fas fa-sign-in-alt"></i>ログイン
        </a>

        <a href="order_history.html">注文履歴</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
header {
  height: 65px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed; /* スクロールしてもヘッダが表示されるように位置を固定する */
  z-index: 10; /* ヘッダが一番上に表示されるようにする(数が多いほど上に来る。例えば-1にするとヘッダが裏側に行き見えなくなります) */
}

.header {
  display: flex; /* ヘッダロゴと右側のリンクを横並びにする */
  /* justify-content: flex-end; 右寄せにしたい場合*/
}

.logo {
  width: 200px;
  margin-top: 15px;
}

/* .header-left {
  float: left;
} */

.header-right {
  margin-left: auto; /* ヘッダ右側のリンクだけ右寄せにする(ロゴは左寄せのまま) */
  /* float: right; */
  display: flex; /* ヘッダ右側のリンクを横に並べる */
}

.header-right a {
  line-height: 65px; /* 行の高さを指定(文字が上下の真ん中に配置される) */
  padding: 0 25px;
  color: gray;
  display: block; /* a要素をブロック要素に変更(borderまでがクリックできるようになる) */
  /* float: left; */
  transition: all 0.5s; /* アニメーションの設定 all=変化の対象 0.5s=変化にかかる時間 hoverと組み合わせることが多い */
}

.header-right a:hover {
  background-color: rgba(
    255,
    255,
    255,
    0.5
  ); /* マウスが乗せられた際の色と透明度を設定 */
}

/* fontawesome(カートアイコン＆ログインアイコンの設定) */
.fas {
  margin-right: 5px;
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
