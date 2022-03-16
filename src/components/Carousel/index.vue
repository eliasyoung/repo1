<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in carouselData"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "CarouselComponent",
  props: {
    initInWatch: {
      type: Boolean,
      default: false,
      required: false,
    },
    carouselData: {
      type: Array,
      required: true,
    },
  },
  watch: {
    carouselData: {
      handler(oldV, newV) {
        if (this.initInWatch) {
          this.$nextTick(() => {
            const swiper = new Swiper(this.$refs.mySwiper, {
              // configure Swiper to use modules
              loop: true,

              autoplay: {
                delay: 3000,
                disableOnInteraction: false,
              },

              // If we need pagination
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
              },

              // Navigation arrows
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });
            return [swiper, oldV, newV];
          });
        }
      },
    },
  },
  mounted() {
    if (!this.initInWatch) {
      const swiper = new Swiper(this.$refs.mySwiper, {
        // configure Swiper to use modules
        loop: true,

        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },

        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      return swiper;
    }
  },
};
</script>

<style></style>
