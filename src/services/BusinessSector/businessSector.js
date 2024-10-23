import { ref } from "vue";
import apiClient from "../apiClient.js";

export default function useBusinessSectors() {
    const businessSectors = ref([]);
    const businessSector = ref();
    const error = ref(null);
    const statusCode = ref(null);
    const loading = ref(false);

    // Fonction pour gérer les réponses
    const handleResponse = (response, successCallback) => {
        const { data, status } = response;
        statusCode.value = status;

        if (status === 200 && data?.status === 200) {
            successCallback(data);
        } else {
            error.value = `Erreur ${status}: ${data?.message || "Inconnue"}`;
        }
    };

    // Fonction pour gérer les erreurs
    const handleError = (e) => {
        error.value = e?.response?.data?.message || "Une erreur est survenue";
        statusCode.value = e?.response?.status || 500;
    };

    const getBusinessSectors = async () => {
        loading.value = true;
        try {
            const response = await apiClient.get("/business-sectors");
            handleResponse(response, (data) => {
                businessSectors.value = data.data;
            });
        } catch (e) {
            handleError(e);
        } finally {
            loading.value = false;
        }
    };

    const postBusinessSectors = async (postedData) => {
        loading.value = true;
        try {
            const response = await apiClient.post(
                "/business-sectors",
                postedData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            handleResponse(response, (data) => {
                businessSectors.value.push(data.data);
            });
        } catch (e) {
            handleError(e);
        } finally {
            loading.value = false;
        }
    };

    const updateBusinessSectors = async (postedData) => {
        loading.value = true;
        try {
            const response = await apiClient.put(
                `/business-sectors/${postedData.id}`,
                postedData
            );
            handleResponse(response, (data) => {
                businessSector.value = data.data;
            });
        } catch (e) {
            handleError(e);
        } finally {
            loading.value = false;
        }
    };

    const showBusinessSector = async (slug) => {
        loading.value = true;
        try {
            const response = await apiClient.get(`/business-sectors/${slug}`);
            handleResponse(response, (data) => {
                businessSector.value = data.data;
            });
        } catch (e) {
            handleError(e);
        } finally {
            loading.value = false;
        }
    };

    return {
        error,
        businessSectors,
        businessSector,
        loading,
        getBusinessSectors,
        postBusinessSectors,
        updateBusinessSectors,
        showBusinessSector,
    };
}
