import axios from "axios";
import { TokenService } from "./tokenService";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

class APIService {
  constructor() {
    if (TokenService.getToken()) {
      API.defaults.headers.Authorization = `Token ${TokenService.getToken()}`;
    }
    this.API = API;
  }

  get(path) {
    return this.API.get(path);
  }

  post(path, data) {
    return this.API.post(path, data);
  }
}

export default new APIService();
