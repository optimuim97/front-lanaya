<script setup>
import { defineProps, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const formatAmount = (amount) => {
  // Exemple de formatage de montant (peut être personnalisé)
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
  }).format(amount);
};
const projectsList = ref();
const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
  Invested: {
    type: String,
    required: true,
  },
  Earned: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  projectsList.value = { ...props.projects };
});
</script>

<template>
  <div>
    <div class="breadcrumb-dashboard">
      <h5>Projets</h5>
      <div
        role="button"
        @click="
          () => {
            router.push('/dashboard');
          }
        "
      >
        <router-linnk to="/dashboard" role="button"
          >Tableau de Board</router-linnk
        >
        <i class="fa-solid fa-arrow-right-long"></i>
        <a href="javascript:void(0)">Liste Projects</a>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <div class="investment-table">
          <div class="intro">
            <h5>Projets</h5>
          </div>
          <div class="table-wrapper">
            <table>
              <tr>
                <th>Projet</th>
                <th>Montant Investir</th>
                <th>Date Investisement</th>
              </tr>
              <tr v-for="project in projectsList" :key="project.id">
                <td>
                  <img src="@/assets/images/table-img.png" alt="Investment" />
                  {{ project.title }}
                </td>
                <td>{{ formatAmount(project.budget) }}</td>
                <td>{{ project.start_date }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="investment-sidebar">
          <div class="statistics">
            <h5>Statistique</h5>
            <hr />
            <div class="group">
              <img src="@/assets/images/icons/wallet.png" alt="Wallet" />
              <div>
                <h4>{{ props.Earned }}</h4>
                <p>Entré du mois</p>
              </div>
            </div>
          </div>
          <div class="explore">
            <img src="@/assets/images/icons/explore.png" alt="Explore" />
            <div class="group">
              <h6>Explorer plus</h6>
              <p class="secondary">Voir opportunité d'investisements</p>
              <router-link to="/type-projets" class="button button--effect">
                Explorer
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
