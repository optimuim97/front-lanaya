import { ref } from "vue";
import { toast } from "vue3-toastify";
import apiClient from "../apiClient";

export default function updateUser() {

  const error = ref(null);
  const statusCode = ref(null);

  // Ajouter une nouvelle carte
  const update = async (userData) => {
    try {

      const response = await apiClient.post("/update-user", userData);
      statusCode.value = response.status;
      toast.success('Mise à jour éffectué');  

    } catch (error) {

      error.value = "Une erreur s'est produite lors de l'ajout de la carte";
      toast.error(error.value);
      
    }
  };

  return {
    statusCode,
    error,
    update,
  };

}
