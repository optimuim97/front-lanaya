import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/LoginView.vue";
import Register from "@/views/RegisterView.vue";
import Accueil from "@/views/LandingView.vue";
import Dashboard from "@/views/DashboardView.vue";
import ProjectType from "@/views/ProjectTypeView.vue";
import CreateProject from "@/views/Projects/CreateProjectView.vue";
import NotFound from "@/views/NotFoundView.vue";

const routes = [
  {
    path: "/sign-in",
    name: "Login",
    component: Login,
    alias: "/login",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/project-type",
    name: "ProjectType",
    component: ProjectType,
  },
  {
    path: "/sign-up",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    name: "Accueil",
    component: Accueil,
  },
  {
    path: "/create-project",
    name: "CreateProject",
    component: CreateProject,
  }, {
    path: "/create-project/:slug",
    name: "CreateProjectByType",
    component: CreateProject,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
