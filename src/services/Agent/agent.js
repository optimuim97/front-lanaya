import { ref } from "vue";
import apiClient from "../apiClient.js";

export default function useAgents() {
    const agent = ref();
    const agents = ref([]);
    const error = ref(null);
    const statusCode = ref(null);
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

    const getAgents = async () => {
        loading.value = true;
        try {
            const response = await apiClient.get("/agents");
            handleResponse(response, (data) => {
                agents.value = data.data;
            });
        } catch (e) {
            handleError(e);
        } finally {
            loading.value = false;
        }
    };

    const postAgent = async (postedData) => {
        loading.value = true;
        try {
            const response = await apiClient.post("/agents", postedData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            handleResponse(response, (data) => {
                agents.value.push(data.data);
            });
        } catch (e) {
            handleError(e);
        } finally {
            loading.value = false;
        }
    };

    const addAgentToProject = async (postedData) => {
        loading.value = true;
        try {
            const response = await apiClient.post(
                "/add-agent-to-project",
                postedData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            handleResponse(response, (data) => {
                agents.value.push(data.data);
            });
        } catch (e) {
            handleError(e);
        } finally {
            loading.value = false;
        }
    };

    const updateAgent = async (postedData) => {
        loading.value = true;
        try {
            const response = await apiClient.post(
                `/agents/${postedData.id}`,
                postedData
            );
            handleResponse(response, (data) => {
                agent.value = data.data;
            });
        } catch (e) {
            handleError(e);
        } finally {
            loading.value = false;
        }
    };

    const showAgent = async (id) => {
        loading.value = true;
        try {
            const response = await apiClient.get(`/agents/${id}`);
            handleResponse(response, (data) => {
                agent.value = data.data;
            });
        } catch (e) {
            handleError(e);
        } finally {
            loading.value = false;
        }
    };

    return {
        agent,
        agents,
        error,
        loading,
        statusCode,
        getAgents,
        postAgent,
        addAgentToProject,
        updateAgent,
        showAgent,
    };
}
