import { accessToken, dbcode } from "@redux/userSlice";
import axios from "axios";
import store from "store";

const dbCode = dbcode(store.getState());
export const AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    company: dbCode ? dbCode : "",
  },
});

export const AxiosInstanceWithoutLoader = axios.create({
  headers: {
    "Content-Type": "application/json",
    company: dbCode ? dbCode : "",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = accessToken(store.getState());
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (!String(originalConfig.url)?.includes("auth/login") && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          return AxiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

AxiosInstanceWithoutLoader.interceptors.request.use(
  (config) => {
    const token = accessToken(store.getState());
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstanceWithoutLoader.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (!String(originalConfig.url)?.includes("auth/login") && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          return AxiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);
