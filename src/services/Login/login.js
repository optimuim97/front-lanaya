import { useUserStore } from "@/stores/useUserStore.js";
import apiClient from "../apiClient.js";
import { ref } from "vue";
import { EventBus } from "@/utils/eventBus.js";

export default function useAuth() {
  const error = ref(null);
  const token = ref("");
  const statusCode = ref(null);
  const store = useUserStore();

  const sendData = (params, valueAdded) => {
    console.info({
      params: params,
      valueAdded: valueAdded,
    });
    EventBus[params] = valueAdded;
  };

  const signIn = async (userData) => {
    try {
      const response = await apiClient.post("/sign-in", userData);

      token.value = response.data.token;
      statusCode.value = response.status;
      store.setToken(response.data.token);
    //   localStorage.setItem("token", response.data.token);
      sendData("token", token.value);
      // Stocker le token et les informations de l'utilisateur
      //   AppStorage.storeToken(response.data.token);
      //   AppStorage.storeUser(
      //     response.data.user.id,
      //     response.data.user.email,
      //     response.data.user.name
      //   );

      return { success: true, user: response.data.user };
    } catch (e) {
      error.value = e?.response?.data || e.message;
      statusCode.value = e?.response?.status;

      return { success: false, error: error.value };
    }
  };

  return {
    signIn,
    error,
    token,
    statusCode,
  };
}
