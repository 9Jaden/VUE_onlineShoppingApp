<template>
  <div>
    <HeadIndex></HeadIndex>
    <!-- 插入路由组件出口的地方 -->
    <Router-view></Router-view>
    <!-- 利用v-show或v-if决定组件是否显示，利用判断条件获得布尔值真或假-->
    <!-- 可以根据组件身上的$route获取路由信息 $route.path === './home' -->
    <!-- 最好利用路由元信息 -->
    <FooterIndex v-show="$route.meta.show === true"></FooterIndex>
  </div>
</template>

<script>
import HeadIndex from "@/components/Header/HeadIndex.vue";
import FooterIndex from "@/components/Footer/FooterIndex.vue";
export default {
  //   记得注册
  components: { HeadIndex, FooterIndex },
  mounted() {
    // 通知vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch("getCategory");
  },
};
</script>

<style lang="scss" scoped></style>
