import apiClient from "./apiClient.js";
import { ref } from "vue";

export default function useCheckAuth() {
  const user = ref();
  const projects = ref();
  const groups = ref();
  const accounts = ref();
  const rechargements = ref();

  const error = ref();
  const statusCode = ref();

  const getUser = (token) => {
    // alert(token);
    apiClient
      .get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          user.value = response.data;
          statusCode.value = response.status;

          projects.value = response.data.projects;
          groups.value = response.data.groups;
          accounts.value = response.data.accounts;
          rechargements.value = response.data.rechargements;

          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          console.log({
            projects: response.data.projects,
            groups: response.data.groups,
            accounts: response.data.accounts,
            rechargements: response.data.rechargements,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        error.value = error?.response?.data || error?.message;
        console.log(error?.response?.status);
        statusCode.value = error?.response?.status;
      });
  };

  return {
    getUser,
    error,
    statusCode,
    user,
    projects,
    groups,
    accounts,
    rechargements,
  };
}
