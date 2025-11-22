<script setup>
  import { useDisplay } from "vuetify/framework";
  import { useStandingsStore } from "@/stores/standings.js";

  const { smAndUp, xs } = useDisplay();

  const standingsDisplay = ref("League");
  const displayItems = ["League", "Conference", "Division", "Wildcard"];

  const westernConference = ref([]);
  const easternConference = ref([]);
  const atlanticDivision = ref([]);
  const metropolitanDivision = ref([]);
  const centralDivision = ref([]);
  const pacificDivision = ref([]);
  const easternWildcard = ref([]);
  const westernWildcard = ref([]);

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

    easternWildcard.value.push(standingsStore.standings.find((team) => team.conference === "Eastern" && team.wildcardSequence === 1),
                               standingsStore.standings.find((team) => team.conference === "Eastern" && team.wildcardSequence === 2),
                               standingsStore.standings.find((team) => team.conference === "Eastern" && team.wildcardSequence === 3));

    westernWildcard.value.push(standingsStore.standings.find((team) => team.conference === "Western" && team.wildcardSequence === 1),
                               standingsStore.standings.find((team) => team.conference === "Western" && team.wildcardSequence === 2),
                               standingsStore.standings.find((team) => team.conference === "Western" && team.wildcardSequence === 3));
  });
</script>

<template>
  <v-container class="d-flex justify-center" :class="{'w-75': smAndUp, 'w-90': xs}">
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
        <div class="flex-items">
          <div><h1>Western Standings</h1></div>
          <StandingsTeam v-for="(team, i) in westernConference" :key="'wc' + i" :team="team" />
        </div>
        <div class="flex-items">
          <div><h1>Eastern Standings</h1></div>
          <StandingsTeam v-for="(team, i) in easternConference" :key="'wc' + i" :team="team" />
        </div>
      </div>

      <div v-if="standingsDisplay === 'Division'" :class="{'divisions-grid': smAndUp, 'divisions-small': xs}">
        <div class="flex-items">
          <h1>Pacific</h1>
          <StandingsTeam v-for="(team, i) in pacificDivision" :key="'pd' + i" :team="team" />
        </div>
        <div class="flex-items">
          <h1>Central</h1>
          <StandingsTeam v-for="(team, i) in centralDivision" :key="'cd' + i" :team="team" />
        </div>
        <div class="flex-items">
          <h1>Metropolitan</h1>
          <StandingsTeam v-for="(team, i) in metropolitanDivision" :key="'md' + i" :team="team" />
        </div>
        <div class="flex-items">
          <h1>Atlantic</h1>
          <StandingsTeam v-for="(team, i) in atlanticDivision" :key="'ad' + i" :team="team" />
        </div>
      </div>

      <div v-if="standingsDisplay === 'Wildcard'">
        <div>
          <h1>Western Conference</h1>
          <div class="wildcard-div">
            <div>
              <h2>Pacific Division</h2>
              <StandingsTeam v-for="(team, i) in pacificDivision.slice(0,3)" :key="'wpd' + i" :team="team" />
            </div>
            <div>
              <h2>Central Division</h2>
              <StandingsTeam v-for="(team, i) in centralDivision.slice(0,3)" :key="'wcd' + i" :team="team" />
            </div>
            <div>
              <h2>Wildcards</h2>
              <StandingsTeam v-for="(team, i) in westernWildcard" :key="'wwc' + i" :team="team" />
            </div>
          </div>
        </div>
        <div>
          <h1>Eastern Conference</h1>
          <div class="wildcard-div">
            <div>
              <h2>Atlantic Division</h2>
              <StandingsTeam v-for="(team, i) in atlanticDivision.slice(0,3)" :key="'wad' + i" :team="team" />
            </div>
            <div>
              <h2>Metropolitan Division</h2>
              <StandingsTeam v-for="(team, i) in metropolitanDivision.slice(0,3)" :key="'wmd' + i" :team="team" />
            </div>
            <div>
              <h2>Wildcards</h2>
              <StandingsTeam v-for="(team, i) in easternWildcard" :key="'wec' + i" :team="team" />
            </div>
          </div>
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

.divisions-grid
  display: grid
  grid-template-columns: auto auto
  grid-template-rows: auto auto
  grid-column-gap: 24px
  grid-row-gap: 24px

.divisions-small
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: center
  align-items: center
  align-content: normal
  row-gap: 24px

.wildcard-div
  display: flex
  flex-wrap: wrap
  column-gap: 10px

</style>
