<script setup>
import useFetch from "@/utils/useFetch.js";

const standingsDisplay = ref("League");
const displayItems = ["League", "Conference", "Division"];

const teams = ref([]);
const westernConference = ref([]);
const easternConference = ref([]);
const atlanticDivision = ref([]);
const metropolitanDivision = ref([]);
const centralDivision = ref([]);
const pacificDivision = ref([]);

const [startFetch] = useFetch("/api/standings/2025-11-10");

onMounted(async () => {
  let teamsData = await startFetch();

  teams.value = teamsData.standings.map(function (elem) {
    return {
      teamName: elem.teamName.default,
      teamLogo: elem.teamLogo,
      points: elem.points,
      wins: elem.wins,
      losses: elem.losses,
      otLosses: elem.otLosses,
      gamesPlayed: elem.gamesPlayed,
      conference: elem.conferenceName,
      division: elem.divisionName,
      teamAbbrev: elem.teamAbbrev.default,
      conferenceSequence: elem.conferenceSequence,
      divisionSequence: elem.divisionSequence,
      wildcardSequence: elem.wildcardSequence
    };
  });

  westernConference.value = teams.value.filter((team) => team.conference === "Western");
  easternConference.value = teams.value.filter((team) => team.conference === "Eastern");

  atlanticDivision.value = teams.value.filter((team) => team.division === "Atlantic");
  metropolitanDivision.value = teams.value.filter((team) => team.division === "Metropolitan");
  centralDivision.value = teams.value.filter((team) => team.division === "Central");
  pacificDivision.value = teams.value.filter((team) => team.division === "Pacific");
});
</script>

<template>
  <v-container class="d-flex justify-center w-75">
    <v-sheet :elevation="1" class="w-100" rounded>
      <v-select
        :width="200"
        label="Select"
        v-model="standingsDisplay"
        :items="displayItems"
      ></v-select>

      <div v-if="standingsDisplay === 'League'" class="flex-container">
        <div class="flex-items">
          <div><h1>League Standings</h1></div>
          <StandingsTeam v-for="(team, i) in teams" :key="'l' + i" :team="team" />
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
