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
                  <router-link to="/registerUser">管理者登録はこちら</router-link>
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
  // 入力されたメールアドレス
  private mailAddress = "";
  // 入力されたパスワード
  private password = "";
  //   メールアドレスが未入力のときのエラー表示
  private mailAddressError = "";
  //   パスワードが未入力のときのエラー表示
  private passwordError = "";
  //   パスワードとメールアドレスが不一致ときのエラー表示
  private mismatchError = "";
  //   エラーがあるかどうかの確認
  private isLoginError = false;
  /**
   * ログインをする.
   */
  async LoginAdmin(): Promise<void> {
    this.mailAddressError = "";
    this.passwordError = "";
    this.mismatchError = "";
    this.isLoginError = false;
    // メールアドレスが未入力時の処理
    if (this.mailAddress === "") {
      this.mailAddressError = "メールアドレスを入力してください";
      this.isLoginError = true;
    }
    // パスワードが未入力時の処理
    if (this.password === "") {
      this.passwordError = "パスワードを入力してください";
      this.isLoginError = true;
    }
    // エラーが1つでもあったら返す
    if (this.isLoginError === true) {
      return;
    }

    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/login",
      {
        email: this.mailAddress,
        password: this.password,
      }
    );
    if (response.data.status === "success") {
      // ログイン状態にする(stateのisLoginをtrueにする)
      this.$store.commit("logined");

      let user = response.data.responseMap.user;
      this["$store"].commit("setLoginUser", {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        zipcode: user.zipcode,
        address: user.address,
        telephone: user.telephone,
      });
      if (this.$store.getters.getFromCartListFlag === true) {
        this["$router"].push("/orderConfirm");
        this.$store.commit("fromCartListFlagOff");
      } else {
        this["$router"].push("/itemList");
      }
    } else if (response.data.status === "error") {
      this.mismatchError = response.data.message;
    }
  }
}
</script>

<style scoped>
.login-page {
  width: 600px;
}

.login-btn {
  text-align: center;
}
</style>
