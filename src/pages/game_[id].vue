<script setup>
import GameView from "@/components/GameView.vue";

const route = useRoute();
const gameId = route.params.id
</script>

<template>
  <GameView :gameId="gameId" />
</template>

<style scoped lang="sass">

</style>
