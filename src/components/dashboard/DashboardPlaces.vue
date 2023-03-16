<template>
  <h1 class="my-15 mx-5">{{ $t("Dashboard") }}</h1>
  <VSkeletonLoader v-if="loading" type="table" />
  <!-- <VDataTable
    v-else
    :items="getPlaces"
    :headers="headers"
    :no-data-text="$t('parcelCodesTable.noPlots')"
  > </VDataTable> -->
  <VTable class="mx-5">
    <thead>
      <tr>
        <th class="text-left">{{ $t("Name") }}</th>
        <th class="text-left">{{ $t("Address") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in getPlaces"
        :key="item.name"
        class="pointer"
        @click="goToPlace(item)"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.address }}</td>
      </tr>
    </tbody>
  </VTable>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import router from "@/router";
import api from "@/setup/api";
import { Place } from "@/models";

export default defineComponent({
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    getPlaces() {
      return Place.all();
    },
  },
  async created() {
    try {
      await this.fetchPlaces({ api });
      this.loading = false;
    } catch (e) {
      this.showErrorNotification(this.$t("errorOccured"));
      this.loading = false;
    }
  },
  methods: {
    ...mapActions("place", ["fetchPlaces"]),
    ...mapActions("notification", ["showErrorNotification"]),

    goToPlace(item) {
      Place.setCurrentPlace(item.uuid);
      router.push({ name: "place", params: { uuid: item.uuid } });
    },
  },
});
</script>

<style scoped>
.pointer:hover {
  cursor: pointer;
  background-color: #f7f7f7;
}
</style>
