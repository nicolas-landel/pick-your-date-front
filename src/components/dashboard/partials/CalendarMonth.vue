<template>
  <div class="calendar mx-2">
    <div class="header-day-wrapper">
      <div
        v-for="index in 7"
        :key="`weekday-${index}`"
        class="header-day"
        :class="isOutsideMonth(index)"
      >
        {{ getDayString(index + 1) }}
      </div>
    </div>
    <div
      class="py-0 week-class"
      v-for="week in getWeeksNumber"
      :key="`week-${week}`"
    >
      <CalendarDay
        v-for="day in getWeekDays(week - 1)"
        :key="day"
        :day="day"
        :displayDayString="true"
        :isCurrentMonth="isFromCurrentMonth(day)"
        :isCurrentDay="isCurrentDay(day)"
      >
      </CalendarDay>
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
import { days } from "@/utils/const";

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
  data() {
    return {
      paddingDaysBefore: [],
      paddingDaysAfter: [],
    };
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
      return this.paddingDaysBefore
        .concat(this.getCurrentMonthDays)
        .concat(this.paddingDaysAfter);
    },
    getWeeksNumber() {
      return this.getDaysArray.length / 7;
    },
  },
  watch: {
    month() {
      this.initPaddingDays();
    },
  },
  created() {
    console.log("MONTHHHH", this.month, this.year, this.firstDay, this.lastDay)
    this.initPaddingDays()
  },
  methods: {
    initPaddingDays() {
      this.paddingDaysBefore = this.getPaddingDaysBefore();
      this.paddingDaysAfter = this.getPaddingDaysAfter();
    },
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
    isFromCurrentMonth(day) {
      return day.getMonth() === this.month;
    },
    getDayString(index) {
      return this.$t(days[index - 1]).slice(0, 3);
    },
    isOutsideMonth(index) {
      return index <= this.paddingDaysBefore.length ? "outsideMonth" : "";
    },
    isCurrentDay(day) {
      return (
        new Date().getDate() === day.getDate() &&
        new Date().getMonth() === day.getMonth()
      );
    },
  },
});
</script>

<style scoped>
.calendar {
  height: 600px;
}

.header-day-wrapper {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
}

.week-class {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 18%;
  border-left: 1px solid #e0e0e0;
}

.header-day {
  font-size: 11px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
  border-right: 1px solid #e0e0e0;
}
.outsideMonth {
  background-color: #f7f7f7;
}
</style>
