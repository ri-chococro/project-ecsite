<template>
  <div class="top">
    <div class="top-wrapper">
      <div class="container">
        <div class="title">Welcome to Rakus Hawaiians !!</div>
        <div class="subTitle">Let's enjoy Hawaii feeling</div>
      </div>
    </div>
    <div class="midle-wrapper">
      <div class="appli">
        <div class="googleMap">
          <h2>Map Information</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.4999497490426!2d139.7020887508128!3d35.68931288009525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d9c8bc1bfbb%3A0xcb44f68a614c714a!2z5qCq5byP5Lya56S-44Op44Kv44K544OR44O844OI44OK44O844K6!5e0!3m2!1sja!2sjp!4v1637912752420!5m2!1sja!2sjp"
            width="500"
            height="350"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div class="youtube">
          <h2>Reference Video</h2>
          <iframe
            width="500"
            height="350"
            src="https://www.youtube.com/embed/TMyaoyRn_kk"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <a class="btn btn-custom01">
        <span class="btn-custom01-front">
          <a href="https://ja-jp.facebook.com/">Facebookで登録</a></span
        ></a
      >
      <a class="btn btn-custom01">
        <span class="btn-custom01-front">
          <a href="https://twitter.com/?lang=ja">Twitterで登録</a></span
        ></a
      >
    </div>
    <div class="top-item-wrapper">
      <div class="container">
        <div class="heading">
          <h2>ラクラクアロハ、４つの特徴！</h2>
        </div>

        <div class="top-items">
          <div class="top-item">
            <p class="pickUp">ハワイアン料理</p>
            <div class="top-item-icon">
              <img src="img/1.jpg" />
            </div>
            <p class="text-contents">
              アロハテーブルやウルフギャング、田中オブ東京などのハワイの有名店で修行を積んだ一流シェフによる本格的なハワイアン料理が家にいてもお手軽に楽しむことができます。
            </p>
          </div>
          <div class="top-item">
            <p class="pickUp">スイーツも充実</p>
            <div class="top-item-icon">
              <img src="img/2.jpg" />
            </div>
            <p class="text-contents">
              アイランドビンテージコーヒーやボガーツカフェのアサイボウルはもちろんのこと、最近流行りのバナンのソフトクリーム、エッグスンシングスのふわふわパンケーキなど有名店のスイーツも充実しています。
            </p>
          </div>
          <div class="top-item">
            <p class="pickUp">アルコールも豊富</p>
            <div class="top-item-icon">
              <img src="img/14.jpg" />
            </div>
            <p class="text-contents">
              ハワイといえばビーチでマイタイ！コナブリューイングのハワイアンコナビールなどハワイでしか飲めないアルコールも豊富にあります。
            </p>
          </div>
          <div class="top-item">
            <p class="pickUp">ホテル創作料理</p>
            <div class="top-item-icon">
              <img src="img/13.jpg" />
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
          <a href="/itemList" class="btn signup">Let's go on an Aloha trip!</a>
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
@import url("https://fonts.googleapis.com/css2?family=Rampart+One&family=Yellowtail&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Rampart+One&family=Yellowtail&display=swap");
@import "https://use.fontawesome.com/releases/v5.13.0/css/all.css";

.googleMap {
  padding: 50px;
  margin-right: 750px;
  width: 50px;
}
.youtube {
  padding: 50px;
  width: 50px;
}
.appli {
  display: flex;
  justify-content: left;
}

*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 62.5%;
}

*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 62.5%;
}
.pickUp {
  font-size: 25px;
  color: red;
}

.btn,
a.btn,
button.btn {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 1rem 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}

a.btn-custom01 {
  margin-bottom: 0.5rem;
  padding: 0;
  border-radius: 0.75rem;
}

a.btn-custom01:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 100%;

  content: "";
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  -webkit-transform: translate3d(0, 0.75rem, -1rem);
  transform: translate3d(0, 0.75rem, -1rem);

  border: 2px solid #000;
  border-radius: inherit;
  background: #ccc100;
  -webkit-box-shadow: 0 0.6rem 0 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0.6rem 0 0 rgba(0, 0, 0, 0.2);
}

a.btn-custom01:after {
  font-family: "Font Awesome 5 Free";
  font-size: 2rem;
  font-weight: normal;
  line-height: 1;
  position: absolute;
  top: calc(50% - 1rem);
  left: 1.5rem;
  margin: 0;
  padding: 0;
  content: "\f0e0";
}

.btn-custom01-front {
  position: relative;
  display: block;
  padding: 1.5rem 5rem 1.5rem 5rem;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  border: 2px solid #000;
  border-radius: inherit;
  background: #fff100;
}

.fa-position-left {
  position: absolute;
  top: calc(50% - 0.5em);
  left: 1rem;
}

.fa-position-right {
  position: absolute;
  top: calc(50% - 0.5em);
  right: 1rem;
}

a.btn-custom01:hover {
  -webkit-transform: translate(0, 0.25rem);
  transform: translate(0, 0.25rem);
  background: #fff100;
}

a.btn-custom01:hover:before {
  -webkit-transform: translate3d(0, 0.5rem, -1rem);
  transform: translate3d(0, 0.5rem, -1rem);
  -webkit-box-shadow: 0 0.35rem 0 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0.35rem 0 0 rgba(0, 0, 0, 0.2);
}

a.btn-custom01:hover:after {
  content: "\f2b6";
}

a.btn-custom01:active {
  -webkit-transform: translate(0rem, 0.75rem);
  transform: translate(0rem, 0.75rem);
}

a.btn-custom01:active:before {
  -webkit-transform: translate3d(0, 0, -1rem);
  transform: translate3d(0, 0, -1rem);
  -webkit-box-shadow: 0 0.35rem 0 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0.35rem 0 0 rgba(0, 0, 0, 0.2);
}

a.btn-custom01:active:after {
  content: "\f2b6";
}

.title {
  font-family: "Rampart One", cursive;
  font-family: "Yellowtail", cursive;
  font-size: 100px;
}
.subTitle {
  font-family: "Anton", sans-serif;
  font-family: "Rampart One", cursive;
  font-family: "Yellowtail", cursive;
  font-size: 60px;
}
.top-wrapper {
  padding: 180px 0 500px 0; /* 上はヘッダが来るのでその分180px分空ける */
  background-image: url(/img/hawaii4.jpg/); /* 背景画像設定 */
  background-size: cover; /* 画像の縦横比を崩すことなく、画像ができるだけ大きくなるよう拡大縮小 */
  color: white;
  text-align: center;
  margin-bottom: -100px;
}
.midle-wrapper {
  padding: 0px 0 100px 0;
  background-image: url(/img/hawaii5.jpg/); /* 背景画像設定 */
  background-size: cover; /* 画像の縦横比を崩すことなく、画像ができるだけ大きくなるよう拡大縮小 */
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
.item {
  float: left;
  width: 25%;
}

.clear {
  clear: left;
}

.top-item {
  margin: 30px;
}
.top-item-icon {
  position: relative; /* p要素を重ねるための指定(absoluteと組み合わせて使う) */
}

.top-item-icon p {
  position: absolute; /* item-iconからpを位置指定するための指定 */
  top: 35%;
  width: 250px;
  color: red;
  font-size: 25px;

  background-color: turquoise;
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
