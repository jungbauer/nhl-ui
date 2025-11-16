<script setup>
  import useRinkDraw from "@/utils/useRinkDraw.js";

  const props = defineProps(["goals"]);
  const [drawRink, lengthToWidthRatio] = useRinkDraw();

  const elementRef = ref(null);

  onMounted(() => {
    let portraitDraw = false;
    const canvas = document.querySelector("#rink");
    canvas.width = 1000;
    canvas.height = canvas.width / lengthToWidthRatio(); // 425px
    // 140px : 1000px => 0.14 : 1
    let borderRadius = canvas.width * 0.14;

    if (elementRef.value.offsetWidth < 1000) {
      portraitDraw = true;
      if (elementRef.value.offsetWidth >= 425) {
        canvas.height = 1000;
        canvas.width = canvas.height / lengthToWidthRatio(); // 425px
      } else {
        // screen width less than 425px reference
        canvas.width = elementRef.value.offsetWidth;
        canvas.height = canvas.width * lengthToWidthRatio();
      }
      borderRadius = canvas.height * 0.14;
    }

    canvas.style.borderRadius = borderRadius.toString() + "px";
    drawRink(canvas, props.goals, portraitDraw);
  });
</script>

<template>
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
