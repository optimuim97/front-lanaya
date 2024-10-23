  import { ref } from "vue";
  import apiClient from "../apiClient.js";

  export default function useProjectType() {
    const projectTypes = ref([]);
    const projectType = ref();
    const error = ref();
    const statusCode = ref();

    const loading = ref(false);
    const isLoading = ref(false);

    const getProjectTypes = async () => {
      isLoading.value = true;
      // loading.value = true;

      await apiClient
        .get("/project-types")
        .then(({ data, status, code }) => {
          statusCode.value = status;
          // projectTypes.value = data.data;
          if (status == 200) {
            if (data?.status == 200) {
              projectTypes.value = data.data;
              console.log({ projectTypes });
            }
          } else if (code == 500) {
            error.value = code;
            // console.log(code);
          } else if (code == 401) {
            error.value = code;
            // console.log(code);
          } else if (code == 404) {
            error.value = code;
            // console.log(code);
          }
          isLoading.value = false;
          // loading.value = false;
        })
        .catch((e) => {
          // console.log({ e: e });
          error.value = e;
          statusCode.value = e?.response?.status;
        })
        .finally(() => {
          isLoading.value = false;
          // loading.value = false;
        });
    };

    const getProjectTypesLimited = async (limit, order) => {
      isLoading.value = true;
      // loading.value = true;

      await apiClient
        .get("/project-types-limited", {
          params: {
            limit: limit ?? 3,
            order: order ?? "DESC",
          },
        })
        .then(({ data, status, code }) => {
          statusCode.value = status;
          // projectTypes.value = data.data;
          if (status == 200) {
            if (data?.status == 200) {
              projectTypes.value = data.data;
            }
          } else if (code == 500) {
            error.value = code;
            // console.log(code);
          } else if (code == 401) {
            error.value = code;
            // console.log(code);
          } else if (code == 404) {
            error.value = code;
            // console.log(code);
          }
          isLoading.value = false;
          // loading.value = false;
        })
        .catch((e) => {
          // console.log({ e: e });
          error.value = e;
          statusCode.value = e?.response?.status;
        })
        .finally(() => {
          isLoading.value = false;
          // loading.value = false;
        });
    };

    const postProjectTypes = async (postedData) => {
      loading.value = true;

      await apiClient
        .post("/add-project-type", postedData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data, status, code }) => {
          if (status == 200) {
            if (data?.status == 200) {
              projectType.value.push(data.data);
              console.log({ result: data.data });
            }
          } else if (code == 500) {
            console.log({ code: code });
          } else if (code == 401) {
            console.log({ code: code });
          } else if (code == 404) {
            console.log({ code: code });
          }
          isLoading.value = false;
          loading.value = false;
        })
        .catch((e) => {
          error.value = e;
          console.log({ error: e });
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const updateProjectTypes = async (postedData) => {
      loading.value = true;
      console.log({ postedData: postedData });

      await apiClient
        .post(`/update-project-type/${postedData.id}`, postedData)
        .then(({ data, status, code }) => {
          if (status == 200) {
            if (data?.status == 200) {
              projectType.value.push(data.data);
              console.log({ result: data.data });
            }
          } else if (code == 500) {
            console.log({ code: code });
          } else if (code == 401) {
            console.log({ code: code });
          } else if (code == 404) {
            console.log({ code: code });
          }
          isLoading.value = false;
          loading.value = false;
        })
        .catch((e) => {
          console.log({ error: e });
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const showProjectType = async (slug) => {
      loading.value = true;

      await apiClient
        .get(`/project-types/${slug}`)
        .then(({ data, status, code }) => {
          if (status == 200) {
            if (data?.status == 200) {
              projectType.value = data.data;
              console.log({ result: data.data });
            }
          } else if (code == 500) {
            console.log({ code: code });
          } else if (code == 401) {
            console.log({ code: code });
          } else if (code == 404) {
            console.log({ code: code });
          }
          isLoading.value = false;
          loading.value = false;
        })
        .catch((e) => {
          console.log({ error: e });
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      error,
      projectTypes,
      loading,
      isLoading,
      projectType,
      getProjectTypes,
      postProjectTypes,
      updateProjectTypes,
      showProjectType,
      getProjectTypesLimited,
    };
  }
