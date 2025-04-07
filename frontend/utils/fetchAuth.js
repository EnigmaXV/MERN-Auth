import axios from "axios";

export const fetchAuth = axios.create({
  baseURL: "http://localhost:3000/api/v1/auth",
});
