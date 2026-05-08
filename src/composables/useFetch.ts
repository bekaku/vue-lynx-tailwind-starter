/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, shallowRef, type Ref, type ShallowRef } from 'vue';
import { useStorage } from './useStorage';
const _fetch: typeof fetch = globalThis.fetch ?? fetch;
const BASE_URL = 'https://api.hackerwebapp.com';

// กำหนด Type ให้ Request ง่ายๆ สไตล์ Axios
interface RequestConfig extends Omit<RequestInit, 'body'> {
    baseUrl?: string;
    body?: any;
    params?: Record<string, string>;
}
export interface UseApiReturn<T> {
    data: ShallowRef<T | null>;
    isLoading: Ref<boolean>;
    error: Ref<string | null>;
    execute: (endpoint: string, config?: RequestConfig) => Promise<T>;
}
export function useFetch<T>(): UseApiReturn<T> {
    const data = shallowRef<T | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const { getItem } = useStorage();

    const execute = async (endpoint: string, config: RequestConfig = {}) => {
        isLoading.value = true;
        error.value = null;

        try {
            // 1. จัดการ Query Parameters (?id=1&name=test)
            let url = `${config.baseUrl || BASE_URL}${endpoint}`;
            if (config.params) {
                const query = new URLSearchParams(config.params).toString();
                url += `?${query}`;
            }

            const token = await getItem('token');
            // const token = '';
            const headers = {
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
            console.log('useFetch > execute> response', response);

            if (!response.ok) {
                if (response.status === 401) {
                    console.error('Your session has expired. Please log in again.');
                }

                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || `HTTP Error: ${response.status}`);
            }

            const result = await response.json();
            data.value = result;
            return result;

        } catch (err: any) {
            error.value = err.message || 'A connection error occurred.';
            throw error.value;
        } finally {
            isLoading.value = false;
        }
    };

    return { data, isLoading, error, execute };
};
