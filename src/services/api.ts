import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.160.1:8080/v1/",
});
