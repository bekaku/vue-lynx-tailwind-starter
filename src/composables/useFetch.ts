/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, shallowRef, type Ref, type ShallowRef } from 'vue';
import { useStorage } from './useStorage';

const _fetch: typeof fetch = globalThis.fetch ?? fetch;
const BASE_URL = 'https://api.hackerwebapp.com';

// 🌟 1. สร้างตัวแปร Global ไว้เก็บสเตตัสและคิว (Module Scope)
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void }> = [];

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

// กำหนด Type ให้ Request ง่ายๆ สไตล์ Axios
interface RequestConfig extends Omit<RequestInit, 'body'> {
    baseUrl?: string;
    body?: any;
    addResponseData?: boolean;
    params?: Record<string, string>;
    _retry?: boolean; // 🌟 2. เพิ่ม Flag ภายในเพื่อป้องกันการ Refresh วนลูปไม่รู้จบ
}

export interface UseApiReturn<T> {
    data: ShallowRef<T | null>;
    isLoading: Ref<boolean>;
    error: Ref<string | null>;
    addedCount: Ref<number>;
    execute: (endpoint: string, config?: RequestConfig) => Promise<T>;
}

export function useFetch<T>(): UseApiReturn<T> {
    const data = shallowRef<T | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const addedCount = ref<number>(0);
    const { getItem, setItem, removeItem } = useStorage();

    const execute = async (endpoint: string, config: RequestConfig = {}): Promise<T> => {
        // ให้โหลดเฉพาะตอนที่ไม่ใช่การ Retry
        if (!config._retry) {
            isLoading.value = true;
            error.value = null;
            addedCount.value = 0;
        }

        try {
            // 1. manage Query Parameters
            let url = `${config.baseUrl || BASE_URL}${endpoint}`;
            if (config.params) {
                const query = new URLSearchParams(config.params).toString();
                url += `?${query}`;
            }

            const token = await getItem('token');
            
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(config.headers as Record<string, string>),
            };

            const body = config.body ? JSON.stringify(config.body) : undefined;

            console.log('useFetch > execute > request', { url, config, headers, body });
            
            const response = await _fetch(url, {
                ...config,
                headers,
                body,
            });
            
            console.log('useFetch > execute > response', response);

            // 🌟 3. ดักจับ Error กู้ชีพ 401
            if (!response.ok) {
                if (response.status === 401 && !config._retry) {
                    
                    // เคส A: ถ้ามีคนกำลัง Refresh อยู่ ให้เอาตัวเองไปเข้าคิวรอ
                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            failedQueue.push({ resolve, reject });
                        }).then((newToken) => {
                            // พอได้ Token ใหม่ปุ๊บ ให้เรียกฟังก์ชันตัวเองซ้ำ (Recursive)
                            config._retry = true;
                            headers.Authorization = `Bearer ${newToken}`;
                            config.headers = headers;
                            return execute(endpoint, config);
                        }).catch((err) => {
                            throw err;
                        });
                    }

                    // เคส B: ตัวแรกที่โดน 401 เป็นหัวหน้าขบวนไปขอ Token
                    config._retry = true;
                    isRefreshing = true;

                    try {
                        const refreshToken = await getItem('refresh_token');
                        if (!refreshToken) throw new Error('No refresh token available');

                        console.log('🔄 useFetch > Refreshing token...');
                        const refreshResponse = await _fetch(`${BASE_URL}/auth/refresh`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ refreshToken })
                        });

                        if (!refreshResponse.ok) {
                            throw new Error('Refresh token expired');
                        }

                        const refreshData = await refreshResponse.json();
                        const newToken = refreshData.token;
                        const newRefreshToken = refreshData.refreshToken;

                        // อัปเดต Storage
                        await setItem('token', newToken);
                        if (newRefreshToken) {
                            await setItem('refresh_token', newRefreshToken);
                        }

                        console.log('✅ useFetch > Refresh token success!');
                        processQueue(null, newToken);

                        // เรียกฟังก์ชันตัวเองซ้ำด้วย Token ใหม่
                        headers.Authorization = `Bearer ${newToken}`;
                        config.headers = headers;
                        return execute(endpoint, config);

                    } catch (refreshErr) {
                        processQueue(refreshErr, null);
                        await removeItem('token');
                        await removeItem('refresh_token');
                        console.error('🚨 Session completely expired. Redirecting to login...');
                        throw refreshErr;
                    } finally {
                        isRefreshing = false;
                    }
                }

                // ถ้าเป็น Error อื่นๆ ที่ไม่ใช่ 401 ให้ Throw ปกติ
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || `HTTP Error: ${response.status}`);
            }

            // 4. การจัดการกรณี Success
            const result = await response.json();
            if (config.addResponseData == undefined || config.addResponseData == true) {
                data.value = result;
            }

            addedCount.value = Array.isArray(result) ? result.length : 1;
            return result;

        } catch (err: any) {
            error.value = err.message || 'A connection error occurred.';
            throw error.value;
        } finally {
            if (!config._retry) {
                isLoading.value = false;
            }
        }
    };

    return { data, isLoading, error, execute, addedCount };
}