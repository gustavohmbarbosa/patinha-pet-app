import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.20.241.202:8080/v1/",
});
