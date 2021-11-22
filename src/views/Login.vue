<template>
<div>g
  <div class="container">
    <div class="row login-page">
      <div class="col s12 z-depth-6 card-panel">
        <div class="error">エラーメッセージ</div>
        <form class="login-form" action="employeeList.html">
          <div class="row"></div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mail_outline</i>
              <input class="validate" id="mailAddress" type="email" />
              <label for="mailAddress" data-error="wrong" data-success="right"
                >メールアドレス</label
              >
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">lock_outline</i>
              <input id="password" type="password" />
              <label for="password">パスワード</label>
            </div>
          </div>
          <div class="row login-btn">
            <button
              class="btn"
              type="button"
              onclick="location.href='item_list.html'"
            >
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

<script>
export default {};
</script>

<style>
.login-page {
  width: 600px;
}

.login-btn {
  text-align: center;
}
</style>
