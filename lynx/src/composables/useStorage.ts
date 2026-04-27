export const useStorage = () => {
    const isAvailable = typeof NativeModules !== 'undefined' && !!NativeModules.NativeLocalStorageModule;
    const memoryFallback: Record<string, string> = {};

    const setItem = (key: string, value: string): void => {
        if (isAvailable) {
            NativeModules.NativeLocalStorageModule.setStorageItem(key, value);
        } else {
            console.log(`[Storage] Fallback: Saving '${key}' to memory.`);
            memoryFallback[key] = value;
        }
    };

    const getItem = (key: string): Promise<string | null> => {
        return new Promise((resolve) => {
            if (isAvailable) {
                NativeModules.NativeLocalStorageModule.getStorageItem(key, (value: string) => {
                    resolve(value);
                });
            } else {
                console.log(`[Storage] Fallback: Reading '${key}' from memory.`);
                resolve(memoryFallback[key] || null);
            }
        });
    };

    const removeItem = (key: string): Promise<boolean> => {
        return new Promise((resolve) => {
            if (isAvailable) {
                NativeModules.NativeLocalStorageModule.removeStorageItem(key, (success: boolean) => {
                    resolve(success);
                });
            } else {
                console.log(`[Storage] Fallback: Removing '${key}' from memory.`);
                delete memoryFallback[key];
                resolve(true);
            }
        });
    };

    const clear = (): void => {
        if (isAvailable) {
            NativeModules.NativeLocalStorageModule.clearStorage();
        } else {
            console.log('[Storage] Fallback: Clearing memory storage.');
            for (const key in memoryFallback) {
                delete memoryFallback[key];
            }
        }
    };
    return {
        setItem,
        getItem,
        removeItem,
        clear,
        isAvailable
    };
}