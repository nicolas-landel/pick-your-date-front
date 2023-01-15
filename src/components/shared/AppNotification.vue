<template>
  <VSnackbar
    v-model="displayNotification"
    :timeout="getTimeout"
    :content-class="notificationClass"
    absolute
    multi-line
  >
    <VRow>
      <VAlert
        outlined
        text
        dismissible
        :type="currentNotification.type"
        class="py-5"
        :icon="getAlertIcon"
      >
        <template #default>
          {{ currentNotification.message }}
        </template>
        <template #close>
          <VIcon color="white" @click="closeNotification()"> mdi-close </VIcon>
        </template>
      </VAlert>
    </VRow>
  </VSnackbar>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  data() {
    return {
      notificationsToDisplay: [],
      displayNotification: false,
      currentNotification: {},
    };
  },
  computed: {
    ...mapGetters("notification", ["getNotification"]),
    getAlertIcon() {
      if (this.currentNotification.type === "error") {
        return "mdi-alert-circle-outline";
      }
      if (this.currentNotification.type === "success") {
        return "mdi-check-circle-outline";
      }
      return "mdi-alert-outline";
    },
    notificationClass() {
      // TODO: not working, css set
      return {
        top: `${this.getNavbarHeight() + 10}px`,
      };
    },
    getTimeout() {
      return this.currentNotification?.timeout || 4000;
    },
  },
  watch: {
    getNotification(newNotification) {
      if (newNotification) {
        this.notificationsToDisplay.push(newNotification);
      }
    },
    displayNotification(val) {
      if (!val) {
        this.notificationsToDisplay.splice(0, 1);
      }
    },
    notificationsToDisplay: {
      // TODO: last notification never closes when several at the same time
      deep: true,
      handler(val) {
        // Notifications in the array to be display and currently not notification displayed
        if (val.length > 0 && !this.displayNotification) {
          this.displayFirstNotification();
        }
      },
    },
  },
  methods: {
    displayFirstNotification() {
      this.currentNotification = this.notificationsToDisplay[0];
      this.displayNotification = true;
    },
    closeNotification() {
      this.displayNotification = false;
    },
    getNavbarHeight() {
      const navbar = document.getElementById("app-navbar");
      return navbar?.getBoundingClientRect().height || 50;
    },
  },
});
</script>

<style scoped>
/* TODO should be dynamic */
:deep(.v-overlay__content) {
  top: 60px;
  position: absolute;
}

:deep(.v-snackbar__content) {
  padding: 0;
}
</style>
