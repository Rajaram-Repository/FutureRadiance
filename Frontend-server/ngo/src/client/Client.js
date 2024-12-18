import axios from "axios";
import config from "../config/Config";
import { getAccessTokenUsingRefreshToken } from "../store/auth/AuthService";

const { apiBaseUrl } = config || {};

class Client {
  constructor() {
    this.client = axios.create({
      baseURL: apiBaseUrl,
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token") || "";
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          localStorage.removeItem("token");
          delete this.client.defaults.headers.common["Authorization"];
          const param = {
            refreshToken: localStorage.getItem("refreshToken"),
          };
          try {
            const newToken = await getAccessTokenUsingRefreshToken(param);

            this.client.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            return this.client(originalRequest);
          } catch (error) {
            console.log("Token refresh failed, redirecting to login...", error);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  post(url, requestBody = null, contentType = "application/json") {
    return this.client.post(url, requestBody, {
      headers: {
        contentType: contentType,
      },
    });
  }

  get(url, params, contentType = "application/json") {
    return this.client.get(url, {
      params: { ...params },
      headers: {
        contentType: contentType,
      },
    });
  }

  put(url, requestBody, contentType = "application/json") {
    const params = {};
    return this.client.put(url, requestBody, {
      params: { ...params },
      headers: {
        contentType: contentType,
      },
    });
  }

  delete(url, params, contentType = "application/json") {
    return this.client.delete(url, {
      params: { ...params },
      headers: {
        contentType: contentType,
      },
    });
  }
}

export default new Client();
