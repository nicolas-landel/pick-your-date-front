<template>
  <div class="calendar-day" :class="{ outsideMonth: !isCurrentMonth }">
    <span
      v-if="displayDayString"
      class="calendar-day-label"
      :class="{ currentDay: isCurrentDay }"
      >{{ getDayNumber }} {{ getMonthShortLabel }}
    </span>
    <div class="calendar-day-content">
      <div
        v-for="answer in answers"
        :key="answer.id"
        :style="getAnswerStyle(answer)"
        @click="openAnswerModal(answer)"
      >
        {{ answer.createdBy }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { months } from "@/utils/const";
import { truncate } from "@/utils/helpers";
import { stringDateToDate } from "@/utils/date";
import { Option } from "@/models";

export default defineComponent({
  props: {
    day: {
      type: Date,
      default: new Date(),
    },
    displayDayString: {
      type: Boolean,
      default: true,
    },
    isCurrentMonth: {
      type: Boolean,
      default: true,
    },
    isCurrentDay: {
      type: Boolean,
      default: false,
    },
    answers: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    getDayNumber() {
      return this.day.getDate();
    },
    getMonthShortLabel() {
      if (this.getDayNumber === 1) {
        return truncate(months[this.day.getMonth()], 3, ".");
      }
      return "";
    },
  },
  data() {
    return {};
  },
  methods: {
    getOptionColor(answer) {
      return Option.find(answer.option)?.color;
    },
    getWeekDuration(answer) {
      const startDate = stringDateToDate(answer.startDate);
      // If the answer starts on the same day as the current day
      if (startDate === this.day) {
        if (this.day.getDay() === 0) return 1;
        return 8 - this.day.getDay();
      }
      // If the answer starts before the current day
      const durationBeforeWeek =
        this.day.getDate() - stringDateToDate(answer.startDate).getDate();
      return Math.min(7, answer.duration - durationBeforeWeek);
    },
    getAnswerStyle(answer) {
      return {
        width: `calc(${100 * this.getWeekDuration(answer)}% - 8px)`,
        backgroundColor: this.getOptionColor(answer),
        zIndex: 2,
        position: "relative",
        marginLeft: "8px",
      };
    },
    openAnswerModal(answer) {
      this.$emit("open-answer-modal", answer);
    },
  },
});
</script>

<style scoped>
.calendar-day {
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  color: #000;
  overflow: visible;
  position: relative;
  /* z-index: 1; */
}

.outsideMonth {
  background-color: #f7f7f7;
}

.calendar-day-label {
  display: block;
  text-align: center;
  height: 35px;
}

.currentDay {
  margin-top: 3px;
  width: 30px !important;
  height: 30px !important;
  margin: 2px auto 3px auto;
  line-height: 30px;
  color: #fff;
  background-color: #1867c0;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.calendar-day-content {
  overflow: visible;
}
</style>
