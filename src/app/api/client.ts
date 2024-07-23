import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Define base URL for your API
const baseURL = 'https://api.example.com/api/Customer/';

// Create an Axios instance with custom configurations
const axiosInstance = axios.create({
    baseURL,
    timeout: 10000, // Timeout in milliseconds (10 seconds)
    headers: {
        'Content-Type': 'multipart/form-data',
        // Add any other headers you need
    },
});

// Interface for response data structure
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

// HTTP GET method
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await axiosInstance.get<T>(url, config);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// HTTP POST method
export const post = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await axiosInstance.post<T>(url, data, config);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// HTTP PUT method
export const put = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await axiosInstance.put<T>(url, data, config);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// HTTP DELETE method
export const remove = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await axiosInstance.delete<T>(url, config);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
