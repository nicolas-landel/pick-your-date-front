import store from "@/store";

export const privateRouteMiddleware = (to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta?.public);
  if (!isPublic && !store.getters["user/getCurrentUser"]) {
    return next({ name: "home" });
  }
  return next();
};
