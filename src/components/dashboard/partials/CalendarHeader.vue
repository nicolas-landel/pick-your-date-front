<template>
  <VBtn
    class="mb-md-n5 mb-lg-n5 mb-xl-n5"
    variant="plain"
    @click="$emit('go-today')"
  >
    <VIcon class="" size="30px">mdi-calendar-today</VIcon
    ><span class="d-none d-sm-flex">{{ $t("today") }}</span>
  </VBtn>
  <VRow class="flex d-flex justify-center calendar-header-wrapper mb-3">
    <VBtn
      class="mr-md-4 mr-lg-4 mr-xl-4"
      variant="plain"
      @click="$emit('go-previous')"
    >
      <VIcon class="" size="30px">mdi-chevron-left</VIcon>
    </VBtn>
    <h3 class="month-label">{{ getMonthName }} {{ year }}</h3>
    <VBtn
      class="ml-md-4 ml-lg-4 ml-xl-4"
      variant="plain"
      @click="$emit('go-next')"
    >
      <VIcon class="" size="30px">mdi-chevron-right</VIcon>
    </VBtn>
  </VRow>
</template>

<script>
import { defineComponent } from "vue";
import { months } from "@/utils/const";

export default defineComponent({
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
    getMonthName() {
      return this.$t(months[this.month]);
    },
  },
});
</script>

<style scoped>
.calendar-header-wrapper {
  align-items: center;
}

.month-label {
  width: 145px;
  text-align: center;
}
</style>
