import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.25.8:8080/v1/",
});
