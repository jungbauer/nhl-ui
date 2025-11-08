<script setup>
import GoalsHomeAway from "@/components/game/GoalsHomeAway.vue";

const props = defineProps(["allGoals", "homeTeamId", "awayTeamId"]);

const periodSplit = ref(false);
const displayTimeRemaining = ref(true);

const homeGoals = ref([]);
const awayGoals = ref([]);
const p1Goals = ref({all: [], home: [], away:[]});
const p2Goals = ref({all: [], home: [], away:[]});
const p3Goals = ref({all: [], home: [], away:[]});
const overtimeGoals = ref({all: [], home: [], away:[]});
const shootoutGoals = ref({all: [], home: [], away:[]});

// todo this will break in playoffs, there are no shootouts, need to make shootout more clear, maybe make a periods array of arrays
// todo NB if there is a shootout, there were no goals in overtime.

// todo make a computed string for time switch label; Time: Remaining -- Time: Clock

onMounted(() => {
  // split goals
  props.allGoals.forEach((goal) => {
    const isHomeTeam = goal.details.eventOwnerTeamId === props.homeTeamId;
    // home and away
    if (isHomeTeam) {
      homeGoals.value.push(goal);
    } else {
      awayGoals.value.push(goal);
    }

    // period goals
    if (goal.periodDescriptor.number === 1) {
      p1Goals.value.all.push(goal);
      if (isHomeTeam) {
        p1Goals.value.home.push(goal);
      } else {
        p1Goals.value.away.push(goal);
      }
    } else if (goal.periodDescriptor.number === 2) {
      p2Goals.value.all.push(goal);
      if (isHomeTeam) {
        p2Goals.value.home.push(goal);
      } else {
        p2Goals.value.away.push(goal);
      }
    } else if (goal.periodDescriptor.number === 3) {
      p3Goals.value.all.push(goal);
      if (isHomeTeam) {
        p3Goals.value.home.push(goal);
      } else {
        p3Goals.value.away.push(goal);
      }
    } else if (goal.periodDescriptor.number === 4) {
      // overtime
      overtimeGoals.value.all.push(goal);
      if (isHomeTeam) {
        overtimeGoals.value.home.push(goal);
      } else {
        overtimeGoals.value.away.push(goal);
      }
    } else if (goal.periodDescriptor.number === 5) {
      // shootout
      shootoutGoals.value.all.push(goal);
      if (isHomeTeam) {
        shootoutGoals.value.home.push(goal);
      } else {
        shootoutGoals.value.away.push(goal);
      }
    }
  });
});
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
  <v-switch
    v-model="displayTimeRemaining"
    color="primary"
    :label="`Time: ${displayTimeRemaining.toString()}`"
    hide-details
    inset
  />
  <v-divider />
  <GoalsHomeAway v-show="!periodSplit" :keyBase="'f'" :homeGoals="homeGoals" :awayGoals="awayGoals" />

  <div v-show="periodSplit">
    <div>
      <div>P1</div>
      <GoalsHomeAway :keyBase="'p1g'" :homeGoals="p1Goals.home" :awayGoals="p1Goals.away" />
    </div>
    <v-divider />
    <div>
      <div>P2</div>
      <GoalsHomeAway :keyBase="'p2g'" :homeGoals="p2Goals.home" :awayGoals="p2Goals.away" />
    </div>
    <v-divider />
    <div>
      <div>P3</div>
      <GoalsHomeAway :keyBase="'p3g'" :homeGoals="p3Goals.home" :awayGoals="p3Goals.away" />
    </div>
    <div v-if="overtimeGoals.all.length > 0">
      <div>Overtime</div>
      <GoalsHomeAway :keyBase="'otg'" :homeGoals="overtimeGoals.home" :awayGoals="overtimeGoals.away" />
    </div>
    <div v-if="shootoutGoals.all.length > 0">
      <v-divider />
      <div>Shootout</div>
      <GoalsHomeAway :keyBase="'shg'" :homeGoals="shootoutGoals.home" :awayGoals="shootoutGoals.away" />
    </div>
  </div>
</template>

<style scoped lang="sass">
</style>
