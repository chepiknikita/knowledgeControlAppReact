import axios, { AxiosInstance } from "axios";

export default class ApiClient {
  instance: AxiosInstance;

  private isRefreshing = false;
  private refreshQueue: Array<(token: string) => void> = [];

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 5000,
      headers: { "Content-Type": "application/json" },
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
          return Promise.reject(error);
        }

        if (this.isRefreshing) {
          return new Promise((resolve) => {
            this.refreshQueue.push((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(this.instance(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        this.isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) throw new Error("No refresh token");

          const response = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          this.refreshQueue.forEach((cb) => cb(accessToken));
          this.refreshQueue = [];

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return this.instance(originalRequest);
        } catch (refreshError) {
          this.refreshQueue = [];
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          this.isRefreshing = false;
        }
      }
    );
  }
}
