<template>
  <VDialog id="calendar-tab-dialog" :value="value" persistent fullscreen>
  </VDialog>
</template>

<script>
// TODO!!
// TAB 1: Options
// TAB 2: Comments
// TAB 3: My answers

export default {
  name: "CalendarTab",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
