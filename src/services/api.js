import axios from "axios";

const api = axios.create({
  baseURL: "https://jstudio-leads-backend.onrender.com/api",
});

export default api;