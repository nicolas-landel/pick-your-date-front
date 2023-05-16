<template>
  <div class="calendar-day" :class="{ outsideMonth: !isCurrentMonth }">
    <span
      v-if="displayDayString"
      class="calendar-day-label"
      :class="{ currentDay: isCurrentDay }"
      >{{ getDayNumber }} {{ getMonthShortLabel }}
    </span>
    <div class="calendar-day-content">
      <div v-for="answer in answers" :key="answer.id">
        {{ answer }}
        <!-- {{ getOptionColor(answer) }} -->
        <!-- <v-chip
          v-if="answer"
          :color="getOptionColor(answer)"
          :text-color="answer.textColor"
          class="ma-1"
          @click="goToAnswer(answer)"
        >
          {{ answer.title }}
        </v-chip> -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { months } from "@/utils/const";
import { truncate } from "@/utils/helpers";
import { Option } from "@/models";

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
  },
});
</script>

<style scoped>
.calendar-day {
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  color: #000;
}

.outsideMonth {
  background-color: #f7f7f7;
}

.calendar-day-label {
  display: block;
  text-align: center;
}

.currentDay {
  margin-top: 3px;
  width: 30px !important;
  height: 30px !important;
  margin: 2px auto 0px auto;
  line-height: 30px;
  color: #fff;
  background-color: #1867c0;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
