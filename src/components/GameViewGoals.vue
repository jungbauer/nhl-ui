<script setup>
const props = defineProps(["allGoals", "homeTeamId", "awayTeamId"]);

const periodSplit = ref(false);
const homeGoals = ref([]);
const awayGoals = ref([]);
const p1Goals = ref({all: [], home: [], away:[]});
const p2Goals = ref({all: [], home: [], away:[]});
const p3Goals = ref({all: [], home: [], away:[]});
const overtimeGoals = ref({all: [], home: [], away:[]});
const shootoutGoals = ref({all: [], home: [], away:[]});

// todo this will break in playoffs, there are no shootouts, need to make shootout more clear, maybe make a periods array of arrays
// todo NB if there is a shootout, there were no goals in overtime.

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
  <v-divider />
  <div v-show="!periodSplit" class="all-goals">
    <div class="home-goals">
      <div v-for="(goal, i) in homeGoals" :key="'hg' + i">
        {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
        {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
        <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
      </div>
    </div>
    <v-divider vertical></v-divider>
    <div class="away-goals">
      <div v-for="(goal, i) in awayGoals" :key="'ag' + i">
        {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
        {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
        <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
      </div>
    </div>
  </div>

  <div v-show="periodSplit">
    <div>
      <div>P1</div>
      <div class="all-goals">
        <div class="home-goals">
          <div v-for="(goal, i) in p1Goals.home" :key="'p1hg' + i">
            {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
            {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
            <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
          </div>
        </div>
        <v-divider vertical></v-divider>
        <div class="away-goals">
          <div v-for="(goal, i) in p1Goals.away" :key="'p1ag' + i">
            {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
            {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
            <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
          </div>
        </div>
      </div>
    </div>
    <v-divider />
    <div>
      <div>P2</div>
      <div class="all-goals">
        <div class="home-goals">
          <div v-for="(goal, i) in p2Goals.home" :key="'p1hg' + i">
            {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
            {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
            <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
          </div>
        </div>
        <v-divider vertical></v-divider>
        <div class="away-goals">
          <div v-for="(goal, i) in p2Goals.away" :key="'p1ag' + i">
            {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
            {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
            <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
          </div>
        </div>
      </div>
    </div>
    <v-divider />
    <div>
      <div>P3</div>
      <div class="all-goals">
        <div class="home-goals">
          <div v-for="(goal, i) in p3Goals.home" :key="'p1hg' + i">
            {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
            {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
            <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
          </div>
        </div>
        <v-divider vertical></v-divider>
        <div class="away-goals">
          <div v-for="(goal, i) in p3Goals.away" :key="'p1ag' + i">
            {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
            {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
            <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="overtimeGoals.all.length > 0">
      <div>Overtime</div>
      <div class="all-goals">
        <div class="home-goals">
          <div v-for="(goal, i) in overtimeGoals.home" :key="'p1hg' + i">
            {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
            {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
            <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
          </div>
        </div>
        <v-divider vertical></v-divider>
        <div class="away-goals">
          <div v-for="(goal, i) in overtimeGoals.away" :key="'p1ag' + i">
            {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
            {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
            <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="shootoutGoals.all.length > 0">
      <v-divider />
      <div>Shootout</div>
      <div class="all-goals">
        <div class="home-goals">
          <div v-for="(goal, i) in shootoutGoals.home" :key="'p1hg' + i">
            {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
            {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
            <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
          </div>
        </div>
        <v-divider vertical></v-divider>
        <div class="away-goals">
          <div v-for="(goal, i) in shootoutGoals.away" :key="'p1ag' + i">
            {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
            {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
            <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.all-goals
  display: grid
  grid-template-columns: 45% 10% 45%
  justify-content: center
  justify-items: center

.headshot
  width: 100px
  height: 100px
  object-fit: contain
</style>
