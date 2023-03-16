<template>
  <h1 class="mt-15 mb-3 mx-5">{{ currentPlace.name }}</h1>
  <VSkeletonLoader v-if="loading" type="table" />
  <div v-else>
    <CalendarHeader
      :month="month"
      :year="year"
      @go-previous="goPreviousMonth"
      @go-next="goNextMonth"
      @go-today="goToday"
    />
    <CalendarMonth :year="year" :month="month" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import router from "@/router";
import api from "@/setup/api";
import { Place } from "@/models";
import CalendarMonth from "@/components/dashboard/partials/CalendarMonth.vue";
import CalendarHeader from "@/components/dashboard/partials/CalendarHeader.vue";

export default defineComponent({
  components: {
    CalendarMonth,
    CalendarHeader,
  },
  data() {
    return {
      loading: true,
      month: 0,
      year: 0,
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
      this.initializeData();
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
    initializeData() {
      this.month = new Date().getMonth();
      this.year = new Date().getFullYear();
    },
    goPreviousMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year -= 1;
      } else {
        this.month -= 1;
      }
    },
    goNextMonth() {
      if (this.month === 11) {
        this.month = 0;
        this.year += 1;
      } else {
        this.month += 1;
      }
    },
    goToday() {
      this.month = new Date().getMonth();
      this.year = new Date().getFullYear()
    }
  },
});
</script>

<style scoped></style>
