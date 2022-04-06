<template>
  <div>
    <TripMenu />
    <ListContainer />
    <TodayRecommend />
    <HomeRank />
    <GuessYouLike />
    <FloorComponent
      v-for="singleFloorData in floorData"
      :key="singleFloorData.id"
      :fData="singleFloorData"
    />
    <BrandComponent />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import HomeRank from "@/pages/Home/Rank";
import GuessYouLike from "@/pages/Home/GuessYouLike";
import FloorComponent from "@/pages/Home/FloorComponent";
import BrandComponent from "@/pages/Home/BrandComponent";
import { mapState } from "vuex";

export default {
  name: "AppHome",
  computed: {
    ...mapState("home", ["floorData"]),
  },
  components: {
    ListContainer,
    TodayRecommend,
    HomeRank,
    GuessYouLike,
    FloorComponent,
    BrandComponent,
  },
  mounted() {
    this.$store.dispatch("home/getFloorData");
    if (localStorage.getItem("token"))
      this.$store.dispatch("user/getUserInfoByToken");
  },
};
</script>

<style lang="less" scoped></style>
