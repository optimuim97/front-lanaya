<script setup>
import { useUserStore } from "@/stores/useUserStore";
import { EventBus } from "@/utils/eventBus";
import { defineEmits, ref, watch } from "vue";
// import { useRoute } from "vue-router";
// const route = useRoute();

const store = useUserStore();
// const currentRouteName = route.name;

const activeTab = ref("dashboard"); // Default active tab
const emit = defineEmits(["tab-changed"]); // Emit event for tab change

const setActiveTab = (tab) => {
  activeTab.value = tab;
  emit("tab-changed", tab); // Emit an event to parent to change content
};

watch(
  () => EventBus["tab-changed"],
  async (newValue) => {
    // alert(newValue);
    activeTab.value = newValue;
  }
);
</script>

<template>
  <div class="sidebar">
    <a href="javascript:void(0)" class="close__sidebar">
      <i class="fa-solid fa-xmark"></i>
    </a>
    <div class="sidenav__wrapper">
      <ul>
        <li>
          <a
            href="javascript:void(0)"
            :class="{ sidenav__active: activeTab === 'dashboard' }"
            @click="setActiveTab('dashboard')"
          >
            <img src="@/assets/images/icons/dashboard.png" alt="Dashboard" />
            Tableau de Bord
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            :class="{ sidenav__active: activeTab === 'projets' }"
            @click="setActiveTab('projets')"
          >
            <img
              src="@/assets/images/icons/investments.png"
              alt="Investments"
            />
            Projets
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            :class="{ sidenav__active: activeTab === 'transactions' }"
            @click="setActiveTab('transactions')"
          >
            <img
              src="@/assets/images/icons/transactions.png"
              alt="Transactions"
            />
            Transactions
          </a>
        </li>
        <li v-show="false">
          <a
            href="javascript:void(0)"
            :class="{ sidenav__active: activeTab === 'retrait' }"
            @click="setActiveTab('retrait')"
          >
            <img src="@/assets/images/icons/withdraw.png" alt="Withdraw" />
            Retrait
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            :class="{ sidenav__active: activeTab === 'compte' }"
            @click="setActiveTab('compte')"
          >
            <img src="@/assets/images/icons/account.png" alt="Account" />
            Compte
          </a>
        </li>
      </ul>
      <hr />
      <ul class="logout">
        <li>
          <a @click="store.logout()" role="button">
            <img src="@/assets/images/icons/logout.png" alt="Logout" />
            Se déconnecter
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
