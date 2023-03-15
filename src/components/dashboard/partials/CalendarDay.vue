<template>
  <div>
    <span v-if="displayDayString">{{ getDayString }}</span>
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
    getDayString() {
      return this.$t(days[this.day.getDay()]);
    },
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
