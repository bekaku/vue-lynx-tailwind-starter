/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useStorage } from '@/composables/useStorage'; // ปรับ path ตามโปรเจกต์ของคุณ
const lynxFetch = globalThis.fetch ?? fetch;
const BASE_URL = 'https://api.hackerwebapp.com';
// 🌟 สเตตัสคิวสำหรับกรณี Refresh Token พร้อมกันหลายเส้น
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// 🌟 สร้างและตั้งค่าเริ่มต้นให้กับ Axios Instance
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    adapter: async (config) => {
        return new Promise((resolve, reject) => {
            const fullUrl = `${config.baseURL || ''}${config.url || ''}`;

            // 🌟 กลับมาใช้ท่าไม้ตายดั้งเดิมของคุณชนวีร์ ปลอดภัยและไม่ระเบิดใน TS ครับ
            let urlWithParams = fullUrl;
            if (config.params) {
                const query = new URLSearchParams(config.params as Record<string, string>).toString();
                urlWithParams += `?${query}`;
            }

            lynxFetch(urlWithParams, {
                method: config.method?.toUpperCase(),
                headers: config.headers as any,
                body: config.data ? JSON.stringify(config.data) : undefined,
            })
                .then(async (response) => {
                    const responseData = await response.json().catch(() => ({}));

                    const axiosResponse = {
                        data: responseData,
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers as any,
                        config: config,
                        request: null,
                    };

                    if (response.ok) {
                        resolve(axiosResponse);
                    } else {
                        reject(new axios.AxiosError(
                            `Request failed with status code ${response.status}`,
                            [axios.AxiosError.ERR_BAD_RESPONSE, axios.AxiosError.ERR_BAD_REQUEST][response.status >= 500 ? 0 : 1],
                            config,
                            null,
                            axiosResponse
                        ));
                    }
                })
                .catch((err) => {
                    reject(new axios.AxiosError(err.message, axios.AxiosError.ERR_NETWORK, config));
                });
        });
    }
});

// ⚡ REQUEST INTERCEPTOR: ขาออก (เติม Token อัตโนมัติ)
axiosInstance.interceptors.request.use(
    async (config) => {
        const { getItem } = useStorage();
        const token = await getItem('token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ⚡ RESPONSE INTERCEPTOR: ขากลับ (ดักจับ 401 เพื่อกู้ชีพ Token)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const { getItem, setItem, removeItem } = useStorage();

        if (error.response?.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = await getItem('refresh_token');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                console.log('🔄 Axios Plugin > Refreshing token...');
                const res = await axios.post(`${BASE_URL}/auth/refresh`, {
                    refreshToken: refreshToken
                });

                const newToken = res.data.token;
                const newRefreshToken = res.data.refreshToken;

                await setItem('token', newToken);
                if (newRefreshToken) {
                    await setItem('refresh_token', newRefreshToken);
                }

                console.log('✅ Axios Plugin > Refresh token success!');
                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError, null);
                await removeItem('token');
                await removeItem('refresh_token');
                console.error('🚨 Session completely expired. Redirecting to login...');
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);