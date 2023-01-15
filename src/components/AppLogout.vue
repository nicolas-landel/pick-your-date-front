<template>
  <div></div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import router from "@/router";

export default defineComponent({
  async created() {
    await this.logoutUser();
    this.showSuccessNotification(this.$t("logoutSuccess"));
    router.push({ name: "home" });
  },
  methods: {
    ...mapActions("user", ["logoutUser"]),
    ...mapActions("notification", ["showSuccessNotification"]),
  },
});
</script>
