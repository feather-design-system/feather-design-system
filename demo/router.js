import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory("/demos/"),
  routes,
});

export default router;
