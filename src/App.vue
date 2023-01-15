<template>
  <VApp id="app">
    <AppNavbar />
    <AppNotification />
    <RouterView />
  </VApp>
</template>

<script setup>
import AppNavbar from "@/components/shared/AppNavbar.vue";
import AppNotification from "./components/shared/AppNotification.vue";
</script>

<style scoped>
.app-content {
  height: calc(100% - 50px);
  margin-top: 50px;
}
</style>
