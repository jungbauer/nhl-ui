<script setup>
import useFetch from "@/utils/useFetch.js";
import TeamScheduleGame from "@/components/TeamScheduleGame.vue";

const props = defineProps(["teamAbbrev"]);
const season = "20252026";

const typeDisplay = ref("regseason");
const typeItems = [{title: "Regular Season", value: "regseason"},{title: "Pre-Season", value: "preseason"}];

const preSeasonGames = ref([]);
const regSeasonGames = ref([]);
const focusTeam = ref();

const [startFetch] = useFetch(`/api/club-schedule-season/${props.teamAbbrev}/${season}`);

const focusWin = (homeTeam, awayTeam) => {
  let homeWin = homeTeam.score > awayTeam.score;
  let focusHome = homeTeam.abbrev === props.teamAbbrev;

  return (focusHome && homeWin) || (!focusHome && !homeWin);
};

const mapApiGame = (game) => {
  return {
    id: game.id,
    gameType: game.gameType,
    gameDate: game.gameDate,
    gameState: game.gameState,
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    focusWin: focusWin(game.homeTeam, game.awayTeam),
  };
};

onMounted(async () => {
  let scheduleData = await startFetch();

  scheduleData.games.forEach((game) => {
    if (game.gameType === 1) {
      preSeasonGames.value.push(mapApiGame(game));
    }
    if (game.gameType === 2) {
      regSeasonGames.value.push(mapApiGame(game));
    }
  });

  if (preSeasonGames.value[0].homeTeam.abbrev === props.teamAbbrev) {
    focusTeam.value = JSON.parse(JSON.stringify(preSeasonGames.value[0].homeTeam));
  } else {
    focusTeam.value = JSON.parse(JSON.stringify(preSeasonGames.value[0].awayTeam));
  }
});

</script>

<template>
  <v-container class="d-flex justify-center w-75">
    <v-sheet :elevation="1" class="w-100" rounded>
      <v-select
        :width="200"
        label="Select"
        v-model="typeDisplay"
        :items="typeItems"
      ></v-select>

      <div v-if="typeDisplay === 'preseason'">
        <TeamScheduleGame v-for="(game, i) in preSeasonGames" :key="'pre' + i" :game="game" />
      </div>
      <div v-if="typeDisplay === 'regseason'">
        <TeamScheduleGame v-for="(game, i) in regSeasonGames" :key="'reg' + i" :game="game" />
      </div>
    </v-sheet>
  </v-container>
</template>

<style scoped lang="sass">

</style>
