import axios from "axios";

const api = axios.create({
  baseURL: "https://note-taking-app-1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
