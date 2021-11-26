<template>
  <div>ログアウト中・・・</div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import Component from "vue-class-component";
@Component
export default class Logout extends Vue {
  /**
   * ログアウトする.
   */
  async created(): Promise<void> {
    // ログインしていなければログイン画面へ遷移
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
      return;
    }

    // ログアウト状態にする(stateのisLoginをfalseにする)
    this.$store.commit("logouted");
    await axios.post("http://153.127.48.168:8080/ecsite-api/user/logout");
    this["$router"].push("/itemList");
  }
}
</script>

<style></style>
