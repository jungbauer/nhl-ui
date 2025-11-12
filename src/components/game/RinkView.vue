<script setup>
  import { useDisplay } from "vuetify/framework";
  import useRinkDraw from "@/utils/useRinkDraw.js";

  const props = defineProps(["goals"]);

  const { mobile, name, height, width } = useDisplay();
  const [drawRink, lengthToWidthRatio] = useRinkDraw();

  const elementRef = ref(null);

  onMounted(() => {
    let portraitDraw = false;
    if (elementRef.value.offsetWidth < 1000) {
      console.log("elw:", elementRef.value.offsetWidth);
      portraitDraw = true;
    }

    const canvas = document.querySelector("#rink");
    canvas.width = 1000;
    canvas.height = canvas.width / lengthToWidthRatio();
    // 140px : 1000px => 0.14 : 1
    let borderRadius = canvas.width * 0.14;

    if (portraitDraw) {
      canvas.height = 1000;
      canvas.width = canvas.height / lengthToWidthRatio();
      borderRadius = canvas.height * 0.14;
    }

    canvas.style.borderRadius = borderRadius.toString() + "px";
    drawRink(canvas, props.goals, portraitDraw);
  });

  const widthTest = computed(() => {
    return width.value;
  });
</script>

<template>
  <div v-if="elementRef">elw: {{ elementRef.offsetWidth }}</div>
  <div id="rink-container" ref="elementRef">
    <canvas id="rink" />
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
  box-shadow: 0 0 10px #aaa
</style>
