<template>
  <h1 class="my-15 mx-5">{{ currentPlace.name }}</h1>
  <VSkeletonLoader v-if="loading" type="table" />
  <div>
    <CalendarMonth />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import router from "@/router";
import api from "@/setup/api";
import { Place } from "@/models";
import CalendarMonth from "@/components/dashboard/partials/CalendarMonth.vue";

export default defineComponent({
  components: {
    CalendarMonth,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    currentPlace() {
      return Place.getCurrentPlace();
    },
  },
  async created() {
    try {
      this.loading = false;
    } catch (e) {
      this.showErrorNotification(this.$t("errorOccured"));
      this.loading = false;
    }
  },
  beforeUnmount() {
    Place.resetCurrentPlace();
  },
  methods: {
    ...mapActions("place", ["fetchPlaces"]),
    ...mapActions("notification", ["showErrorNotification"]),
  },
});
</script>

<style scoped></style>
