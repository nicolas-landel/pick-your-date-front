<template>
  <VAppBar id="app-navbar" dense elevation="2" app flat dark height="50">
    <VIcon class="ml-10">mdi-calendar</VIcon>
    <VToolbarTitle>Pick Your Date</VToolbarTitle>
    <RouterLink v-if="!getCurrentUser" to="/">{{
      $t("Connection")
    }}</RouterLink>

    <RouterLink v-if="getCurrentUser" to="/dashboard">{{
      $t("Dashboard")
    }}</RouterLink>
    <RouterLink v-if="getCurrentUser" to="/logout">{{
      $t("Log out")
    }}</RouterLink>
  </VAppBar>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["getCurrentUser"]),
  },
});
</script>

<style></style>
