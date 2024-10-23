import { ref } from "vue";
import apiClientFormData from "../apiClientFormData";

export function uploadService() {
  // const uploadStatus = ref(null); // To hold the upload status message
  const uploadError = ref(null); // To hold any error message
  const statusCode = ref(null); // To hold the HTTP status code
  const path = ref(null); // To hold the HTTP status code

  const uploadFiles = async (file) => {
    // console.log({ file: file });
    const formData = new FormData();
    formData.append("files[]", file);

    try {
      const response = await apiClientFormData.post("/upload", formData);

      // uploadStatus.value = "Upload successful!"; // Update status message
      statusCode.value = response.status; // Get the HTTP status code
      path.value = response.data;
    } catch (error) {
      uploadError.value = error.response ? error.response.data : error.message; // Capture error message
      statusCode.value = error.response ? error.response.status : 500; // Capture the error status code
    }
  };

  return {
    uploadFiles,
    // uploadStatus,
    uploadError,
    statusCode,
    path,
  };
}
