const DashboardPlaces = () =>
  import("@/components/dashboard/DashboardPlaces.vue");
const DashboardPlaceCalendar = () =>
  import("@/components/dashboard/DashboardPlaceCalendar.vue");

export default [
  {
    path: "",
    name: "dashboard",
    component: DashboardPlaces,
  },
  {
    path: "place/:uuid",
    name: "place",
    component: DashboardPlaceCalendar,
  },
];
