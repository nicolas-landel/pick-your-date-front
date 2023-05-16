<template>
  <div class="mt-15 mb-3 mx-5 flex d-flex">
    <h1>{{ placeName }}</h1>
    <VSpacer />
    <VBtn v-if="!loading" icon="mdi-menu" @click="openCalendarTab"></VBtn>
  </div>

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
    <CalendarTab v-if="calendarTabOpen" v-model="calendarTabOpen" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import api from "@/setup/api";
import { Place, Answer, Comment, Option, User } from "@/models";
import CalendarMonth from "@/components/dashboard/partials/CalendarMonth.vue";
import CalendarHeader from "@/components/dashboard/partials/CalendarHeader.vue";
import CalendarTab from "@/components/dashboard/partials/calendarTab/CalendarTab.vue";

export default defineComponent({
  components: {
    CalendarMonth,
    CalendarHeader,
    CalendarTab,
  },
  data() {
    return {
      loading: true,
      month: 0,
      year: 0,
      calendarTabOpen: false,
    };
  },
  computed: {
    currentPlace() {
      return Place.getCurrentPlace();
    },
    placeName() {
      return this.currentPlace?.name;
    },
  },
  async created() {
    try {
      await Promise.all([
        this.fetchPlaceAnswers({ api, placeUuid: this.currentPlace.uuid }),
        this.fetchPlaceOptions({ api, placeUuid: this.currentPlace.uuid }),
        this.fetchPlaceComments({ api, placeUuid: this.currentPlace.uuid }),
        this.fetchUsersMembers({ api, placeUuid: this.currentPlace.uuid }),
      ]);
      this.initializeData();
      this.loading = false;
    } catch (e) {
      // TODO redirect to error page
      this.showErrorNotification(this.$t("errorOccured"));
      console.error(e);
      this.loading = false;
    }
  },
  beforeUnmount() {
    console.log("UNMOUNT");
    Place.resetCurrentPlace();
    Answer.deleteAll();
    Option.deleteAll();
    Comment.deleteAll();
    User.deleteNonCurrentUser();
  },
  methods: {
    ...mapActions("place", ["fetchPlaces"]),
    ...mapActions("notification", ["showErrorNotification"]),
    ...mapActions("option", ["fetchPlaceOptions"]),
    ...mapActions("comment", ["fetchPlaceComments"]),
    ...mapActions("answer", ["fetchPlaceAnswers"]),
    ...mapActions("user", ["fetchUsersMembers"]),
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
      this.year = new Date().getFullYear();
    },
    openCalendarTab() {
      this.calendarTabOpen = true;
    },
  },
});
</script>

<style scoped></style>
