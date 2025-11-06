<script setup>
const props = defineProps(["homeGoals", "awayGoals"]);

const periodSplit =ref(false);
</script>

<template>
  Goals
  <v-switch
    v-model="periodSplit"
    color="primary"
    :label="`Split by period: ${periodSplit.toString()}`"
    hide-details
    inset
  ></v-switch>
  <hr />
  <div class="goals">
    <div class="home-goals">
      <div v-for="(goal, i) in homeGoals" :key="'hg' + i">
        {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
        {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
        <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
      </div>
    </div>
    <div></div>
    <div class="away-goals">
      <div v-for="(goal, i) in awayGoals" :key="'ag' + i">
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
  grid-template-columns: auto 50px auto
  justify-content: center

.headshot
  width: 100px
  height: 100px
  object-fit: contain
</style>
