<script setup>
  import { useDisplay } from "vuetify/framework";
  import AroundTodayGame from "@/components/AroundTodayGame.vue";
  import useFetch from "@/utils/useFetch.js";

  const { smAndUp, xs } = useDisplay();

  const yesterdayGames = ref([]);
  const todayGames = ref([]);
  const tomorrowGames = ref([]);
  const yesterdayStr = ref("");
  const todayStr = ref("");
  const tomorrowStr = ref("");
  const panels = ref(["yesterday"]);

  const teamScheduleUrl = `${import.meta.env.VITE_API_URL}/nhl/games/around-today`;
  const [startFetch] = useFetch(teamScheduleUrl);

  function mapApiGame(game) {
    const homeTeam = game.homeTeam;
    homeTeam.score = game.homeTeamScore;
    const awayTeam = game.awayTeam;
    awayTeam.score = game.awayTeamScore;

    return {
      nhlGameId: game.nhlGameId,
      gameType: game.gameType,
      gameDate: game.gameDate,
      gameState: game.gameState,
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      gameOutcome: game.gameOutcome,
    };
  }

  onMounted(async () => {
    const aroundData = await startFetch();

    console.log("aroundData", aroundData);

    for (const game of aroundData.yesterday) {
      yesterdayGames.value.push(mapApiGame(game));
    }

    for (const game of aroundData.today) {
      todayGames.value.push(mapApiGame(game));
    }

    for (const game of aroundData.tomorrow) {
      tomorrowGames.value.push(mapApiGame(game));
    }

    yesterdayStr.value = aroundData.yesterdayDate;
    todayStr.value = aroundData.todayDate;
    tomorrowStr.value = aroundData.tomorrowDate;
  });
</script>

<template>
  <v-container class="d-flex justify-center" :class="{'w-75': smAndUp, 'w-90': xs}">
    <v-sheet class="w-100" :elevation="1" rounded>

      <h3>Games around today for 2025-2026 season</h3>

      <v-expansion-panels v-model="panels" multiple>
        <v-expansion-panel :title="'Yesterday\'s Games (' + yesterdayGames.length + ') ' + yesterdayStr" value="yesterday">
          <v-expansion-panel-text>
            <AroundTodayGame v-for="(game, i) in yesterdayGames" :key="'yest' + i" :game="game" />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel :title="'Today\'s Games (' + todayGames.length + ') ' + todayStr" value="today">
          <v-expansion-panel-text>
            <AroundTodayGame v-for="(game, i) in todayGames" :key="'today' + i" :game="game" />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel :title="'Tomorrow\'s Games (' + tomorrowGames.length + ') ' + tomorrowStr" value="tomorrow">
          <v-expansion-panel-text>
            <AroundTodayGame v-for="(game, i) in tomorrowGames" :key="'tomo' + i" :game="game" />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
  </v-container>
</template>

<style scoped lang="sass">

</style>
