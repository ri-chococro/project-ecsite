<template>
  <div class="main">
    <img src="../assets/404image.jpg" class="bg-img" />
    <router-link to="/itemList">
      <button class="btn toTopButton" type="button">商品一覧ページへ</button>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  text-align: center;
  margin-top: -25px;
  position: relative;
}
.bg-img {
  width: 60%;
}
.toTopButton {
  position: absolute;
  top: 55%;
  right: 33%;
}
</style>
