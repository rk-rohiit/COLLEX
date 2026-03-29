import api from "./api";

export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);

  return {
    success: data.success,
    message: data.message,
    user: data.data.user,
    token: data.data.token,
  };
};