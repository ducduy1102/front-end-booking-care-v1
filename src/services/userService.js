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

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorsService = () => {
  return axios.get("/api/get-all-doctors");
};

const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctor", data);
};

const getDetailInforDoctorService = (doctorId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`);
};

export {
  handleLogin,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getDetailInforDoctorService,
};
