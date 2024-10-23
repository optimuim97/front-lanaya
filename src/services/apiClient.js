import axios from "axios";

let token = localStorage.getItem("token");

// process.env.VUE_APP_API_URL
const apiClient = axios.create({
  // baseURL: import.meta.env.VUE_APP_API_URL,
  baseURL: process.env.VUE_APP_API_URL,
  // Set your base URI here
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default apiClient;
