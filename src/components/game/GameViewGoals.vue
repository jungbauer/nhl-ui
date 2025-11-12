<script setup>
  import GoalsHomeAway from "@/components/game/GoalsHomeAway.vue";

  const props = defineProps(["allGoals", "homeTeamId", "awayTeamId"]);

  const displayPeriodSplit = ref(false);
  const displayTimeRemaining = ref(true);

  provide("displayPeriodSplit", displayPeriodSplit);
  provide("displayTimeRemaining", displayTimeRemaining);

  const homeGoals = ref([]);
  const awayGoals = ref([]);
  const p1Goals = ref({ all: [], home: [], away: [] });
  const p2Goals = ref({ all: [], home: [], away: [] });
  const p3Goals = ref({ all: [], home: [], away: [] });
  const overtimeGoals = ref({ all: [], home: [], away: [] });
  const shootoutGoals = ref({ all: [], home: [], away: [] });

  // todo this will break in playoffs, there are no shootouts, need to make shootout more clear, maybe make a periods array of arrays
  // todo NB if there is a shootout, there were no goals in overtime.

  const timeSwitchText = computed(() => {
    return displayTimeRemaining.value ? "Remaining" : "Clock";
  });

  onMounted(() => {
    // split goals
    for (const goal of props.allGoals) {
      const isHomeTeam = goal.details.eventOwnerTeamId === props.homeTeamId;
      // home and away
      if (isHomeTeam) {
        homeGoals.value.push(goal);
      } else {
        awayGoals.value.push(goal);
      }

      // period goals
      switch (goal.periodDescriptor.number) {
        case 1: {
          p1Goals.value.all.push(goal);
          if (isHomeTeam) {
            p1Goals.value.home.push(goal);
          } else {
            p1Goals.value.away.push(goal);
          }
          break;
        }
        case 2: {
          p2Goals.value.all.push(goal);
          if (isHomeTeam) {
            p2Goals.value.home.push(goal);
          } else {
            p2Goals.value.away.push(goal);
          }
          break;
        }
        case 3: {
          p3Goals.value.all.push(goal);
          if (isHomeTeam) {
            p3Goals.value.home.push(goal);
          } else {
            p3Goals.value.away.push(goal);
          }
          break;
        }
        case 4: {
          // overtime
          overtimeGoals.value.all.push(goal);
          if (isHomeTeam) {
            overtimeGoals.value.home.push(goal);
          } else {
            overtimeGoals.value.away.push(goal);
          }
          break;
        }
        case 5: {
          // shootout
          shootoutGoals.value.all.push(goal);
          if (isHomeTeam) {
            shootoutGoals.value.home.push(goal);
          } else {
            shootoutGoals.value.away.push(goal);
          }
          break;
        }
      // No default
      }
    }
  });
</script>

<template>
  Goals
  <v-switch
    v-model="displayPeriodSplit"
    color="primary"
    hide-details
    inset
    label="Split by period"
  />
  <v-switch
    v-model="displayTimeRemaining"
    color="primary"
    hide-details
    inset
    :label="`Time: ${timeSwitchText}`"
  />
  <v-divider />
  <GoalsHomeAway v-show="!displayPeriodSplit" :away-goals="awayGoals" :home-goals="homeGoals" :key-base="'f'" />

  <div v-show="displayPeriodSplit">
    <div>
      <div>P1</div>
      <GoalsHomeAway :away-goals="p1Goals.away" :home-goals="p1Goals.home" :key-base="'p1g'" />
    </div>
    <v-divider />
    <div>
      <div>P2</div>
      <GoalsHomeAway :away-goals="p2Goals.away" :home-goals="p2Goals.home" :key-base="'p2g'" />
    </div>
    <v-divider />
    <div>
      <div>P3</div>
      <GoalsHomeAway :away-goals="p3Goals.away" :home-goals="p3Goals.home" :key-base="'p3g'" />
    </div>
    <div v-if="overtimeGoals.all.length > 0">
      <div>Overtime</div>
      <GoalsHomeAway :away-goals="overtimeGoals.away" :home-goals="overtimeGoals.home" :key-base="'otg'" />
    </div>
    <div v-if="shootoutGoals.all.length > 0">
      <v-divider />
      <div>Shootout</div>
      <GoalsHomeAway :away-goals="shootoutGoals.away" :home-goals="shootoutGoals.home" :key-base="'shg'" />
    </div>
  </div>
</template>

<style scoped lang="sass">
</style>
