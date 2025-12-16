import axios, { AxiosInstance } from "axios";

export default class ApiClient {
  api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 5000,
      headers: { "Content-Type": "application/json" },
    });

    this.api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // this.api.interceptors.response.use((response) => response, async (error) => {
    //     const originalRequest = error.config;

    //     if (error.response?.status === 401 && !originalRequest._retry) {
    //       originalRequest._retry = true;

    //       try {
    //         const refreshToken = localStorage.getItem("refreshToken");
    //         const response = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
    //         const { token, refreshToken: newRefreshToken } = response.data;

    //         localStorage.setItem("token", token);
    //         localStorage.setItem("refreshToken", newRefreshToken);

    //         originalRequest.headers.Authorization = `Bearer ${token}`;
    //         return this.api(originalRequest);
    //       } catch (refreshError) {
    //         localStorage.removeItem("token");
    //         localStorage.removeItem("refreshToken");
    //         localStorage.removeItem("user");
    //         window.location.href = "/login";
    //         return Promise.reject(refreshError);
    //       }
    //     }

    //     return Promise.reject(error);
    //   }
    // );
  }
}
