import axios from "axios";

let token = localStorage.getItem("token");
// process.env.VUE_APP_API_URL
const apiClientFormData = axios.create({
  // baseURL: import.meta.env.VUE_APP_API_URL,
  baseURL: process.env.VUE_APP_API_URL,
  // Set your base URI here
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

export default apiClientFormData;