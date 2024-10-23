import { ref } from "vue";
import apiClient from "../apiClient.js";

export default function () {
    const solde = ref();

    const error = ref();
    const statusCode = ref();
    const loading = ref(false);

    const handleResponse = (response, successCallback) => {
        const { data, status } = response;
        statusCode.value = status;
        if (status === 200 && data?.status === 200) {
            successCallback(data);
        } else {
            error.value = `Erreur ${status}: ${data?.message || "Inconnue"}`;
        }
    };

    const handleError = (e) => {
        error.value = e?.response?.data?.message || "Une erreur est survenue";
        statusCode.value = e?.response?.status || 500;
    };

    const recharger = async (postedData) => {
        loading.value = true;
        try {
            const response = await apiClient.post(
                "/recharger-wallet",
                postedData
            );
            handleResponse(response, (data) => {
                solde.value = data.data.solde;
                console.log({solde})
            });
        } catch (e) {
            handleError(e);
        } finally {
            loading.value = false;
        }
    };

    return {
        error,
        loading,
        solde,
        statusCode,
        recharger
    };
}
