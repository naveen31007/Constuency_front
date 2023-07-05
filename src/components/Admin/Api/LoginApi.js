import api from "./BaseUrl";

const login = (data) =>
   api.post("http://localhost:5211/api/panel/adminLogin", data);

export default {
  login,
};
