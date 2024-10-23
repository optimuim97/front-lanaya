import apiClient from "../apiClient.js";
import { ref } from "vue";

export default function () {
  const error = ref();
  const token = ref("");
  const statusCode = ref();

  const signUp = async (userData) => {
    try {
      userData.role_id = 1;
      console.log({ userData: userData });
      const response = await apiClient.post("/sign-up", userData);
      console.log("response >------------------->");
      console.log(response);

      console.log({ responseData: response.data });
      token.value = response.data.token;
      statusCode.value = response.status;

      console.log("error res ------------------------");
      console.log(response);
    } catch (e) {
      console.log("error ------------------------");
      console.log(e);

      statusCode.value = e?.status;
    //   alert(e?.status);
        error.value = e?.response ? e?.response?.data : e?.message;
      //   throw e?.response ? e?.response.data : e?.message;
    }
  };

  return {
    signUp,
    error,
    token,
    statusCode,
  };
}
