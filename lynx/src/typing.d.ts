declare let NativeModules: {
  NativeLocalStorageModule: {
    setStorageItem(key: string, value: string): void;
    removeStorageItem(key: string, callback: (success: boolean) => void): void;
    getStorageItem(key: string, callback: (value: string) => void): void;
    clearStorage(): void;
  };
  AppModule: {
    exitApp(): void
  }
};