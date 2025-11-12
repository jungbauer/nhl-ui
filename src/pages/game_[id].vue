<script setup>
  import GameView from "@/components/game/GameView.vue";

  const route = useRoute();
  const gameId = route.params.id;
</script>

<template>
  <GameView :game-id="gameId" />
</template>

<style scoped lang="sass">

</style>
