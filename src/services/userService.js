import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (userData) => {
  return axios.post("/api/create-new-user", {
    ...userData,
  });
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

const editUserService = (userData) => {
  return axios.put("/api/edit-user", userData);
};

const getAllCodeService = (type) => {
  return axios.get(`/api/allcode?type=${type}`);
};

export {
  handleLogin,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
};
