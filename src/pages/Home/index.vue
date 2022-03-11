<template>
  <div>
    <TripMenu />
    <ListContainer />
    <TodayRecommend />
    <HomeRank />
    <GuessYouLike />
    <FloorComponent />
    <FloorComponent />
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

export default {
  name: "AppHome",
  components: {
    ListContainer,
    TodayRecommend,
    HomeRank,
    GuessYouLike,
    FloorComponent,
    BrandComponent,
  },
};
</script>

<style lang="less" scoped></style>
