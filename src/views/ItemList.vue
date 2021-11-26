<template>
  <div class="item-list">
    <div class="contaner">
      <!-- search form -->
      <div class="search-wrapper">
        <div class="container">
          <form method="post" class="search-form">
            {{ searchNameMessage }}
            <input
              type="text"
              name="name"
              class="search-name-input"
              v-model="searchName"
            />
            <button
              class="btn search-btn"
              type="button"
              v-on:click="onSearchClick"
            >
              <span>検索</span>
            </button>
          </form>
        </div>
      </div>

      <!-- item list -->
      <div class="item-wrapper">
        <div class="container">
          <!-- sort order -->
          <div class="sort-order">
            <form>
              <label for="sortOrderKinds">並び替え</label>
              <select
                v-model="sortOrderKinds"
                class="browser-default"
                v-on:change="changeSortOrder(sortOrderKinds)"
              >
                <option>安い順</option>
                <option>高い順</option>
                <option>おすすめ順</option>
              </select>
            </form>
          </div>
          <!-- end sort order -->
          <div class="items">
            <div class="item" v-for="item of itemList" v-bind:key="item.id">
              <div class="item-icon">
                <img v-bind:src="item.imagePath" />
              </div>
              <router-link :to="'/itemDetail/' + item.id">{{
                item.name
              }}</router-link>
              <br />
              <span class="price">Ｍ</span>{{ item.priceM }}円(税抜)<br />
              <span class="price">Ｌ</span>{{ item.priceL }}円(税抜)<br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Item } from "../types/item";
@Component
export default class ItemList extends Vue {
  //商品一覧
  public itemList: Array<Item> = [];
  //検索文字列
  public searchName = "";
  //検索エラーメッセージ
  public searchNameMessage = "";
  //絞り込み種類
  private sortOrderKinds = "安い順";

  /**
   * Vuexストアのアクション経由で非同期でWebAPIから従業員一覧を取得する.
   * @remarks
   * Vueインスタンスが生成されたタイミングで
   * Vuexストア内のアクションを呼ぶ(ディスパッチする)。
   * ライフサイクルフックのcreatedイベント利用。
   *
   * 取得してからゲットするため、async awaitを利用している。
   */
  async created(): Promise<void> {
    await this["$store"].dispatch("getItemList");

    this.itemList = this["$store"].getters.getAllItems;
  }
  /**
   * 商品一覧の数を返す.
   */
  get getItemCount(): number {
    return this.itemList.length;
  }
  /**
   * 曖昧検索をする.
   */
  onSearchClick(): void {
    this.itemList = this["$store"].getters.getSearchByName(this.searchName);
    // 検索されない場合は、メッセージを出して全件検索を行う
    if (this.itemList.length === 0 || this.searchName === "") {
      this.searchNameMessage = "1件もありませんでしたので、全件表示します";
      this.itemList = this["$store"].getters.getAllItems;
      this.searchName = "";
    }
  }
  /**
   * 並び替えを行う.
   */
  changeSortOrder(value: string): void {
    this.$store.commit("sortOrderByPrice", value);
  }
}
</script>

<style scoped>
.search-wrapper {
  padding: 20px 0 20px 0; /*上はヘッダが来るのでその分180px分空ける*/
  margin-top: -40px;
  /* text-align: center; */
  position: fixed; /* スクロールしても表示されるように位置を固定 */
  height: 150px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1; /* 上に表示されるようにする(数が多いほど上に来る。例えば-1にすると裏側に行き見えなくなります) */
}
.search-form {
  margin: auto; /*検索窓を中央に配置*/
  width: 40%;
  text-align: center;
}

.search-name-input {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  /* display: block; */
  width: 30%;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  font-family: inherit;
  margin: 0;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: start;
  appearance: auto;
  -webkit-rtl-ordering: logical;
  cursor: text;
}

.search-btn {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 15px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

.item-wrapper {
  padding-top: 10px; /* 上はヘッダや検索フォームが来るのでその分空ける */
  padding-bottom: 80px;
  background-color: #f7f7f7;
  text-align: center;
}

.items {
  display: flex;
  flex-wrap: wrap; /* 表示内容が多かった時に自動的に複数行に分割される */
  justify-content: center;
}

.item {
  flex: 0 0 320px; /* paddingやborder含むitem全体の横幅を320pxにする */
  padding: 20px;
}

.item-icon img {
  margin: auto;
  display: block;
  border-radius: 30px;
  width: 250px;
  height: 250px;
  padding: 0 0 15px 0;
}

/* サイズをオレンジ〇で囲む */
.price {
  background-color: #ff4500;
  border-radius: 50%; /* 角丸にする設定 */
}
.sort-order {
  padding-top: 150px;
  width: 180px;
  text-align: left;
}
</style>
