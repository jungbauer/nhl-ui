<script setup>
defineProps(["goal"])
</script>

<template>
  <div class="goal">
    <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
    <div>
      {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
      {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
    </div>
  </div>
</template>

<style scoped lang="sass">
.headshot
  width: 100px
  height: 100px
  object-fit: contain

.goal
  display: grid
  grid-template-columns: 100px auto
  grid-template-rows: 100px
  align-items: center
</style>
