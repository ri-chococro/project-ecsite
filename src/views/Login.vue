<template>
  <div>
    <div class="container">
      <div class="row login-page">
        <div class="col s12 z-depth-6 card-panel">
          <div class="error">
            {{ mailAddressError }}<br />
            {{ passwordError }}<br />
            {{ mismatchError }}<br />
          </div>
          <form class="login-form" action="employeeList.html">
            <div class="row"></div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">mail_outline</i>
                <input
                  class="validate"
                  id="mailAddress"
                  type="email"
                  v-model="mailAddress"
                />
                <label for="mailAddress" data-error="wrong" data-success="right"
                  >メールアドレス</label
                >
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">lock_outline</i>
                <input id="password" type="password" v-model="password" />
                <label for="password">パスワード</label>
              </div>
            </div>
            <div class="row login-btn">
              <button class="btn" type="button" @click="LoginAdmin">
                <span>ログイン</span>
              </button>
            </div>
            <div class="row">
              <div class="input-field col s6 m6 l6">
                <p class="margin medium-small">
                  <a href="register_admin.html">管理者登録はこちら</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
@Component
export default class Login extends Vue {
  private mailAddress = "";
  private password = "";
  private mailAddressError = "";
  private passwordError = "";
  private mismatchError = "";
  private isLoginError = false;

  async LoginAdmin(): Promise<void> {
    this.mailAddressError = "";
    this.passwordError = "";
    this.mismatchError = "";
    this.isLoginError = false;
    
    if (this.mailAddress === "") {
      this.mailAddressError = "メールアドレスを入力してください";
      this.isLoginError = true;
    }
    if (this.password === "") {
      this.passwordError = "パスワードを入力してください";
      this.isLoginError = true;
    }

    if (this.isLoginError === true) {
      return;
    }

    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/login",
      {
        mailAddress: this.mailAddress,
        password: this.password,
      }
    );

    if (response.data.status === "success") {
      this["$router"].push("/itemList");
    } else if (response.data.status === "error") {
      this.mismatchError = response.data.message;
    }
    console.log(response);
  }
}
</script>

<style>
.login-page {
  width: 600px;
}

.login-btn {
  text-align: center;
}
</style>
