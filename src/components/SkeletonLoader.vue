<template>
  <div class="container">
    <div class="title">
      <vue-skeleton-loader :width="400" :height="50" animation="fade" />
    </div>
    <div class="item-detail">
      <div>
        <vue-skeleton-loader
          :width="250"
          :height="250"
          animation="fade"
          rounded
          :radius="20"
        />
      </div>
      <div class="item-intro">
        <vue-skeleton-loader :width="350" :height="24" animation="fade" />
        <vue-skeleton-loader :width="350" :height="24" animation="fade" />
        <vue-skeleton-loader :width="350" :height="24" animation="fade" />
        <vue-skeleton-loader :width="350" :height="24" animation="fade" />
        <vue-skeleton-loader :width="350" :height="24" animation="fade" />
        <vue-skeleton-loader :width="350" :height="24" animation="fade" />
      </div>
    </div>
    <div>
      <div class="item-size">
        <vue-skeleton-loader :width="300" :height="30" animation="fade" />
      </div>
      <div class="row item-toppings">
        <div class="item-topping">
          <vue-skeleton-loader :width="350" :height="20" animation="fade" />
          <vue-skeleton-loader :width="650" :height="20" animation="fade" />
          <vue-skeleton-loader :width="680" :height="20" animation="fade" />
          <vue-skeleton-loader :width="620" :height="20" animation="fade" />
          <vue-skeleton-loader :width="700" :height="20" animation="fade" />
        </div>
      </div>
      <div class="row">
        <div class="item-hedding item-hedding-quantity">数量</div>
        <div class="item-quantity-selectbox">
          <div class="input-field col s12">
            <select class="browser-default">
              <option value="1" selected disabled>1</option>
              <option value="">選択して下さい</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="row item-total-price">
      <span>この商品金額：</span>
      <vue-skeleton-loader :width="160" :height="50" animation="fade" />円(税抜)
    </div>

    <div class="row item-cart-btn">
      <button class="btn" type="button">
        <span>カートに入れる</span>
      </button>
    </div>
  </div>
</template>

<script>
import VueSkeletonLoader from "skeleton-loader-vue";
export default {
  components: { VueSkeletonLoader },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.title {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
}

.item-detail {
  display: flex;
  /* 中央揃え */
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.item-intro {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 20px;
}

.item-hedding {
  font-weight: bold;
  font-size: 17px;
  text-align: left;
}
.item-size {
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 200px 0 200px;
}
.item-topping {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-toppings {
  padding: 0 200px 0 200px;
}

.item-topping {
  margin-right: 10px;
}

.item-hedding-quantity {
  margin-left: 200px;
}

.item-quantity-selectbox {
  padding: 0 300px 0 300px;
}

.item-total-price {
  font-size: 35px;
  display: flex;
}

.item-cart-btn {
  text-align: center;
}
</style>
