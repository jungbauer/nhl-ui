<script setup>
  import TeamScheduleView from "@/components/TeamScheduleView.vue";

  const route = useRoute();
  const teamAbbrev = route.params.team;
</script>

<template>
  <TeamScheduleView :team-abbrev="teamAbbrev" />
</template>

<style scoped lang="sass">

</style>
