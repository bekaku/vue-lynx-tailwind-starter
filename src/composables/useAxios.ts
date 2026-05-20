/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, shallowRef, type Ref, type ShallowRef } from 'vue';
import { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { axiosInstance } from '../plugins/axios'; // 🌟 นำเข้า instance ที่ตั้งค่าเสร็จแล้วมาใช้

interface RequestConfig extends AxiosRequestConfig {
    addResponseData?: boolean;
}

export interface UseApiReturn<T> {
    data: ShallowRef<T | null>;
    isLoading: Ref<boolean>;
    error: Ref<string | null>;
    addedCount: Ref<number>;
    execute: (endpoint: string, config?: RequestConfig) => Promise<T>;
}

export function useAxios<T>(): UseApiReturn<T> {
    const data = shallowRef<T | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const addedCount = ref<number>(0);

    const execute = async (endpoint: string, config: RequestConfig = {}): Promise<T> => {
        isLoading.value = true;
        error.value = null;
        addedCount.value = 0;

        try {
            console.log('useAxios > execute', { endpoint, config });

            // 🌟 ยิงผ่าน instance กลางที่มีระเบียบวินัยดักหัวท้ายเรียบร้อยแล้ว
            const response: AxiosResponse<T> = await axiosInstance.request({
                url: endpoint,
                ...config,
            });

            const result = response.data;

            if (config.addResponseData === undefined || config.addResponseData === true) {
                data.value = result;
            }

            addedCount.value = Array.isArray(result) ? result.length : 1;
            return result;

        } catch (err: any) {
            error.value = err.response?.data?.message || err.message || 'An HTTP error occurred.';
            throw error.value;
        } finally {
            isLoading.value = false;
        }
    };

    return { data, isLoading, error, execute, addedCount };
}