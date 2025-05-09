import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
});
