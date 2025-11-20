<script setup>
  import { useDisplay } from "vuetify/framework";
  import TeamScheduleGame from "@/components/TeamScheduleGame.vue";
  import { useStandingsStore } from "@/stores/standings.js";
  import useFetch from "@/utils/useFetch.js";

  const props = defineProps(["teamAbbrev"]);
  const season = "20252026";

  const { smAndUp, xs } = useDisplay();

  const typeDisplay = ref("regseason");
  const typeItems = [{ title: "Regular Season", value: "regseason" }, { title: "Pre-Season", value: "preseason" }];

  const preSeasonGames = ref([]);
  const regPlayedGames = ref([]);
  const regCurrentGames = ref([]);
  const futureRegularGames = ref([]);
  const focusTeam = ref();
  const expansionValue = ref("current");

  const teamScheduleUrl = `${import.meta.env.VITE_API_URL}/nhl/club-schedule?team=${props.teamAbbrev}&season=${season}`;
  const [startFetch] = useFetch(teamScheduleUrl);

  const standingsStore = useStandingsStore();
  const standingsTeam = ref();

  function focusWin(homeTeam, awayTeam) {
    const homeWin = homeTeam.score > awayTeam.score;
    const focusHome = homeTeam.abbrev === props.teamAbbrev;

    return (focusHome && homeWin) || (!focusHome && !homeWin);
  }

  function mapApiGame(game) {
    return {
      id: game.id,
      gameType: game.gameType,
      gameDate: game.gameDate,
      gameState: game.gameState,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      focusWin: focusWin(game.homeTeam, game.awayTeam),
      gameOutcome: game.gameOutcome,
    };
  }

  onMounted(async () => {
    // make sure there's stuff in the store
    if (standingsStore.standings.length === 0) {
      await standingsStore.refreshStandings();
    }
    standingsTeam.value = standingsStore.standings.find((team) => team.teamAbbrev === props.teamAbbrev);

    const scheduleData = await startFetch();

    for (const game of scheduleData.games) {
      if (game.gameType === 1) {
        preSeasonGames.value.push(mapApiGame(game));
      }
      if (game.gameType === 2) {
        if (game.gameState === "FUT") {
          futureRegularGames.value.push(mapApiGame(game));
        } else {
          regCurrentGames.value.push(mapApiGame(game));
        }
      }
    }

    if (regCurrentGames.value.length > 10) {
      regPlayedGames.value = regCurrentGames.value.splice(0, regCurrentGames.value.length - 10);
    }

    focusTeam.value = preSeasonGames.value[0].homeTeam.abbrev === props.teamAbbrev ? preSeasonGames.value[0].homeTeam : preSeasonGames.value[0].awayTeam;
  });
</script>

<template>
  <v-container class="d-flex justify-center" :class="{'w-75': smAndUp, 'w-90': xs}">
    <v-sheet class="w-100" :elevation="1" rounded>
      <div v-if="focusTeam">
        <img alt="logo" class="logo" :src="focusTeam.logo">
        <div>{{ focusTeam.placeName.default }} {{ focusTeam.commonName.default }}</div>
        <div>({{ standingsTeam.wins }}-{{ standingsTeam.losses }}-{{ standingsTeam.otLosses }})</div>
        <div>Current Streak: {{ standingsTeam.streakCode }}-{{ standingsTeam.streakCount }}</div>
        <div>Current Season: 2025-2026</div>
      </div>

      <v-select
        v-model="typeDisplay"
        :items="typeItems"
        label="Select"
        :width="200"
      />

      <div v-if="typeDisplay === 'preseason'">
        <TeamScheduleGame v-for="(game, i) in preSeasonGames" :key="'pre' + i" :game="game" />
      </div>
      <div v-if="typeDisplay === 'regseason'">
        <v-expansion-panels v-model="expansionValue">
          <v-expansion-panel v-if="regPlayedGames.length > 0" :title="'Played Games (' + regPlayedGames.length + ')'" value="played">
            <v-expansion-panel-text>
              <TeamScheduleGame v-for="(game, i) in regPlayedGames" :key="'reg' + i" :game="game" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="'Last ' + regCurrentGames.length + ' Games'" value="current">
            <v-expansion-panel-text>
              <TeamScheduleGame v-for="(game, i) in regCurrentGames" :key="'curr' + i" :game="game" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="'Future Games (' + futureRegularGames.length + ')'" value="future">
            <v-expansion-panel-text>
              <TeamScheduleGame v-for="(game, i) in futureRegularGames" :key="'fut' + i" :game="game" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-sheet>
  </v-container>
</template>

<style scoped lang="sass">
.logo
  width: 100px
  height: 100px
  object-fit: contain
</style>
