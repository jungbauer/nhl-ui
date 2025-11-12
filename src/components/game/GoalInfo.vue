<script setup>
  const props = defineProps(["goal"]);

  const displayPeriodSplit = inject("displayPeriodSplit");
  const displayTimeRemaining = inject("displayTimeRemaining");
</script>

<template>
  <div class="goal">
    <img alt="headshot" class="headshot" :src="goal.scoringPlayer.headshot">
    <div>
      {{ goal.mainIndex + 1 }}. <span v-if="!displayPeriodSplit">P{{ goal.periodDescriptor.number }}</span>
      <span v-if="displayTimeRemaining">&nbsp;{{ goal.timeRemaining }}&nbsp;</span>
      <span v-else>&nbsp;{{ goal.timeInPeriod }}&nbsp;</span>
      - {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }} [{{ goal.scoringPlayer.sweaterNumber }}]
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
