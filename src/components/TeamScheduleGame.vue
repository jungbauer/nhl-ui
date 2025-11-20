<script setup>
  import { useDisplay } from "vuetify/framework";

  const router = useRouter();
  const props = defineProps(["game"]);

  const { xs } = useDisplay();

  const formattedDate = computed(() => {
    const options = {
      day: "2-digit",
      month: "short",
    };

    const testDate = new Date(props.game.gameDate + "T00:00:00");
    return new Intl.DateTimeFormat("en-US", options).format(testDate);
  });

  function goToGame() {
    if (props.game.gameState !== "FUT") {
      router.push(`/game_${props.game.id}`);
    }
  }
</script>

<template>
  <v-hover>
    <template #default="{ isHovering, props }">
      <v-sheet
        v-bind="props"
        class="sheet"
        color="blue-grey-lighten-5"
        :elevation="isHovering ? 5 : 1"
        rounded
        @click="goToGame"
      >
        <div class="game-grid">
          <div class="date">
            {{ formattedDate }}
          </div>
          <div
            class="color-div"
            :class="{'future-game': game.gameState === 'FUT','focus-win': game.focusWin && !(game.gameState === 'FUT'),'focus-loss': !game.focusWin && !(game.gameState === 'FUT'),}"
          />
          <div class="team-grid">
            <div>
              <img alt="logo" class="logo" :src="game.homeTeam.logo">
            </div>
            <div class="score">{{ game.homeTeam.score }}</div>
            <div class="team-name" :class="{'team-name-xs': xs}">{{ game.homeTeam.commonName.default }}</div>
          </div>
          <div class="versus">
            <div>VS</div>
            <div v-if="game.gameState !== 'FUT' && game.gameOutcome.lastPeriodType !== 'REG'">
              ({{ game.gameOutcome.lastPeriodType }})
            </div>
          </div>
          <div class="team-grid">
            <div>
              <img alt="logo" class="logo" :src="game.awayTeam.logo">
            </div>
            <div class="score">{{ game.awayTeam.score }}</div>
            <div class="team-name" :class="{'team-name-xs': xs}">{{ game.awayTeam.commonName.default }}</div>
          </div>
        </div>
      </v-sheet>
    </template>
  </v-hover>
</template>

<style scoped lang="sass">
.sheet
  margin: 4px 4px 8px 4px

.sheet:hover
  cursor: pointer

.game-grid
  display: grid
  grid-template-columns: auto auto auto auto auto
  column-gap: 4px
  row-gap: 4px
  justify-content: start
  align-items: center
  margin: 4px
  padding: 4px

.logo
  width: 60px
  height: 60px
  object-fit: contain

.color-div
  height: 100%
  width: 10px
  margin-right: 5px

.future-game
  background-color: darkgray

.focus-win
  background-color: #8fc138

.focus-loss
  background-color: #f3a4a4

.team-grid
  display: grid
  grid-template-columns: auto auto
  grid-template-rows: auto auto
  align-items: center
  justify-items: center

.team-name
  grid-column: 1 / span 2

.team-name-xs
  max-width: 80px
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis

.versus
  padding: 10px
  display: flex
  flex-direction: column
  align-items: center

.score
  font-weight: bold
  font-size: x-large

.date
  min-width: 55px
</style>
