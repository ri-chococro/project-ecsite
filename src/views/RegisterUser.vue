<template>
  <div class="register-user">
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
          <div class="error">{{ zipCodeOfError }}</div>
          <div class="input-field col s12">
            <input id="zipcode" type="text" maxlength="7" v-model="zipCode" />
            <label for="zipcode">郵便番号(ハイフンなし)</label>
            <button class="btn" type="button">
              <span>住所検索</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ addressOfError }}</div>
          <div class="input-field col s12">
            <input id="address" type="text" v-model="address" />
            <label for="address">住所</label>
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
          <button class="btn" type="button" v-on:click="registerUser">
            <span>登録<i class="material-icons right">done</i></span>
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
  private firstName = "";
  private lastName = "";
  private emailAddress = "";
  private zipCode = "";
  private address = "";
  private telephone = "";
  private password = "";
  private confirmationPassword = "";
  private nameOfError = "";
  private emailOfError = "";
  private zipCodeOfError = "";
  private addressOfError = "";
  private telephoneOfError = "";
  private passwordOfError = "";
  private confirmationOfError = "";
  private registerOfError = "";

  async registerUser(): Promise<void> {
    if (this.hasError() === true) {
      return;
    }

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
      this.$router.push("/login");
    } else {
      this.registerOfError =
        "登録できませんでした（" + response.data.message + ")";
    }
  }

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
    if (this.emailAddress === "") {
      this.emailOfError = "メールアドレスが入力されていません";
      hasError = true;
    }
    if (this.zipCode === "") {
      this.zipCodeOfError = "郵便番号が入力されていません";
      hasError = true;
    }
    if (this.address === "") {
      this.addressOfError = "住所が入力されていません";
      hasError = true;
    }
    if (this.telephone === "") {
      this.telephoneOfError = "電話番号が入力されていません";
      hasError = true;
    }
    if (this.password === "") {
      this.passwordOfError = "パスワードが入力されていません";
      hasError = true;
    }
    if (this.confirmationPassword === "") {
      this.confirmationOfError = "確認用パスワードが入力されていません";
      hasError = true;
    } else if (this.confirmationPassword !== this.password) {
      this.confirmationOfError = "パスワードが不一致です";
      hasError = true;
    }

    return hasError;
  }
}
</script>

<style scoped>
.register-page {
  width: 600px;
}

.register-admin-btn {
  text-align: center;
}
</style>
