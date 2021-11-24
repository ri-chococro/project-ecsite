<template>
  <div class="container">
    <img src="" />
    <div class="icon-name">
      <img src="img/no-profile.png" class="profile-img" />
      <div class="name">山田太郎</div>
    </div>
    <div>
      <div class="title">登録情報</div>
      <div class="user-info">
        <p>メールアドレス: example.com</p>
        <p>住所: 東京都新宿区〇〇</p>
        <p>電話番号: 000-0000-0000</p>
      </div>
    </div>
    <div class="order-history">
      <div class="title">注文履歴</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  width: 40%;
}
.icon-name {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 30px;
}
.profile-img {
  width: 80px;
  height: 80px;
}
.name {
  font-size: 30px;
}
.title {
  font-size: 24px;
  margin-top: 40px;
  border-bottom: 1px solid #ccc;
}
.user-info {
  /* border: 1px solid #ccc; */
  padding: 20px;
  /* box-shadow: black 2px 2px 5px; */
  font-size: 18px;
}

.order-history {
}
</style>
