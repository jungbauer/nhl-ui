<script setup>
  import drawRink2 from "@/utils/drawRink2.js";
  import goalDraw from "@/utils/goalDraw.js";

  const props = defineProps(["goals", "sog"]);
  const [drawRink, lengthToWidthRatio] = drawRink2();
  const [drawGoals] = goalDraw();

  const elementRef = ref(null);
  const elementRef2 = ref(null);

  const displaySog = ref(false);
  provide("displaySog", displaySog);

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

    elementRef.value.style.height = canvas.height.toString() + "px";
    elementRef2.value.style.width = canvas.width.toString() + "px";

    canvas.style.borderRadius = borderRadius.toString() + "px";
    drawRink(canvas, portraitDraw);

    // -----------------------------------------------------------------------------------------
    const goalsCanvas = document.querySelector("#goals");
    goalsCanvas.width = canvas.width;
    goalsCanvas.height = canvas.height;
    goalsCanvas.style.borderRadius = borderRadius.toString() + "px";
    drawGoals(goalsCanvas, props.goals, portraitDraw, "#9109df");

    // -----------------------------------------------------------------------------------------
    const sogCanvas = document.querySelector("#sog");
    sogCanvas.width = canvas.width;
    sogCanvas.height = canvas.height;
    sogCanvas.style.borderRadius = borderRadius.toString() + "px";
    drawGoals(sogCanvas, props.sog, portraitDraw, "#092ddf");
  });
</script>

<template>
  <v-switch
    v-model="displaySog"
    color="primary"
    hide-details
    inset
    label="display shots-on-goal"
  />
  <div id="rink-container" ref="elementRef">
    <div ref="elementRef2" class="rink-container2">
      <canvas id="rink" />
      <canvas id="goals" />
      <canvas v-show="displaySog" id="sog" />
    </div>
  </div>
</template>

<style scoped lang="sass">
#rink-container
  display: flex
  justify-content: center
  margin-top: 30px

.rink-container2
  position: relative

.rink-container2 canvas
  position: absolute
  top: 0
  left: 0

#rink
  z-index: 1
  background: #fff
  border: 1px solid #333
  box-shadow: 0 0 10px #aaa

#goals
  z-index: 3
  background: rgb(255 255 255 / 0)
  border: none
  box-shadow: none

#sog
  z-index: 2
  background: rgb(255 255 255 / 0)
  border: none
  box-shadow: none

</style>
