import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persist";
// import "./assets/css/style.css";
import router from "@/router/router.js";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/font-awesome/css/all.min.css";
import "./assets/vendor/nice-select/css/nice-select.css";
import "./assets/vendor/magnific-popup/css/magnific-popup.css";

import './assets/vendor/slick/css/slick.css';
import './assets/vendor/animate/animate.css';

import 'vue3-toastify/dist/index.css';

import "./assets/css/style.css"; 
// import '@/assets/vendor/jquery/jquery-3.6.0.min.js';
// import '@/assets/js/plugin.js';
// import '@/assets/js/main.js';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


app.use(router).use(pinia).mount("#app");
