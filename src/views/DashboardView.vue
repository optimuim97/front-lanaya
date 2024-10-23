<script setup>
// import { useUserStore } from "@/stores/useUserStore";
// import { EventBus } from "@/utils/eventBus";
import { onBeforeMount, ref, watch } from "vue";
import checkAuth from "@/services/checkAuth";
import { useRoute } from "vue-router";
import router from "@/router/router";
import { toast } from "vue3-toastify";
import projectType from "@/services/ProjectType/projectType";
import useUserCard from "@/services/UserCard/userCard";
// import { useUserStore } from "@/stores/useUserStore";
// import { useGlobalStore } from "@/stores/globalStore";
import Sidebar from "@/components/_partials/Dashboard/SidebarComponent.vue";
import MainContent from "@/components/_partials/Dashboard/MainContent.vue";

import ProjetsComponent from "@/components/_partials/Dashboard/ProjetsComponent.vue";
import TransactionsComponent from "@/components/_partials/Dashboard/TransactionsComponent.vue";
import RetraitComponent from "@/components/_partials/Dashboard/RetraitComponent.vue";
import CompteComponent from "@/components/_partials/Dashboard/CompteComponent.vue";
import { EventBus } from "@/utils/eventBus";

const { getUser, projects, groups, accounts, transactions, user } = checkAuth();

const { getProjectTypesLimited, projectTypes } = projectType();
const {
  /*add,*/
  getUserCards,
  userCards,
} = useUserCard();

// TODO calculer le gain et les avoirs
const Invested = ref(0);
const Earned = ref(0);

const route = useRoute();
const solde = ref();

const activeTab = ref("dashboard"); // Track active tab in parent
const handleTabChange = (tab) => {
  activeTab.value = tab; // Update tab based on sidebar selection
};

watch(
  () => EventBus["tab-changed"],
  async (newValue) => {
    activeTab.value = newValue;
  }
);

// const store = useUserStore();
onBeforeMount(async () => {
  let token = localStorage.getItem("token");
  await getUser(token);
  await getProjectTypesLimited(5);
  await getUserCards();

  console.log({ userCards });
  console.log({ projects });
  console.log({ groups });
  console.log({ accounts });
  console.log({ transactions });
  // console.log({ solde: accounts?.value[0].solde });
  solde.value = accounts?.value >= 1 ? accounts?.value[0].solde : 0;

  if (token ?? false) {
    if (route.path == "/login" || route.path == "/register") {
      router.push("dashboard");
    }
  }

  //Check Is token is Valid
  if (!token) {
    setTimeout(() => {
      router.push("/login");
    }, 1500);

    toast.info("Votre session à expiré veuillez vous réconnecter");
  }

  const scriptJQuery = document.createElement("script");
  scriptJQuery.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  scriptJQuery.onload = () => {
    console.log("jQuery loaded");

    // Charger le script slick.min.js après jQuery
    const scriptSlick = document.createElement("script");
    scriptSlick.src =
      "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js";
    scriptSlick.onload = () => {
      console.log("Slick Carousel loaded");

      // Initialiser le carousel une fois que slick est chargé
      // jQuery(".carousel").slick({
      //   slidesToShow: 3,
      //   slidesToScroll: 1,
      //   autoplay: true,
      //   autoplaySpeed: 2000,
      // });
    };

    document.head.appendChild(scriptSlick);
  };

  document.head.appendChild(scriptJQuery);
});
</script>

<template>
  <!-- ==== dashboard section start ==== -->
  <div class="dashboard section__space__bottom">
    <div class="container">
      <div class="dashboard__area">
        <div class="row">
          <div class="col-xxl-3">
            <Sidebar @tab-changed="handleTabChange"></Sidebar>
          </div>

          <div class="col-xxl-9">
            <div class="main__content">
              <div class="collapse__sidebar">
                <h4>Dashboard</h4>
                <a href="javascript:void(0)" class="collapse__sidebar__btn">
                  <i class="fa-solid fa-bars-staggered"></i>
                </a>
              </div>

              <div class="main__content-dashboard">
                <MainContent
                  :solde="solde"
                  :Invested="Invested"
                  :Earned="Earned"
                  :projects="projects"
                  :userCards="userCards"
                  :projectTypes="projectTypes"
                  v-if="activeTab === 'dashboard'"
                ></MainContent>
                <!-- <dashboard-component  /> -->
                <projets-component
                  v-if="activeTab === 'projets'"
                  :Invested="Invested"
                  :Earned="Earned"
                  :projects="projects"
                />
                <transactions-component v-if="activeTab === 'transactions'" />
                <retrait-component v-if="activeTab === 'retrait'" />
                <compte-component :user="user" v-if="activeTab === 'compte'" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ==== #dashboard section end ==== -->
</template>
