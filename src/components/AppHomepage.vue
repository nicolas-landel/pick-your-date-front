<template>
  <VContainer class="fill-height">
    <VResponsive class="d-flex align-center text-center fill-height">
      <ConnectionPage v-if="!getCurrentUser" />
      <VBtn v-else @click="goDashboard">Go to Dashboard</VBtn>
    </VResponsive>
  </VContainer>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import ConnectionPage from "@/components/partials/ConnectionPage.vue";
import router from "@/router";

export default defineComponent({
  components: {
    ConnectionPage,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["getCurrentUser"]),
  },
  async created() {
    if (!this.getCurrentUser) {
      await this.refreshCurrentUser();
    }
  },
  methods: {
    ...mapActions("user", ["refreshCurrentUser"]),
    goDashboard() {
      router.push("/dashboard");
    },
  },
});
</script>

<style scoped></style>
