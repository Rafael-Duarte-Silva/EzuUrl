import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const api = (axios: AxiosInstance) => {
    return {
        post: function <T, S>(
            endpoint: string,
            data?: S,
            config: AxiosRequestConfig = {},
        ) {
            return axios.post<T>(endpoint, data, config);
        },
    };
};

export default api(axiosInstance);

