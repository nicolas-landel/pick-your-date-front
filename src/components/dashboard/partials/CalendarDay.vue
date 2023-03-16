<template>
  <div class="calendar-day" :class="{ outsideMonth: !isCurrentMonth }">
    <span
      v-if="displayDayString"
      class="calendar-day-label"
      :class="{ currentDay: isCurrentDay }"
      >{{ getDayNumber }}
    </span>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import router from "@/router";
import api from "@/setup/api";
import { Place } from "@/models";
import { days } from "@/utils/const";

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
  },
  computed: {
    getDayNumber() {
      return this.day.getDate();
    },
  },
  data() {
    return {};
  },
  methods: {},
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
