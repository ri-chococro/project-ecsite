<template>
  <div class="register-user">
    <div class="title">
      <h1>-Registration-</h1>
    </div>
    <div class="container">
      <div class="row register-page">
        <div class="error">{{ registerOfError }}</div>
        <div class="row">
          <div class="error">{{ nameOfError }}</div>
          <div class="input-field col s6">
            <input
              id="last_name"
              type="text"
              class="validate"
              v-model="lastName"
              required
            />
            <label for="last_name">姓</label>
          </div>
          <div class="input-field col s6">
            <input
              id="first_name"
              type="text"
              class="validate"
              v-model="firstName"
              required
            />
            <label for="first_name">名</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ emailOfError }}</div>
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              class="validate"
              v-model="emailAddress"
              required
            />
            <label for="email">メールアドレス</label>
          </div>
        </div>
        <div class="row">
          <div class="error">
            {{ zipCodeOfError }}<br />
            {{ searchAddressError }}
          </div>
          <div class="input-field col s12">
            <input id="zipcode" type="text" maxlength="7" v-model="zipCode" />
            <label for="zipcode">郵便番号(ハイフンなし)</label>
            <button class="btn" type="button" v-on:click="searchAddress()">
              <span>住所検索</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ addressOfError }}</div>
          <div class="input-field col s12">
            <input id="address" type="text" v-model="address" />
            <label for="address" :class="{ active: address }">住所</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ telephoneOfError }}</div>
          <div class="input-field col s12">
            <input id="tel" type="tel" v-model="telephone" />
            <label for="tel">電話番号</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ passwordOfError }}</div>
          <div class="input-field col s12">
            <input
              id="password"
              type="password"
              class="validate"
              minlength="8"
              v-model="password"
              required
            />
            <label for="password">パスワード</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ confirmationOfError }}</div>
          <div class="input-field col s12">
            <input
              id="confirmation_password"
              type="password"
              class="validate"
              minlength="8"
              v-model="confirmationPassword"
              required
            />
            <label for="confirmation_password">確認用パスワード</label>
          </div>
        </div>
        <div class="row register-admin-btn">
          <button
            class="btn"
            type="button"
            v-on:click="registerUser"
            id="registerUser"
          >
            <span>登録<i class="material-icons right">done</i></span>
          </button>
          <button class="btn" type="button" v-on:click="reset">
            <span>クリア<i class="material-icons right">done</i></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class RegisterUser extends Vue {
  // 名
  private firstName = "";
  // 姓
  private lastName = "";
  // メールアドレス
  private emailAddress = "";
  // 郵便番号
  private zipCode = "";
  // 住所
  private address = "";
  // 電話番号
  private telephone = "";
  // パスワード
  private password = "";
  // 確認用パスワード
  private confirmationPassword = "";
  // 姓名エラーメッセージ
  private nameOfError = "";
  // メールアドレスエラーメッセージ
  private emailOfError = "";
  // 郵便番号エラーメッセージ
  private zipCodeOfError = "";
  // 住所エラーメッセージ
  private addressOfError = "";
  // 電話番号エラーメッセージ
  private telephoneOfError = "";
  // パスワードエラーメッセージ
  private passwordOfError = "";
  // 確認用パスワードエラーメッセージ
  private confirmationOfError = "";
  // 登録失敗時のエラーメッセージ
  private registerOfError = "";
  // 郵便番号で住所検索失敗時のエラーメッセージ
  private searchAddressError = "";

  /**
   * 会員情報を登録する.
   *
   * @returns Promiseオブジェクト
   */
  async registerUser(): Promise<void> {
    // まずhasErrorメソッドを呼び、エラーが一つ以上あれば処理を止める
    if (this.hasError() === true) {
      return;
    }

    // 会員情報登録処理
    const response = await axios.post(
      `http://153.127.48.168:8080/ecsite-api/user`,
      {
        name: this.lastName + " " + this.firstName,
        email: this.emailAddress,
        password: this.password,
        zipcode: this.zipCode,
        address: this.address,
        telephone: this.telephone,
      }
    );
    console.dir("response:" + JSON.stringify(response));
    if (response.data.status === "success") {
      // 成功ならログイン画面に遷移する
      this.$router.push("/login");
    } else {
      // 失敗ならエラーメッセージを表示する
      this.registerOfError =
        "登録できませんでした（" + response.data.message + ")";
    }
  }

  /**
   * エラーチェック処理.
   *
   * @returns エラーがある:true / エラーがない:false
   */
  private hasError(): boolean {
    let hasError = false;
    this.nameOfError = "";
    this.emailOfError = "";
    this.zipCodeOfError = "";
    this.addressOfError = "";
    this.telephoneOfError = "";
    this.passwordOfError = "";
    this.confirmationOfError = "";

    if (this.lastName === "" || this.firstName === "") {
      this.nameOfError = "姓または名が入力されていません";
      hasError = true;
    }
    let emailPattern = /[A-Za-z0-9_.-]{1,}@{1}[A-Za-z0-9_.-]{1,}$/;
    if (this.emailAddress === "") {
      this.emailOfError = "メールアドレスが入力されていません";
      hasError = true;
    }
    // メールアドレスをXXXX@XXXXの形式にする
    else if (emailPattern.test(this.emailAddress) === false) {
      this.emailOfError = "メールアドレスの形式が不正です";
      hasError = true;
    }
    let zipCodePattern = /^[0-9]{7}$/;
    if (this.zipCode === "") {
      this.zipCodeOfError = "郵便番号が入力されていません";
      hasError = true;
    }
    // 郵便番号をXXX-XXXXの形式にする
    else if (zipCodePattern.test(this.zipCode) === false) {
      this.zipCodeOfError = "郵便番号はXXX-XXXXの形式で入力してください";
      hasError = true;
    }
    if (this.address === "") {
      this.addressOfError = "住所が入力されていません";
      hasError = true;
    }
    let telephonePattern = /^[0-9]{1,5}-[0-9]{1,4}-[0-9]{4}$/;
    if (this.telephone === "") {
      this.telephoneOfError = "電話番号が入力されていません";
      hasError = true;
    }
    // 電話番号をXXXX-XXXX-XXXXの形式にする
    else if (telephonePattern.test(this.telephone) === false) {
      this.telephoneOfError =
        "電話番号はXXXX-XXXX-XXXXの形式で入力してください";
      hasError = true;
    }
    let passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    if (this.password === "") {
      this.passwordOfError = "パスワードが入力されていません";
      hasError = true;
    }
    // パスワードを8〜16文字以内で設定する
    else if (this.password.length < 8 || this.password.length > 16) {
      this.passwordOfError =
        "パスワードは8文字以上16文字以内で設定してください";
      hasError = true;
    }
    // パスワードに数字、小文字英字、大文字英字を含ませる
    else if (passwordPattern.test(this.password) === false) {
      this.passwordOfError =
        "パスワードは半角数字、小文字の半角英字、大文字の半角英字を必ず1つ含めてください";
      hasError = true;
    }

    console.log(typeof this.password.length);
    if (this.confirmationPassword === "") {
      this.confirmationOfError = "確認用パスワードが入力されていません";
      hasError = true;
    } else if (this.confirmationPassword !== this.password) {
      this.confirmationOfError = "パスワードが不一致です";
      hasError = true;
    }

    return hasError;
  }
  /**
   * 入力内容を全てリセットする.
   */
  reset(): void {
    this.firstName = "";
    this.lastName = "";
    this.emailAddress = "";
    this.zipCode = "";
    this.address = "";
    this.telephone = "";
    this.password = "";
    this.confirmationPassword = "";
    this.nameOfError = "";
    this.emailOfError = "";
    this.zipCodeOfError = "";
    this.addressOfError = "";
    this.telephoneOfError = "";
    this.passwordOfError = "";
    this.confirmationOfError = "";
  }
  /**
   * 郵便番号から住所を自動で入力する.
   */
  async searchAddress(): Promise<void> {
    this.zipCodeOfError = "";
    // Jsonではなくエラーで返ってきてしまうためtrycatch構文
    try {
      if (this.zipCode === "") {
        this.zipCodeOfError = "郵便番号が入力されていません";
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const axiosJsonpAdapter = require("axios-jsonp");
      const response = await axios.get("https://zipcoda.net/api", {
        adapter: axiosJsonpAdapter,
        params: {
          zipcode: this.zipCode,
        },
      });
      // 結果が複数取れてしまったらエラーメッセージ表示
      if (response.data.items.length !== 1) {
        this.zipCodeOfError = "存在しない郵便番号です";
        return;
      }
      // 形式をXXX-XXXXにする
      let zipCodePattern = /^[0-9]{7}$/;
      if (zipCodePattern.test(this.zipCode) === false) {
        this.zipCodeOfError = "郵便番号はXXX-XXXXの形式で入力してください";
        return;
      }
      this.address =
        response.data.items[0].pref + response.data.items[0].address;
    } catch {
      this.zipCodeOfError = "存在しない郵便番号です";
    }
  }
}
</script>

<style scoped>

.title {
  text-align: center;
  font-family: "Rampart One", cursive;
  font-family: "Yellowtail", cursive;
  font-size: 100px;
}
.register-user {
  background-image: url("/imggggg/1151514.jpg");
  background-size: 100%;
}
.container {
  width: 750px;
  background-color:white
  ;
  
}
#registerUser {
  margin-right: 100px;
}
.register-page {
  width: 600px;
}

.register-admin-btn {
  text-align: center;
}
</style>
