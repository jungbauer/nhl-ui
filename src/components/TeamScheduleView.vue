<script setup>
  import TeamScheduleGame from "@/components/TeamScheduleGame.vue";
  import useFetch from "@/utils/useFetch.js";

  const props = defineProps(["teamAbbrev"]);
  const season = "20252026";

  const typeDisplay = ref("regseason");
  const typeItems = [{ title: "Regular Season", value: "regseason" }, { title: "Pre-Season", value: "preseason" }];

  const preSeasonGames = ref([]);
  const regSeasonGames = ref([]);
  const focusTeam = ref();

  const [startFetch] = useFetch(`/api/club-schedule-season/${props.teamAbbrev}/${season}`);

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
    const scheduleData = await startFetch();

    for (const game of scheduleData.games) {
      if (game.gameType === 1) {
        preSeasonGames.value.push(mapApiGame(game));
      }
      if (game.gameType === 2) {
        regSeasonGames.value.push(mapApiGame(game));
      }
    }

    focusTeam.value = preSeasonGames.value[0].homeTeam.abbrev === props.teamAbbrev ? preSeasonGames.value[0].homeTeam : preSeasonGames.value[0].awayTeam;
  });

</script>

<template>
  <v-container class="d-flex justify-center w-75">
    <v-sheet class="w-100" :elevation="1" rounded>
      <div v-if="focusTeam">
        <img alt="logo" class="logo" :src="focusTeam.logo">
        <div>{{ focusTeam.placeName.default }} {{ focusTeam.commonName.default }}</div>
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
        <TeamScheduleGame v-for="(game, i) in regSeasonGames" :key="'reg' + i" :game="game" />
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
