<template>
  <div class="container">
    <div class="profile-wrapper">
      <div class="icon-name">
        <img src="img/no-profile.png" class="profile-img" />
        <div class="name">{{ loginUser.name }}</div>
      </div>
      <div>
        <div class="title">登録情報</div>
        <div class="user-info">
          <p><i class="fas fa-envelope fa-lg icon"></i>メールアドレス</p>
          <p class="info">{{ loginUser.email }}</p>
          <p><i class="fas fa-map-marker-alt fa-lg icon"></i>住所</p>
          <p class="info">{{ loginUser.address }}</p>
          <p><i class="fas fa-phone fa-lg icon"></i>電話番号</p>
          <p class="info">{{ loginUser.telephone }}</p>
        </div>
      </div>
      <div class="order-history">
        <div class="title">注文履歴</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  background-color: #f7f7f7;
}
.profile-wrapper {
  width: 40%;
  margin: 0 auto;
  padding: 30px 0;
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
  box-shadow: black 2px 2px 5px;
  font-size: 18px;
  margin-top: 20px;
}

.icon {
  color: rgb(65, 146, 65);
  margin-right: 30px;
}

.info {
  margin-left: 50px;
  border-bottom: 1px solid #ccc;
}
</style>
