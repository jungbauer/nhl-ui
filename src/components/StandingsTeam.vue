<script setup>
const props = defineProps(["team"]);
const router = useRouter();

const goToSchedule = () => {
  router.push(`/schedule/${props.team.teamAbbrev}`);
};
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
        @click="goToSchedule"
      >
        <div class="parent">
          <div class="team-logo" @click="goToSchedule">
            <img :src="team.teamLogo" alt="logo" class="logo" />
          </div>
          <div class="team">
            <div>{{ team.teamName }}</div>
            <div>({{ team.wins }}-{{ team.losses }}-{{ team.otLosses }})</div>
          </div>
          <div class="points">
            {{ team.points }}
          </div>
        </div>
      </v-sheet>
    </template>
  </v-hover>
</template>

<style scoped lang="sass">
.logo
  width: 60px
  height: 60px
  object-fit: contain

.parent
  display: grid
  grid-template-columns: 66px auto 50px
  grid-template-rows: 66px
  margin-bottom: 8px
  padding: 4px

.team
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: center
  align-items: center

.points
  font-size: 24px
  width: 100%
  height: 100%
  display: grid
  place-items: center

.team-logo
  display: grid
  place-items: center

.test:hover
  cursor: pointer
</style>
