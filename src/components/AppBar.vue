<script setup>
  const links = [
    { text: "Home", link: "/" },
    { text: "Standings", link: "/standings" },
    { text: "Test", link: "/test" },
  ];
</script>

<template>
  <v-app-bar color="blue-grey-darken-1" flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar
        class="me-4 "
        color="blue-grey-lighten-5"
        size="32"
      />

      <v-btn
        v-for="link in links"
        :key="link.text"
        :text="link.text"
        :to="link.link"
        variant="text"
      />
    </v-container>
  </v-app-bar>
</template>

<style scoped lang="sass">

</style>
