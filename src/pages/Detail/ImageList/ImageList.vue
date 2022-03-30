<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(imageObj, index) in imageList"
        :key="imageObj.id"
        @click="changeCurrentImage(index)"
      >
        <img
          :src="imageObj.imgUrl"
          :class="{ active: index == currentIndex }"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["imageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    imageList: {
      handler(newV, oldV) {
        this.$nextTick(() => {
          const swiper = new Swiper(this.$refs.mySwiper, {
            // configure Swiper to use modules

            // autoplay: {
            //   delay: 3000,
            //   disableOnInteraction: false,
            // },

            // If we need pagination

            // Navigation arrows
            slidesPerView: 7,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
          return [swiper, newV, oldV];
        });
      },
    },
  },
  methods: {
    changeCurrentImage(index) {
      this.currentIndex = index;
      this.$bus.$emit("changeCurrentImage", index);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
