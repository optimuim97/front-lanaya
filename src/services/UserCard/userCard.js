import { ref } from "vue";
import { toast } from "vue3-toastify";
import apiClient from "../apiClient";
// import axios from 'axios';

export default function useUserCard() {
  const userCards = ref([]);
  const userCard = ref(null);
  const error = ref(null);
  //   const toast = useToast();

  // Récupérer toutes les cartes de l'utilisateur
  const getUserCards = async () => {
    try {
      const response = await apiClient.get("/cards");
      userCards.value = response.data;
    } catch (err) {
      error.value = "Une erreur s'est produite lors de la recherche des cartes.";
      toast.error(error.value);
    }
  };

  // Ajouter une nouvelle carte
  const add = async (cardData) => {
    try {
      const response = await apiClient.post("/cards", cardData);
      userCards.value.push(response.data);
      toast.success("Carte ajouté avec succès!");
    } catch (err) {
      error.value = "Une erreur s'est produite lors de l'ajout de la carte";
      toast.error(error.value);
    }
  };

  // Récupérer une carte spécifique
  const getUserCard = async (id) => {
    try {
      const response = await apiClient.get(`/cards/${id}`);
      userCard.value = response.data;
    } catch (err) {
      error.value = "Carte Introuvable.";
      toast.error(error.value);
    }
  };

  // Mettre à jour une carte
  const updateUserCard = async (id, cardData) => {
    try {
      const response = await apiClient.put(`/cards/${id}`, cardData);
      const index = userCards.value.findIndex((card) => card.id === id);
      if (index !== -1) {
        userCards.value[index] = response.data;
      }
      toast.success("Card updated successfully!");
    } catch (err) {
      error.value = "An error occurred while updating the card.";
      toast.error(error.value);
    }
  };

  // Supprimer une carte
  const deleteUserCard = async (id) => {
    try {
      await apiClient.delete(`/api/cards/${id}`);
      userCards.value = userCards.value.filter((card) => card.id !== id);
      toast.success("Carte supprimée avec succès!");
    } catch (err) {
      error.value = "Une erreur s'est produite lors de la suppression de la carte.";
      toast.error(error.value);
    }
  };

  return {
    userCards,
    userCard,
    error,
    getUserCards,
    add,
    getUserCard,
    updateUserCard,
    deleteUserCard,
  };
}
