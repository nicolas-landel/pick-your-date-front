<template>
  <router-view></router-view>
  <h1 class="mt-15">{{ $t("DashboardPlaceCalendar") }}</h1>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import router from "@/router";
import api from "@/setup/api";
import { Place } from "@/models";

export default defineComponent({
  data() {
    return {
      loading: true,
    };
  },
  computed: {
  },
  async created() {
    try {
      // await this.fetchPlaces({ api });
      this.loading = false;
    } catch (e) {
      this.showErrorNotification(this.$t("errorOccured"));
      this.loading = false;
    }
  },
  methods: {
    ...mapActions("place", ["fetchPlaces"]),
    ...mapActions("notification", ["showErrorNotification"]),


  },
});
</script>

<style scoped>
</style>
