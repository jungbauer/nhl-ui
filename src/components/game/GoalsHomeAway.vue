<script setup>
  import GoalInfo from "@/components/game/GoalInfo.vue";

  defineProps(["keyBase", "homeGoals", "awayGoals"]);
</script>

<template>
  <div class="goals">
    <div class="home-goals">
      <GoalInfo v-for="(goal, i) in homeGoals" :key="'h' + keyBase + i" :goal="goal" />
    </div>
    <v-divider vertical />
    <div class="away-goals">
      <GoalInfo v-for="(goal, i) in awayGoals" :key="'a' + keyBase + i" :goal="goal" />
    </div>
  </div>
</template>

<style scoped lang="sass">
.goals
  display: grid
  grid-template-columns: 45% 10% 45%
  justify-content: center
  justify-items: center
</style>
