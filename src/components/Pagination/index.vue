<template>
  <div class="pagination">
    <button :disabled="currentPage == 1" @click="goPage(currentPage - 1)">
      上一页
    </button>
    <button :class="{ active: currentPage == 1 }" @click="goPage(1)">1</button>

    <button
      v-if="showPreButton"
      @click="goPage(currentPage - (pagerCount - 2))"
    >
      ···
    </button>
    <button
      v-for="(page, index) in pagerArray"
      :key="index"
      :class="{ active: currentPage == page }"
      @click="goPage(page)"
    >
      {{ page }}
    </button>

    <button
      v-if="showNextButton"
      @click="goPage(currentPage + (pagerCount - 2))"
    >
      ···
    </button>
    <button
      v-if="totalPages != 1"
      :class="{ active: currentPage == totalPages }"
      @click="goPage(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="currentPage == totalPages"
      @click="goPage(currentPage + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    currentPage: {
      type: Number,
      required: true,
      default: 1,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    pageCount: {
      type: Number,
      required: false,
    },
    pagerCount: {
      type: Number,
      required: false,
      validator(value) {
        return value > 4 && value < 22 && value % 2 == 1;
      },
      default: 7,
    },
  },
  computed: {
    showPreButton() {
      return this.currentPage - (this.pagerCount - 3) / 2 > 2;
    },
    showNextButton() {
      return this.currentPage + (this.pagerCount - 3) / 2 < this.totalPages - 1;
    },
    totalPages() {
      if (this.pageCount != undefined) return this.pageCount;
      else {
        return Math.ceil(this.total / this.pageSize);
      }
    },
    pagerArray() {
      let start = 2;
      let pagerArray = [];
      if (this.totalPages > this.pagerCount) {
        if (this.showPreButton && this.showNextButton) {
          start = this.currentPage - (this.pagerCount - 3) / 2;
        } else if (this.showPreButton && !this.showNextButton) {
          start = this.totalPages - (this.pagerCount - 2);
        }
        for (let i = 0; i < this.pagerCount - 2; i++) {
          pagerArray.push(start);
          start++;
        }
      } else {
        for (let i = 0; i < this.totalPages - 2; i++) {
          pagerArray.push(start);
          start++;
        }
      }

      return pagerArray;
    },
  },
  methods: {
    goPage(num) {
      if (num != this.currentPage) {
        if (num < 1) num = 1;
        if (num > this.totalPages) num = this.totalPages;
        this.$emit("changeCurrentPage", num);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
