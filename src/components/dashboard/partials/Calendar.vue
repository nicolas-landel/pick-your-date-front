<template>
  <div>
    <div v-for="week in getWeeksNumber" :key="`week-${week}`">
      <div v-for="day in getWeekDays(week - 1)" :key="day">
        {{ day }}
        <CalendarDay :day="day" :displayDayString="true"> </CalendarDay>
      </div>
    </div>
  </div>
</template>
<script>

import { defineComponent } from "vue";
// import { mapActions } from "vuex";
// import router from "@/router";
// import api from "@/setup/api";
// import { Place } from "@/models";
import CalendarDay from "@/components/dashboard/partials/CalendarDay.vue";

// INFO - NL - 15/03/2023 - Cannot use vuetify calendar because it is not available for vue 3, only vue 2 ...
export default defineComponent({
  components: {
    CalendarDay,
  },
  props: {
    month: {
      type: Number,
      default: new Date().getMonth(),
      validator(value) {
        return value > 0 && value < 13;
      },
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
  },
  computed: {
    firstDay() {
      return new Date(this.year, this.month, 1);
    },
    lastDay() {
      return new Date(this.year, this.month + 1, 0);
    },
    getCurrentMonthDays() {
      const daysArray = [];
      let day = this.firstDay;
      while (day.getDate() < this.lastDay.getDate()) {
        daysArray.push(day);
        day = new Date(
          this.firstDay.getFullYear(),
          this.firstDay.getMonth(),
          day.getDate() + 1
        );
      }
      daysArray.push(this.lastDay);
      return daysArray;
    },
    getDaysArray() {
      return this.getPaddingDaysBefore()
        .concat(this.getCurrentMonthDays)
        .concat(this.getPaddingDaysAfter());
    },
    getWeeksNumber() {
      return this.getDaysArray.length / 7;
    },
  },
  methods: {
    getSideDay(day, position = -1) {
      // Position value: -1 for before, 1 for next day
      return new Date(day.getTime() + position * 24 * 60 * 60 * 1000);
    },
    getPaddingDaysBefore() {
      const firstDayNumber = this.firstDay.getDay();
      if (firstDayNumber === 0) {
        // Sunday so add 6 days
        return [...Array(6).keys()]
          .map((_, i) => this.getSideDay(this.firstDay, -1 * (i + 1)))
          .reverse();
      }
      return [...Array(firstDayNumber - 1).keys()]
        .map((_, i) => this.getSideDay(this.firstDay, -1 * (i + 1)))
        .reverse();
    },
    getPaddingDaysAfter() {
      const lastDayNumber = this.lastDay.getDay();
      if (lastDayNumber === 0) {
        // Sunday so add 0 day
        return [];
      }
      return [...Array(7 - lastDayNumber).keys()].map((_, i) =>
        this.getSideDay(this.lastDay, i + 1)
      );
    },
    getWeekDays(week) {
      return this.getDaysArray.slice(week * 7, (week + 1) * 7);
    },
  },
});
</script>
