export const useDevice = () => {
    const isAndroid = SystemInfo.platform === 'Android';
    const isIos = SystemInfo.platform === 'iOS';
    const isWeb = SystemInfo.platform === 'web';
    const platform = SystemInfo.platform;
    const isNative = isIos || isAndroid;
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