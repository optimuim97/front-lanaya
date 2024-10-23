import { ref } from "vue";
import apiClient from "../apiClient.js";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

export default function useProject() {
  const router = useRouter();
  const projects = ref([]);
  const project = ref();
  const error = ref();
  const statusCode = ref();
  //   const agent = ref();
  const loading = ref(false);
  const isLoading = ref(false);

  const getProjects = async () => {
    isLoading.value = true;

    await apiClient
      .get("projects")
      .then(({ data, status }) => {
        statusCode.value = status;
        if (status == 200 && data?.status == 200) {
          projects.value = data.data;
          //   toast.success("Projets chargés avec succès !"); // Notification succès
        }
      })
      .catch((e) => {
        error.value = e;
        statusCode.value = e?.response?.status;
        toast.error("Erreur lors du chargement des projets."); // Notification erreur
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  const postProject = async (postedData) => {
    loading.value = true;
    const formData = new FormData();

    formData.append(
      "business_sector_id",
      parseInt(postedData.business_sector_id)
    );
    formData.append("title", postedData.title);
    formData.append("description", postedData.description);
    formData.append("start_date", postedData.start_date);
    formData.append("end_date", postedData.end_date);
    formData.append("status", postedData.status);
    formData.append("budget", postedData.budget);
    formData.append("customer_id", postedData.customer_id ?? 1);
    formData.append("user_id", postedData.user_id);
    formData.append("progress", postedData.progress);
    formData.append("cover", postedData.cover);

    await apiClient
      .post("projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data, status }) => {
        if (status == 200 && data?.status == 200) {
          projects.value.push(data.data);
          toast.success("Projet ajouté avec succès !"); // Notification succès
          router.push('/dashboard');
        }
      })
      .catch((e) => {
        error.value = e;
        toast.error("Erreur lors de l'ajout du projet."); // Notification erreur
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const updateProjects = async (postedData) => {
    loading.value = true;

    await apiClient
      .put(`projects/${postedData.id}`, postedData)
      .then(({ data, status }) => {
        if (status == 200 && data?.status == 200) {
          project.value = data.data; // Assure-toi que tu mets à jour correctement
          toast.success("Projet mis à jour avec succès !"); // Notification succès
        }
      })
      .catch((e) => {
        error.value = e;
        toast.error("Erreur lors de la mise à jour du projet."); // Notification erreur
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const showProject = async (slug) => {
    loading.value = true;

    await apiClient
      .get(`projects/${slug}`)
      .then(({ data, status }) => {
        if (status == 200 && data?.status == 200) {
          project.value = data.data;
          toast.success("Projet chargé avec succès !"); // Notification succès
        }
      })
      .catch((e) => {
        error.value = e;
        toast.error("Erreur lors du chargement du projet."); // Notification erreur
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
    error,
    projects,
    loading,
    isLoading,
    statusCode,
    project,
    getProjects,
    postProject,
    updateProjects,
    showProject,
  };
}
