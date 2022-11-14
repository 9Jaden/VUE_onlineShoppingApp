<template>
  <div>
    <!-- 三级联动全局组件，三级联动已经注册为全局组件，因此不需要再引入 -->
    <NavIndex />
    <ListContainer />
    <DailyRecommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from "@/pages/Home/ListContainer/ListIndex.vue";
import DailyRecommend from "@/pages/Home/Recommend/DailyRecommend.vue";
import Rank from "@/pages/Home/Rank/Rank.vue";
import Like from "@/pages/Home/Like/Like.vue";
import Floor from "@/pages/Home/Floor/Floor.vue";
import Brand from "@/pages/Home/Brand/Brand.vue";

import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  components: { ListContainer, DailyRecommend, Rank, Like, Floor, Brand },
  computed: {
    ...mapState({ floorList: (state) => state.home.floorList }),
  },
  // 在home路由组件发floor数据请求这样来遍历得到两个floor，因为floor的json文件由两个数组组成
  mounted() {
    this.$store.dispatch("getFloorList");
  },
};
</script>

<style lang="scss" scoped></style>