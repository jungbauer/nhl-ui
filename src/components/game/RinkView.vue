<script setup>
import {useDisplay} from "vuetify/framework";
import useRinkDraw from "@/utils/useRinkDraw.js";

const { mobile, name, height, width} = useDisplay();
const [drawRink, lengthToWidthRatio] = useRinkDraw()

const elementRef = ref(null);

onMounted(() => {
  // console.log("OnMounted rink")
  // // var widthMounted = this.$refs.rinkContiner.offsetWidth;
  // const testId = document.getElementById("rink-container");
  // const test2Id = document.getElementById("rink");
  //
  // console.log("testId", testId);
  // console.log("test2Id", test2Id);
  // console.log("testId offsetWidth", testId.offsetWidth);
  // console.log("test2Id offsetWidth", test2Id.offsetWidth);
  //
  // console.log("elementRef", elementRef.value.offsetWidth);

  const canvas = document.getElementById("rink");
  canvas.width = 1000;
  canvas.height = 425;
  // let testGoals = playData.value.goals.map((goal) => {
  //   return { xCoord: goal.details.xCoord, yCoord: goal.details.yCoord };
  // });
  drawRink(canvas, []);

  console.log("length ratio: ", lengthToWidthRatio());
  console.log("width for 1000L: ", 1000/lengthToWidthRatio());
});

const widthTest = computed(() => {
  return width.value;
});
</script>

<template>
  <div>wt: {{ widthTest }}</div>
  <div>udw: {{ width }}</div>
  <div v-if="elementRef">elw: {{ elementRef.offsetWidth }}</div>
  <div id="rink-container" ref="elementRef">
<!--    <canvas id="rink" width="1000" height="425"></canvas>-->
    <canvas id="rink"></canvas>
  </div>
</template>

<style scoped lang="sass">
#rink-container
  display: flex
  justify-content: center
  margin-top: 30px

canvas
  background: #fff
  border: 1px solid #333
  border-radius: 140px
  box-shadow: 0 0 10px #aaa
</style>
