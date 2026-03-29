import axios from "./axios";

export const submitContactAPI = (data) =>
  axios.post("/contact", data);