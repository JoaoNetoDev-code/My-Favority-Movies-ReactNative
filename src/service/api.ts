import axios from "axios";

const api_key = "ab0bdf33cfdd51cfc205592ca2321dec";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key,
    language: "pt-BR",
    include_adult: true,
  },
});

export default api;
