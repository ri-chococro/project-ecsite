<template>
  <div class="item-list">
    <div class="contaner">
      <!-- search form -->
      <div class="search-wrapper">
        <div class="container">
          <form class="search-form">
            <div class="searchError">
              {{ searchNameMessage }}
            </div>
            <label for="SearchText" class="hide-label">キーワード検索</label>
            <input
              id="SearchText"
              type="search"
              v-model="searchName"
              placeholder="検索キーワードを入力"
              autocomplete="on"
              list="hawaii"
            />
            <datalist id="hawaii">
              <div v-for="item of itemList" v-bind:key="item.id">
                <option v-bind:value="item.name"></option>
              </div>
            </datalist>
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
        <img src="/img_aloha/ukiwa1.png" class="ukiwa" />
        <img src="/img_aloha/2216833.png" class="island" />
        <img src="/img_aloha/umigame.png" class="umigame" />
        <div class="container">
          <h1 class="menu-title">Menu <span>🌺</span></h1>
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
                <router-link :to="'/itemDetail/' + item.id">
                  <img v-bind:src="item.imagePath"
                /></router-link>
              </div>
              <router-link :to="'/itemDetail/' + item.id">{{
                item.name
              }}</router-link>
              <br />
              <span class="price">Ｍ</span
              >{{ item.priceM.toLocaleString() }}円(税抜)<br />
              <span class="price">Ｌ</span
              >{{ item.priceL.toLocaleString() }}円(税抜)<br />
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
    } else {
      this.searchNameMessage = "";
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
@import url("https://fonts.googleapis.com/css2?family=Rampart+One&family=Yellowtail&display=swap");

.searchError {
  color: #ff4500;
}
.search-wrapper {
  padding: 60px 0 20px 0; /*上はヘッダが来るのでその分180px分空ける*/
  margin-top: -40px;
  position: fixed; /* スクロールしても表示されるように位置を固定 */
  height: 200px;
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
  background-image: url("/img_aloha/lightblue_00115.jpg");
  background-size: cover;
  text-align: center;
  position: relative;
}

.menu-title {
  font-family: "Anton", sans-serif;
  font-family: "Rampart One", cursive;
  font-family: "Yellowtail", cursive;
  position: relative;
  top: 180px;
  margin: 0;
  display: inline-block;
  padding: 0 65px;
  text-align: center;
}

.menu-title:before,
.menu-title:after {
  position: absolute;
  top: calc(50% - 3px);
  width: 50px;
  height: 6px;
  content: '';
  border-top: solid 2px #000;
  border-bottom: solid 2px #000;
}

.menu-title:before {
  left: 0;
}

.menu-title:after {
  right: 0;
}

.menu-title span {
  font-size: 50px;
}

.ukiwa {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 170px;
  right: 15px;
}

.umigame {
  width: 250px;
  height: 250px;
  position: absolute;
  top: 350px;
  left: 15px;
}

.island {
  width: 180px;
  height: 180px;
  position: absolute;
  top: 520px;
  right: 90px;
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
  transition: 0.3s ease-in-out;
}

.item-icon:hover img {
  opacity: 0.8;
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
