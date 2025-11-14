<script setup>
  import { useStandingsStore } from "@/stores/standings.js";

  const standingsDisplay = ref("League");
  const displayItems = ["League", "Conference", "Division"];

  const westernConference = ref([]);
  const easternConference = ref([]);
  const atlanticDivision = ref([]);
  const metropolitanDivision = ref([]);
  const centralDivision = ref([]);
  const pacificDivision = ref([]);

  const standingsStore = useStandingsStore();

  onMounted(async () => {
    // make sure there's stuff in the store
    if (standingsStore.standings.length === 0) {
      await standingsStore.refreshStandings();
    }

    westernConference.value = standingsStore.standings.filter((team) => team.conference === "Western");
    easternConference.value = standingsStore.standings.filter((team) => team.conference === "Eastern");

    atlanticDivision.value = standingsStore.standings.filter((team) => team.division === "Atlantic");
    metropolitanDivision.value = standingsStore.standings.filter((team) => team.division === "Metropolitan");
    centralDivision.value = standingsStore.standings.filter((team) => team.division === "Central");
    pacificDivision.value = standingsStore.standings.filter((team) => team.division === "Pacific");
  });
</script>

<template>
  <v-container class="d-flex justify-center w-75">
    <v-sheet class="w-100" :elevation="1" rounded>
      <v-select
        v-model="standingsDisplay"
        :items="displayItems"
        label="Select"
        :width="200"
      />

      <div v-if="standingsDisplay === 'League'" class="flex-container">
        <div class="flex-items">
          <div><h1>League Standings</h1></div>
          <StandingsTeam v-for="(team, i) in standingsStore.standings" :key="'l' + i" :team="team" />
        </div>
      </div>

      <div v-if="standingsDisplay === 'Conference'" class="flex-container-conference">
        <div class="flex-items-conference">
          <div><h1>Western Standings</h1></div>
          <StandingsTeam v-for="(team, i) in westernConference" :key="'wc' + i" :team="team" />
        </div>
        <div class="flex-items-conference">
          <div><h1>Eastern Standings</h1></div>
          <StandingsTeam v-for="(team, i) in easternConference" :key="'wc' + i" :team="team" />
        </div>
      </div>

      <div v-if="standingsDisplay === 'Division'" class="flex-container-divisions">
        <div class="flex-items">
          <h1>Central</h1>
          <StandingsTeam v-for="(team, i) in centralDivision" :key="'cd' + i" :team="team" />
        </div>
        <div class="flex-items">
          <h1>Atlantic</h1>
          <StandingsTeam v-for="(team, i) in atlanticDivision" :key="'ad' + i" :team="team" />
        </div>
        <div class="flex-items">
          <h1>Pacific</h1>
          <StandingsTeam v-for="(team, i) in pacificDivision" :key="'pd' + i" :team="team" />
        </div>
        <div class="flex-items">
          <h1>Metropolitan</h1>
          <StandingsTeam v-for="(team, i) in metropolitanDivision" :key="'md' + i" :team="team" />
        </div>
      </div>

    </v-sheet>
  </v-container>
</template>

<style scoped lang="sass">
.flex-container
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: center
  align-items: center
  align-content: normal

.flex-items
  display: block
  flex-grow: 0
  flex-shrink: 1
  flex-basis: auto
  align-self: auto
  order: 0

.flex-container-conference
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: space-evenly
  align-items: normal
  align-content: normal
  column-gap: 10px
  row-gap: 15px

.flex-items-conference
  display: block
  flex-grow: 0
  flex-shrink: 1
  flex-basis: auto
  align-self: auto
  order: 0

.flex-container-divisions
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: space-evenly
  align-items: normal
  align-content: normal
  column-gap: 10px
  row-gap: 15px

</style>
