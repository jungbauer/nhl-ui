<script setup>
  import GameViewGoals from "@/components/game/GameViewGoals.vue";
  import RinkView from "@/components/game/RinkView.vue";
  import useFetch from "@/utils/useFetch.js";

  const props = defineProps(["gameId"]);

  const mountComplete = ref(false);
  const playData = ref({ gameId: props.gameId });

  const playByPlayUrl = `${import.meta.env.VITE_API_URL}/nhl/gamecenter-playbyplay?gameId=${props.gameId}`;
  const [startFetch] = useFetch(playByPlayUrl);

  onMounted(async () => {
    const apiPlayData = await startFetch();
    playData.value.gameType = apiPlayData.gameType;
    playData.value.gameDate = apiPlayData.gameDate;
    playData.value.homeTeam = apiPlayData.homeTeam;
    playData.value.awayTeam = apiPlayData.awayTeam;
    playData.value.gameOutcome = apiPlayData.gameOutcome;
    playData.value.goals = apiPlayData.plays.filter((play) => play.typeDescKey === "goal");
    playData.value.rosterSpots = apiPlayData.rosterSpots;

    // add player info to goals
    for (const [index, goal] of playData.value.goals.entries()) {
      goal.mainIndex = index;
      goal.scoringPlayer = playData.value.rosterSpots.find(
        (player) => player.playerId === goal.details.scoringPlayerId,
      );
    }

    mountComplete.value = true;
  });
</script>

<template>
  <v-container class="justify-center">
    <v-sheet color="blue-grey-lighten-5" elevation="1" rounded>
      <div v-if="mountComplete === true">
        <div class="stats">
          <div class="home-stats">
            <div>
              <div class="logo-grid">
                <img alt="logo" class="logo" :src="playData.homeTeam.logo">
              </div>
              <div>
                {{ playData.homeTeam.placeName.default }} {{ playData.homeTeam.commonName.default }}
              </div>
            </div>
            <div class="score-grid">
              <div class="score">{{ playData.homeTeam.score }}</div>
              <div class="sog">({{ playData.homeTeam.sog }})</div>
            </div>
          </div>
          <div class="versus">
            <div>VS</div>
            <div v-if="playData.gameOutcome.lastPeriodType !== 'REG'" class="last-period">
              ({{ playData.gameOutcome.lastPeriodType }})
            </div>
          </div>
          <div class="away-stats">
            <div class="score-grid">
              <div class="score">{{ playData.awayTeam.score }}</div>
              <div class="sog">({{ playData.awayTeam.sog }})</div>
            </div>
            <div>
              <div class="logo-grid">
                <img alt="logo" class="logo" :src="playData.awayTeam.logo">
              </div>

              <div>
                {{ playData.awayTeam.placeName.default }} {{ playData.awayTeam.commonName.default }}
              </div>
            </div>
          </div>
        </div>

        <hr>
        <GameViewGoals
          :all-goals="playData.goals"
          :away-team-id="playData.awayTeam.id"
          :home-team-id="playData.homeTeam.id"
        />

        <hr>
        <RinkView :goals="playData.goals" />
      </div>
    </v-sheet>
  </v-container>
</template>

<style scoped lang="sass">
.logo
  width: 100px
  height: 100px
  object-fit: contain

.logo-grid
  display: grid
  place-items: center

.stats
  display: grid
  grid-template-columns: auto auto auto
  justify-content: center
  align-items: center
  column-gap: 12px

.home-stats
  display: grid
  grid-template-columns: auto auto
  align-items: center
  column-gap: 8px

.away-stats
  display: grid
  grid-template-columns: auto auto
  align-items: center
  column-gap: 8px

.score-grid
  display: grid
  place-items: center

.score
  font-weight: bold
  font-size: xx-large

.sog
  font-size: small

.versus
  display: grid
  place-items: center

.last-period
  font-size: small
</style>
