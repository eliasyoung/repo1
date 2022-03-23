<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="menuLeaveHandler" @mouseenter="showTripMenu">
        <h2 class="all">全部商品分类</h2>
        <transition name="tripMenuAnim">
          <div class="sort" v-show="showMenu" @click.prevent="searchSth">
            <div class="all-sort-list2">
              <!-- :style="{
              background: index === currentFirstNavIndex ? 'skyblue' : 'white',
            }" -->
              <div
                class="item"
                v-for="(firstItem, index) in categoryList"
                :key="firstItem.categoryId"
                :class="{ cur: index === currentFirstNavIndex }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="firstItem.categoryName"
                    :data-category1Id="firstItem.categoryId"
                    href=""
                    >{{ firstItem.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  v-show="index == currentFirstNavIndex"
                >
                  <div
                    class="subitem"
                    v-for="secondItem in firstItem.categoryChild"
                    :key="secondItem.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="secondItem.categoryName"
                          :data-category2Id="secondItem.categoryId"
                          href=""
                          >{{ secondItem.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="thirdItem in secondItem.categoryChild"
                          :key="thirdItem.categoryId"
                        >
                          <a
                            :data-categoryName="thirdItem.categoryName"
                            :data-category3Id="thirdItem.categoryId"
                            href=""
                            >{{ thirdItem.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TripMenu",
  data() {
    return {
      currentFirstNavIndex: -1,
      showMenu: true,
    };
  },
  computed: {
    /* categoryList() {
      return this.$store.state.home.baseCategoryList;
    }, */
    /* ...mapState({
      categoryList: (state) => state.home.baseCategoryList,
    }), */
    /* ...mapState('home',['baseCategoryList']) */
    ...mapState("home", { categoryList: "baseCategoryList" }),
  },
  methods: {
    /* changeIndex(value) {
        this.currentFirstNavIndex = value;
    }, */
    changeIndex: throttle(function (value) {
      this.currentFirstNavIndex = value;
    }, 60),
    searchSth(e) {
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      const target = { name: "search", query: { categoryName: categoryname } };
      if (categoryname) {
        if (category1id) {
          target.query.category1Id = category1id;
        } else if (category2id) {
          target.query.category2Id = category2id;
        } else {
          target.query.category3Id = category3id;
        }
        if (JSON.stringify(this.$route.params) != "{}")
          target.params = this.$route.params;
        this.$router.push(target);
      }
    },
    menuLeaveHandler() {
      this.currentFirstNavIndex = -1;
      // if (this.$route.path === "/search") this.showMenu = false;
      if (this.$route.name === "search" || this.$route.name === "detail")
        this.showMenu = false;
    },
    showTripMenu() {
      this.showMenu = true;
    },
  },
  mounted() {
    // if (this.$store.state.home.baseCategoryList.length == 0) {
    //   this.$store.dispatch("home/getBaseCategoryList");
    // }
    if (this.$route.name === "search") this.showMenu = false;
  },
};

function throttle(func, delay) {
  let valid = true;
  return function () {
    if (!valid) {
      //休息时间 暂不接客
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    func.apply(this, arguments);
    setTimeout(() => {
      valid = true;
    }, delay);
  };
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: auto;
      max-height: 10000px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .cur {
          background: skyblue;
        }

        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 100%;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /*           &:hover {
            .item-list {
              display: block;
            }
          } */
        }
      }
    }

    .tripMenuAnim-enter,
    .tripMenuAnim-leave-to {
      max-height: 0px;
      & > div {
        opacity: 0;
      }
    }

    .tripMenuAnim-enter-to,
    .tripMenuAnim-leave {
      & > div {
        opacity: 100%;
      }
    }

    .tripMenuAnim-enter-active {
      transition: max-height 0.5s ease-in-out;
      & > div {
        transition: opacity 0.5s ease-in-out;
      }
    }

    .tripMenuAnim-leave-active {
      transition: max-height 0.5s ease-in-out;
      & > div {
        transition: opacity 0.5s ease-in-out;
      }
    }
  }
}
</style>
