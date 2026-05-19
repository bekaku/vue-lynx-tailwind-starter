export const useDevice = () => {
    const isAndroid = SystemInfo.platform === 'Android';
    const isIos = SystemInfo.platform === 'iOS';
    const isWeb = SystemInfo.platform === 'web';
    const isNative = SystemInfo.platform === 'iOS' || SystemInfo.platform === 'Android';
    const platform = SystemInfo.platform;
    const isNativeAvailable = typeof NativeModules !== 'undefined' && !!NativeModules.NativeLocalStorageModule;

    return {
        isNative,
        isNativeAvailable,
        platform,
        isAndroid,
        isIos,
        isWeb
    };
}