<script setup>
import useUserCard from "@/services/UserCard/userCard";
import { useGlobalStore } from "@/stores/globalStore";
import { EventBus } from "@/utils/eventBus";
import { /*defineEmits,*/ defineProps, ref } from "vue";
const { publicDir } = useGlobalStore();

const { add, getUserCards } = useUserCard();

const props = defineProps({
  solde: {
    type: Number,
    required: true,
  },
  Invested: {
    type: Number,
    required: true,
  },
  Earned: {
    type: Number,
    required: true,
  },
  projects: {
    type: Array,
    required: true,
  },
  userCards: {
    type: Array,
    required: true,
  },
  projectTypes: {
    type: Array,
    required: true,
  },
});

const formatAmount = (amount) => {
  // Exemple de formatage de montant (peut être personnalisé)
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
  }).format(amount);
};

const generateToken = () => {
  return (
    "card_" +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
/*<--------------- Modal------------------>*/
// Références pour les champs du formulaire
const showModal = ref(false);
const card = ref({
  cardholder_name: "",
  brand: "",
  last_four: "",
  exp_month: "",
  exp_year: "",
  token: generateToken(),
});

// Fonction pour réinitialiser le formulaire
const resetForm = () => {
  card.value = {
    cardholder_name: "",
    brand: "",
    last_four: "",
    exp_month: "",
    exp_year: "",
    token: "",
  };
};

// const emit = defineEmits(["tab-changed"]); // Emit event for tab change
const sendData = (params, valueAdded) => {
  console.info({
    params: params,
    valueAdded: valueAdded,
  });
  EventBus[params] = valueAdded;
};

const activeTab = ref();
const setActiveTab = (tab) => {
  activeTab.value = tab;
  sendData("tab-changed", activeTab.value);
  // emit("tab-changed", tab); // Emit an event to parent to change content
};

// Fonction pour ajouter une carte via l'API
const addCard = async () => {
  await add(card.value);
  resetForm();
  closeModal();

  await getUserCards();
};

// Fonction pour fermer la modale
const closeModal = () => {
  showModal.value = false;
};
/*<--------------- Modal------------------>*/
</script>

<template>
  <div class="row">
    <div class="col-lg-5">
      <div class="main__content-dashboard__chart">
        <div class="balance-report__wrapper dashboard-single__box">
          <div class="balance-report">
            <div>
              <h4>{{ solde }}</h4>
              <p class="secondary">Solde Actuel</p>
            </div>
          </div>
          <hr />
          <div class="group">
            <div class="group-inner">
              <p>Total Investi</p>
              <h6>
                <img src="@/assets/images/icons/invested.png" alt="Invested" />
                {{ formatAmount(Invested) }}
              </h6>
            </div>
            <div class="group-inner">
              <p>Total Gain</p>
              <h6>
                <img src="@/assets/images/icons/earned.png" alt="Earned" />
                {{ formatAmount(Earned) }}
              </h6>
            </div>
          </div>
        </div>

        <div class="dashboard-single__box">
          <div class="intro">
            <h5>Mes Projets</h5>
            <a @click="setActiveTab('projets')" role="button">
              Voir plus
              <i class="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>

          <div
            class="property-wrap"
            v-for="(project, index) in projects?.slice(0, 2)"
            :key="index"
          >
            <div class="poster">
              <router-link :to="`/project-details/${project.id}`">
              </router-link>
            </div>
            <h4>
              <router-link :to="`/project-details/${project.id}`">{{
                project.title
              }}</router-link>
            </h4>
            <p>
              <i class="fa-solid fa-money-bill"></i>
              {{ formatAmount(project?.budget) }}
            </p>
            <p>
              <i class="fa fa-money"></i>
              {{ project?.description }}
            </p>

            <div class="progress__type progress__type--two">
              <div
                class="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  class="progress-bar"
                  :style="`width: ${project?.progress}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-7">
      <div class="main__content-dashboard__sidebar">
        <div class="dashboard-single__box card-alt">
          <div class="card-tab-btn__wrapper">
            <a href="#bank" class="card-tab-btn card-tab-btn-active"
              >Votre Compte</a
            >
            <a href="#credit" class="card-tab-btn">Carte de Crédits </a>
            <!-- <p>
              {{ props.userCards }}
            </p> -->
          </div>

          <div class="card-tab-wrp" id="credit">
            <div class="card-tab-content">
              <a class="add-card" role="button" @click="showModal = true">
                <i class="fa-solid fa-plus"></i>
              </a>
              <div class="card-content-slider-wrapper">
                <div class="card-content-slider">
                  <div
                    class="card-content-wrapper"
                    v-for="card in props.userCards"
                    :key="card.id"
                  >
                    <div class="card-content">
                      <p class="secondary card-no">Card No.</p>
                      <p>**** **** **** {{ card.last_four }}</p>
                      <div class="group">
                        <div class="group-inner">
                          <p class="secondary">EXPIRY DATE</p>
                          <p class="secondary">
                            {{ card.exp_year }}
                          </p>
                        </div>
                        <div class="group-inner">
                          <p class="secondary">CURRENCY</p>
                          <p class="secondary">{{ card.currency ?? "XOF" }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="slick-slider-dots"></div>
          </div>

          <div class="card-tab-wrp" id="bank">
            <div class="card-tab-content">
              <a class="add-card" @click="showModal = true" role="button">
                <i class="fa-solid fa-plus"></i>
              </a>
              <div class="card-content">
                <p class="secondary card-no">Card No.</p>
                <p>**** **** **** {{ props.userCards[0]?.last_four }}</p>
                <div class="group">
                  <div class="group-inner">
                    <p class="secondary">EXPIRY DATE</p>
                    <p class="secondary">
                      {{ props.userCards[0]?.exp_month }}/{{
                        props.userCards[0]?.exp_year
                      }}
                    </p>
                  </div>
                  <div class="group-inner">
                    <p class="secondary">CURRENCY</p>
                    <p class="secondary">XOF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Project Type -->
        <div class="dashboard-single__box">
          <div class="intro">
            <h5>Type de Projets</h5>
            <router-link to="/type-projets">
              Voir plus
              <i class="fa-solid fa-arrow-right-long"></i>
            </router-link>
          </div>

          <div
            class="new-invest"
            v-for="projectType in projectTypes"
            :key="projectType.id"
          >
            <div class="poster">
              <a href="properties.html">
                <img
                  :src="`${publicDir}/${projectType.cover}`"
                  alt="San Francisco"
                />
              </a>
            </div>
            <div class="invest-content">
              <div class="item__head__left">
                <h6>{{ projectType.title }}</h6>
                <div class="progress__type progress__type--two">
                  <div class="project__info">
                    <p class="project__has">
                      <span class="project__has__investors">{{
                        projectType.investment_closure
                      }}</span>
                      |
                      <span class="project__has__investors__amount">
                        {{ formatAmount(projectType.max_budget) }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Project Type -->
      </div>
    </div>
  </div>

  <!-- Modale pour ajouter une carte -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h5 class="mb-3">Ajouter une carte bancaire</h5>

      <!-- Formulaire pour ajouter une carte -->
      <form @submit.prevent="addCard">
        <div class="input input--secondary">
          <label for="cardholder_name">Nom du titulaire</label>
          <input
            v-model="card.cardholder_name"
            type="text"
            id="cardholder_name"
            required
          />
        </div>

        <div class="input input--secondary">
          <label for="brand">Type de carte (Visa, MasterCard, etc.)</label>
          <input v-model="card.brand" type="text" id="brand" required />
        </div>

        <div class="input input--secondary">
          <label for="last_four">4 derniers chiffres</label>
          <input
            v-model="card.last_four"
            type="text"
            id="last_four"
            maxlength="4"
            required
          />
        </div>

        <div class="input input--secondary">
          <label for="exp_month">Mois d'expiration</label>
          <input
            v-model="card.exp_month"
            type="text"
            id="exp_month"
            maxlength="2"
            required
          />
        </div>

        <div class="input input--secondary">
          <label for="exp_year">Année d'expiration</label>
          <input
            v-model="card.exp_year"
            type="text"
            id="exp_year"
            maxlength="4"
            required
          />
        </div>

        <div class="input input--secondary" v-show="false">
          <label for="token">Token de la carte</label>
          <input v-model="card.token" type="text" id="token" required />
        </div>

        <div class="modal-footer">
          <button type="submit" class="button button--effect">
            Ajouter la carte
          </button>

          <!-- <button type="button" class="btn btn-danger" @click="closeModal">
            Annuler
          </button> -->
          <a class="nav-link" role="button" @click="closeModal">Annuler</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Styles pour la modale */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.input--secondary input,
.input--secondary textarea {
  padding: 8px 30px;
  background-color: #ffffff;
  color: #13216e;
  border: 1px solid #c3c7e4;
}
</style>
