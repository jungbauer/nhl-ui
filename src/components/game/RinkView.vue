<script setup>
  import useRinkDraw from "@/utils/useRinkDraw.js";

  const props = defineProps({
    goals: { type: Array, default: () => [] },
    events: { type: Array, default: () => [] },
  });

  const { drawRinkBackground, drawMarkers, lengthToWidthRatio } = useRinkDraw();

  const elementRef = ref(null);
  const backgroundCanvasRef = ref(null);
  const foregroundCanvasRef = ref(null);
  const displayMode = ref("goals"); // 'goals' or 'events'
  const rinkContext = ref(null);
  const portraitDraw = ref(false);

  function setupCanvasDimensions() {
    const bgCanvas = backgroundCanvasRef.value;
    const fgCanvas = foregroundCanvasRef.value;

    let isPortrait = false;
    let width = 1000;
    let height = width / lengthToWidthRatio();
    let radius = width * 0.14;

    if (elementRef.value.offsetWidth < 1000) {
      isPortrait = true;
      if (elementRef.value.offsetWidth >= 425) {
        height = 1000;
        width = height / lengthToWidthRatio();
      } else {
        width = elementRef.value.offsetWidth;
        height = width * lengthToWidthRatio();
      }
      radius = height * 0.14;
    }

    bgCanvas.width = width;
    bgCanvas.height = height;
    fgCanvas.width = width;
    fgCanvas.height = height;

    portraitDraw.value = isPortrait;

    bgCanvas.style.borderRadius = radius.toString() + "px";
    fgCanvas.style.borderRadius = radius.toString() + "px";
  }

  function drawCurrentMarkers(resize = false) {
    if (!foregroundCanvasRef.value || !rinkContext.value) return;

    const items = displayMode.value === "goals" ? props.goals : props.events;
    const options = displayMode.value === "goals"
      ? { color: "#9109df", radius: 2, showNumbers: true }
      : { color: "#ff6b35", radius: 2.5, showNumbers: true };

    drawMarkers(foregroundCanvasRef.value, items, portraitDraw.value, rinkContext.value, resize, options);
  }

  function drawWatchMarkers() {
    // wrapping method because watchers insert an event for resize, I need a boolean.
    drawCurrentMarkers();
  }

  function initCanvases() {
    setupCanvasDimensions();

    // Draw static background (rink lines) - only once
    rinkContext.value = drawRinkBackground(backgroundCanvasRef.value, portraitDraw.value);

    // Draw initial markers
    drawCurrentMarkers(true);
  }

  function handleResize() {
    // Re-initialize canvases on resize
    initCanvases();
  }

  onMounted(() => {
    initCanvases();
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  // Watch for prop changes and redraw markers
  watch(() => props.goals, drawWatchMarkers, { deep: true });
  watch(() => props.events, drawWatchMarkers, { deep: true });
  watch(displayMode, drawWatchMarkers);
</script>

<template>
  <div class="toggle-container">
    <v-btn-toggle v-model="displayMode" density="compact" mandatory>
      <v-btn text="Goals" value="goals" />
      <v-btn text="Events" value="events" />
    </v-btn-toggle>
  </div>
  <div id="rink-container" ref="elementRef">
    <div style="position: relative">
      <canvas id="rink-background" ref="backgroundCanvasRef" />
      <canvas id="rink-foreground" ref="foregroundCanvasRef" />
    </div>
  </div>
</template>

<style scoped lang="sass">

.toggle-container
  margin-bottom: 16px

#rink-container
  position: relative
  display: flex
  justify-content: center
  overflow: hidden

#rink-background
  background: #fff
  border: 1px solid #333
  box-shadow: 0 0 10px #aaa

#rink-foreground
  position: absolute
  top: 0
  left: 0
  background: transparent
  pointer-events: none
  border: 1px solid transparent
</style>
