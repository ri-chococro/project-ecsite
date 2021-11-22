<template>
  <div class="register-user">
    <div class="container">
      <div class="row register-page">
        <div class="error">{{ registerOfError }}</div>
        <div class="row">
          <div class="error">{{ nameOfError }}</div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate" required />
            <label for="last_name">姓</label>
          </div>
          <div class="input-field col s6">
            <input id="first_name" type="text" class="validate" required />
            <label for="first_name">名</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ emailOfError }}</div>
          <div class="input-field col s12">
            <input id="email" type="email" class="validate" required />
            <label for="email">メールアドレス</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ zipCodeOfError }}</div>
          <div class="input-field col s12">
            <input id="zipcode" type="text" maxlength="7" />
            <label for="zipcode">郵便番号(ハイフンなし)</label>
            <button class="btn" type="button">
              <span>住所検索</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ addressOfError }}</div>
          <div class="input-field col s12">
            <input id="address" type="text" />
            <label for="address">住所</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ telephoneOfError }}</div>
          <div class="input-field col s12">
            <input id="tel" type="tel" />
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
              required
            />
            <label for="confirmation_password">確認用パスワード</label>
          </div>
        </div>
        <div class="row register-admin-btn">
          <button
            class="btn"
            type="button"
            onclick="location.href='login.html'"
          >
            <span>登録<i class="material-icons right">done</i></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

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
