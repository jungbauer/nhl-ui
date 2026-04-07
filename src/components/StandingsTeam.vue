<script setup>
  const props = defineProps({
    team: Object,
    index: Number,
    projections: { type: Boolean, default: false },
  });
  const router = useRouter();

  function goToSchedule() {
    router.push(`/schedule/${props.team.teamAbbrev}`);
  }

  const showProjections = computed(() => {
    return props.projections;
  });

  const maxPoints = computed(() => {
    return ((82 - props.team.gamesPlayed) * 2) + props.team.points;
  });
  const aveProjection = computed(() => {
    const gamesRemaining = 82 - props.team.gamesPlayed;
    const pointAve = props.team.points / props.team.gamesPlayed;
    return props.team.points + (gamesRemaining * pointAve);
  });
  const lastTenProjection = computed(() => {
    const gamesRemaining = 82 - props.team.gamesPlayed;
    const l10Ave = props.team.l10Points / props.team.l10GamesPlayed;
    return props.team.points + (gamesRemaining * l10Ave);
  });
</script>

<template>
  <v-hover>
    <template #default="{ isHovering, props }">
      <v-sheet
        v-bind="props"
        class="test"
        color="blue-grey-lighten-5"
        :elevation="isHovering ? 5 : 1"
        rounded
        @click="goToSchedule"
      >
        <div class="parent">
          <div>{{ index + 1 }}.</div>
          <div class="team-logo">
            <img alt="logo" class="logo" :src="team.teamLogo">
          </div>
          <div class="team">
            <div>{{ team.teamName }}</div>
            <div>({{ team.wins }}-{{ team.losses }}-{{ team.otLosses }})</div>
          </div>
          <div class="points">
            {{ team.points }}
          </div>
          <div v-if="showProjections" class="projections">
            <div class="projections-max">{{ maxPoints }}</div>
            <div class="projections-ave">{{ aveProjection.toFixed(0) }}</div>
            <div class="projections-l10">{{ lastTenProjection.toFixed(0) }}</div>
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
  grid-template-columns: 20px 66px minmax(150px, 1fr) 50px auto
  grid-template-rows: 66px
  margin-bottom: 8px
  padding: 4px
  align-items: center
  justify-items: center

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

.projections
  text-align: center

.projections-max
  background-color: #D55E00
  padding-left: 2px
  padding-right: 2px
  border-radius: 4px 4px 0 0

.projections-ave
  background-color: #56B4E9
  padding-left: 2px
  padding-right: 2px

.projections-l10
  background-color: #E69F00
  padding-left: 2px
  padding-right: 2px
  border-radius: 0 0 4px 4px

</style>
