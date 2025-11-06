<script setup>
import useFetch from "@/utils/useFetch.js";

const props = defineProps(["gameId"])

const mountComplete = ref(false);
const playData = ref({ gameId: props.gameId });

const [startFetch] = useFetch(`/api/gamecenter/${props.gameId}/play-by-play`);

onMounted(async () => {
  let apiPlayData = await startFetch();
  playData.value.gameType = apiPlayData.gameType;
  playData.value.gameDate = apiPlayData.gameDate;
  playData.value.homeTeam = apiPlayData.homeTeam;
  playData.value.awayTeam = apiPlayData.awayTeam;
  playData.value.gameOutcome = apiPlayData.gameOutcome;
  playData.value.goals = apiPlayData.plays.filter((play) => play.typeDescKey === "goal");
  playData.value.rosterSpots = apiPlayData.rosterSpots;

  // add player info to goals
  playData.value.goals.forEach((goal, index) => {
    goal.mainIndex = index;
    goal.scoringPlayer = playData.value.rosterSpots.find(
      (player) => player.playerId === goal.details.scoringPlayerId,
    );
  });

  // split home and away goals
  playData.value.homeGoals = [];
  playData.value.awayGoals = [];
  playData.value.goals.forEach((goal) => {
    if (goal.details.eventOwnerTeamId === playData.value.homeTeam.id) {
      playData.value.homeGoals.push(goal);
    } else {
      playData.value.awayGoals.push(goal);
    }
  });

  mountComplete.value = true;

  // const canvas = document.getElementById("rink");
  // let testGoals = playData.value.goals.map((goal) => {
  //   return { xCoord: goal.details.xCoord, yCoord: goal.details.yCoord };
  // });
  // drawRink(canvas, testGoals);
});
</script>

<template>
  <v-container class="justify-center">
    <v-sheet elevation="1" rounded color="blue-grey-lighten-5">
      <div v-if="mountComplete === true">
        <div class="stats">
          <div class="home-stats">
            <div>
              <div class="logo-grid">
                <img :src="playData.homeTeam.logo" alt="logo" class="logo" />
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
                <img :src="playData.awayTeam.logo" alt="logo" class="logo" />
              </div>

              <div>
                {{ playData.awayTeam.placeName.default }} {{ playData.awayTeam.commonName.default }}
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div class="goals">
          <div class="home-goals">
            <div v-for="(goal, i) in playData.homeGoals" :key="'hg' + i">
              {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
              {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
              <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
            </div>
          </div>
          <div></div>
          <div class="away-goals">
            <div v-for="(goal, i) in playData.awayGoals" :key="'ag' + i">
              {{ goal.mainIndex + 1 }}. P{{ goal.periodDescriptor.number }} {{ goal.timeInPeriod }} -
              {{ goal.scoringPlayer.firstName.default }} {{ goal.scoringPlayer.lastName.default }}
              <img :src="goal.scoringPlayer.headshot" alt="headshot" class="headshot" />
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div id="rink-container">
        <canvas id="rink" width="1000" height="425"></canvas>
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

.headshot
  width: 100px
  height: 100px
  object-fit: contain

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

.goals
  display: grid
  grid-template-columns: auto 50px auto
  justify-content: center

#rink-container
  display: flex
  justify-content: center
  margin-top: 30px

canvas
  background: #fff
  border: 1px solid #333
  border-radius: 140px
  box-shadow: 0 0 10px #aaa
</style>
