<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />、
    <!-- 写事件专用div -->
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    // 全局事件总线获取索引值
    this.$bus.$on("getIndex", (index) => {
      this.currentIndex = index;
    });
  },
  methods: {
    // 放大镜！！重要
    handler(event) {
      let mask = this.$refs.mask;
      let leftDistance = event.offsetX - mask.offsetWidth / 2;
      let topDistance = event.offsetY - mask.offsetHeight / 2;
      // 放大部分
      let big = this.$refs.big;
      //约束在框内
      if (leftDistance < 0) {
        leftDistance = 0;
      }
      if (leftDistance > mask.offsetWidth) {
        leftDistance = mask.offsetWidth;
      }
      if (topDistance < 0) {
        topDistance = 0;
      }
      if (topDistance > mask.offsetHeight) {
        topDistance = mask.offsetHeight;
      }
      mask.style.left = leftDistance + "px";
      mask.style.top = topDistance + "px";
      // 放大应该是两倍关系
      big.style.left = -2 * leftDistance + "px";
      big.style.top = -2 * topDistance + "px";
    },
  },
};
</script>

<style lang="less">
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
