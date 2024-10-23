<script setup>
import { defineProps, ref } from "vue";

// Fonction pour générer un token aléatoire
const generateToken = () => {
  return (
    "card_" +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const card = ref({
  cardholder_name: "",
  brand: "",
  last_four: "",
  exp_month: "",
  exp_year: "",
  token: generateToken(),
});

defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  addCard: {
    type: Function,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true,
  },
});
</script>

<template>
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
