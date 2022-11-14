<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
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
// 有轮播图一定要记得引包
import Swiper from "swiper";
export default {
  name: "CarouselIndex",
  props: ["list"],
  watch: {
    // 监听不到list的变化，因为是直接传过来的
    // 监听不到变化则用immediate，无论变化与否立即监听
    list: {
      immediate: true,
      handler() {
        // immediate只能监听到数据有了，不能保证结构也渲染了，所以还是要用nextTick
        this.$nextTick(() => {
          new Swiper(this.$refs.cur, {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小球时也可以切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style></style>
