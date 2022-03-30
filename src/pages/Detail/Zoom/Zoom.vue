<template>
  <div class="spec-preview">
    <img :src="imageList[currentImageIndex].imgUrl" />
    <div class="event" @mousemove.self="moveMask"></div>
    <div class="big">
      <img :src="imageList[currentImageIndex].imgUrl" ref="bigImage" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { throttle } from "@/utils";

export default {
  name: "ZoomComponent",
  props: ["imageList"],
  data() {
    return {
      currentImageIndex: 0,
    };
  },
  /* computed: {
    currentImageUrl() {
      return this.imageList[this.currentImageIndex].imgUrl;
    },
  }, */
  methods: {
    moveMask: throttle(function (event) {
      // console.log(event.offsetX, event.offsetY);
      // console.log(this.$refs.mask.offsetHeight, this.$refs.mask.offsetWidth);
      const { offsetWidth: maskWidth, offsetHeight: maskHeight } =
        this.$refs.mask;
      const {
        offsetX: x,
        offsetY: y,
        target: { offsetWidth: targetWidth, offsetHeight: targetHeight },
      } = event;
      this.$refs.mask.style.left = x - maskWidth / 2 + "px";
      this.$refs.mask.style.top = y - maskHeight / 2 + "px";
      if (x - maskWidth / 2 < 0) this.$refs.mask.style.left = 0;
      if (x + maskWidth / 2 > targetWidth)
        this.$refs.mask.style.left = targetWidth - maskWidth + "px";
      if (y - maskHeight / 2 < 0) this.$refs.mask.style.top = 0;
      if (y + maskHeight / 2 > targetHeight)
        this.$refs.mask.style.top = targetHeight - maskHeight + "px";
      this.$refs.bigImage.style.top = -this.$refs.mask.offsetTop * 2 + "px";
      this.$refs.bigImage.style.left = -this.$refs.mask.offsetLeft * 2 + "px";
    }, 50),
  },
  created() {
    this.$bus.$on("changeCurrentImage", (index) => {
      this.currentImageIndex = index;
    });
  },
  beforeDestroy() {
    this.$bus.$off("changeCurrentImage");
  },
};
</script>

<style lang="less" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
