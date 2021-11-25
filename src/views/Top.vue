<template>
  <div class="top">
    <div class="top-wrapper">
      <div class="container">
        <h1>DELIVERING THE FEELINGS OF ALOHA TO YOU</h1>
        <p>日本にいながらアロハな気分をあなたにお届け！</p>
        <p>
          ラクラクアロハは自宅にハワイアン料理がデリバリーで届くハワイアンECサイトです。
        </p>
        <div class="btn-wrapper">
          <a href="/registerUser" class="btn signup">会員登録</a>
          <p>or</p>
          <a href="#" class="btn facebook"
            ><i class="fab fa-facebook"></i>Facebookで登録</a
          >
          <a href="#" class="btn twitter"
            ><i class="fab fa-twitter"></i>Twitterで登録</a
          >
        </div>
      </div>
    </div>

    <div class="top-item-wrapper">
      <div class="container">
        <div class="heading">
          <h2>ラクラクアロハ、４つの特徴！</h2>
        </div>
        <div class="top-items">
          <div class="top-item">
            <div class="top-item-icon">
              <img src="img/1.jpg" />
              <p>ハワイアン料理</p>
            </div>
            <p class="text-contents">
              アロハテーブルやウルフギャング、田中オブ東京などのハワイの有名店で修行を積んだ一流シェフによる本格的なハワイアン料理が家にいてもお手軽に楽しむことができます。
            </p>
          </div>
          <div class="top-item">
            <div class="top-item-icon">
              <img src="img/2.jpg" />
              <p>スイーツも充実</p>
            </div>
            <p class="text-contents">
              アイランドビンテージコーヒーやボガーツカフェのアサイボウルはもちろんのこと、最近流行りのバナンのソフトクリーム、エッグスンシングスのふわふわパンケーキなど有名店のスイーツも充実しています。
            </p>
          </div>
          <div class="top-item">
            <div class="top-item-icon">
              <img src="img/14.jpg" />
              <p>アルコールも豊富</p>
            </div>
            <p class="text-contents">
              ハワイといえばビーチでマイタイ！コナブリューイングのハワイアンコナビールなどハワイでしか飲めないアルコールも豊富にあります。
            </p>
          </div>
          <div class="top-item">
            <div class="top-item-icon">
              <img src="img/13.jpg" />
              <p>ホテル創作料理</p>
            </div>
            <p class="text-contents">
              シェラトンワイキキ、ロイヤルハワイアン、モアナサーフライダー、アウラニに入っているレストランの創作料理も「ラクラクアロハ」なら気軽に注文できます。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="message-wrapper">
      <div class="container">
        <div class="heading">
          <h2>さぁ、今すぐALOHAの旅に出よう！</h2>
          <h3>Let's go on an Aloha trip!</h3>
        </div>
        <span class="btn message">ALOHAの旅に出る！</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Top extends Vue {}
</script>

<style scoped>
.top-wrapper {
  padding: 180px 0 100px 0; /* 上はヘッダが来るのでその分180px分空ける */
  background-image: url(/img/hawaii_top.jpeg/); /* 背景画像設定 */
  background-size: cover; /*画像の縦横比を崩すことなく、画像ができるだけ大きくなるよう拡大縮小*/
  color: white;
  text-align: center;
}

.top-wrapper h1 {
  opacity: 0.9; /* 文字の透明度を指定 */
  font-size: 45px;
  letter-spacing: 5px; /* 文字の間隔を設定 */
}

.top-wrapper p {
  opacity: 0.7; /* 文字の透明度を指定 */
}

.btn-wrapper {
  text-align: center; /* ボタン群の配置を真ん中揃えにする */
  margin: 20px 0;
}

.btn-wrapper p {
  margin: 10px 0;
}

.signup {
  background-color: #239b76;
}

.facebook {
  background-color: #3b5998;
  margin-right: 10px;
}

.twitter {
  background-color: #55acee;
}

.btn {
  display: inline-block; /*ボタンはa要素(インライン要素)のため widhやheightは指定できない。またmarginやpaddingは横のみしか指定できない。今回padding指定したいためにインラインブロック要素に変更する */
  padding: 8px 24px; /* 上記でインラインブロック要素に下ので上下のpaddingが設定できる */
  color: white;
  opacity: 0.8; /* 透明度の設定 */
  border-radius: 4px; /* ボタンの角を丸くする */
  text-align: center; /* ボタン名を中央揃えに */
}

.btn:hover {
  opacity: 1; /* マウスを乗せた時は透明度をなくす 1:不透明 */
}

/* fontawesome(facebook＆twitterアイコンの設定) */
.fab {
  margin-right: 10px;
}

/* ========================================
    top-item-wrapperの設定
   ======================================== */

.top-item-wrapper {
  padding-bottom: 80px;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #f7f7f7;
  text-align: center;
}

.top-items {
  display: flex;
}
/* .item {
  float: left;
  width: 25%;
}

.clear {
  clear: left;
} */

.top-item {
  margin: 30px;
}
.top-item-icon {
  position: relative; /* p要素を重ねるための指定(absoluteと組み合わせて使う) */
}

.top-item-icon p {
  position: absolute; /* item-iconからpを位置指定するための指定 */
  top: 35%;
  width: 100%;
  color: red;
}

.top-item-icon img {
  border-radius: 30px; /* 画像を角丸にする */
  width: 200px;
  height: 200px;
}

/* ========================================
    message-wrapperの設定
   ======================================== */
.message-wrapper {
  border-bottom: 1px solid #eee;
  padding-bottom: 80px;
  text-align: center;
}

.message {
  padding: 15px 40px;
  background-color: #5dca88;
  cursor: pointer; /* a要素のようにマウスの乗せるとa要素のようにポインタが変わる */
  box-shadow: 1px 5px #1a7940; /* ボタンに影をつける 右1px 下5px */
}

/* メッセージクリック時の挙動の設定 */
.message:active {
  position: relative; /* messageクラスから位置を指定したいため(これがないとページの左上からの位置指定になりうまくボタンが動かない) */
  top: 5px; /* ボタンを本来の位置よりも5px分下にずらす(上を5px空ける) */
  left: 1px; /* ボタンを本来の位置よりも1px分右にずらす(左を1px空ける) */
  box-shadow: none; /* 影をなくす(これがないと影ごと右下に動く) */
}
</style>
