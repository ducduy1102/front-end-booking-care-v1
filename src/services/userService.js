import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getALLUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

export { handleLogin, getALLUsers };
