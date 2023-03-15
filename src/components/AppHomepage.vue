<template>
  <VContainer class="fill-height">
    <VResponsive class="d-flex align-center text-center fill-height">
      <VSkeletonLoader v-if="loading" type="table" />
      <ConnectionPage v-else-if="!loading && !getCurrentUser" />
      <VBtn v-else @click="goDashboard">{{ $t("Todashboard") }}</VBtn>
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
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters("user", ["getCurrentUser"]),
  },
  async created() {
    try {
      if (!this.getCurrentUser) {
        await this.refreshCurrentUser();
      }
    } catch (err) {
      console.erro(err);
      this.showErrorNotification(this.$t("errorOccured"));
    } finally {
      this.loading = false;
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
