<script setup>
const props = defineProps(["game"]);
</script>

<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-sheet
        v-bind="props"
        :elevation="isHovering ? 5 : 1"
        class="test"
        rounded
        color="blue-grey-lighten-5"
      >
        <div
          class="game-grid"
          :class="{
          'future-game': game.gameState === 'FUT',
      'focus-win': game.focusWin && !(game.gameState === 'FUT'),
      'focus-loss': !game.focusWin && !(game.gameState === 'FUT'),
    }"
        >
          <div>
            <div>{{ game.gameDate }}</div>
            <div>{{ game.gameState }}</div>
          </div>
          <div>
            <div>
              <img :src="game.homeTeam.logo" alt="logo" class="logo" />
            </div>
            <!--      <div>{{ game.homeTeam.abbrev }}</div>-->
            <div>{{ game.homeTeam.score }}</div>
          </div>
          <div>VS</div>
          <div>
            <div>
              <img :src="game.awayTeam.logo" alt="logo" class="logo" />
            </div>
            <!--      <div>{{ game.awayTeam.abbrev }}</div>-->
            <div>{{ game.awayTeam.score }}</div>
          </div>
        </div>
      </v-sheet>
    </template>
  </v-hover>
</template>

<style scoped lang="sass">
.test:hover
  cursor: pointer

.game-grid
  display: grid
  grid-template-columns: auto auto auto auto
  column-gap: 4px
  row-gap: 4px
  justify-content: start
  align-items: center

.game-grid:hover
  cursor: pointer
  border: black 2px solid

.logo
  width: 60px
  height: 60px
  object-fit: contain

.future-game
  background-color: darkgray

.focus-win
  background-color: #8fc138

.focus-loss
  background-color: #f3a4a4
</style>
