<template>
  <div class="calendar-day">
    <span v-if="displayDayString" class="calendar-day-label"
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

.calendar-day-label {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
