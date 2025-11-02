import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "http://crud-java.tupikov.me/api";

export const external = axios.create({
  baseURL,
  timeout: 10000,
});
