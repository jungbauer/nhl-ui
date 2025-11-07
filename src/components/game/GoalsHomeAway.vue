<script setup>
defineProps(["keyBase", "homeGoals", "awayGoals"]);
</script>

<template>
  <div class="goals">
    <div class="home-goals">
      <div v-for="(goal, i) in homeGoals" :key="'h' + keyBase + i">
        {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
        {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
        <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
      </div>
    </div>
    <v-divider vertical></v-divider>
    <div class="away-goals">
      <div v-for="(goal, i) in awayGoals" :key="'a' + keyBase + i">
        {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
        {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
        <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.goals
  display: grid
  grid-template-columns: 45% 10% 45%
  justify-content: center
  justify-items: center

.headshot
  width: 100px
  height: 100px
  object-fit: contain
</style>
