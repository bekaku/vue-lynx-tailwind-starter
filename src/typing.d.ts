/* eslint-disable @typescript-eslint/no-explicit-any */
declare const lynx: any;
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
  DeviceInfoModule: {
    getStatusBarHeight(callback: (value: string | number) => void): void;
    getSafeAreaBottom(callback: (value: string | number) => void): void;
    setStatusBarStyle(
      colorHex: string,
      isDarkText: boolean,
      callback?: (success: boolean) => void
    ): void;
  }
  ImagePickerModule: {
    pickImage(): Promise<string>;
    pickMultipleImages(): Promise<string[]>;
  }
};
declare const SystemInfo: {
  /**
   * The version of the Lynx Engine.
   *
   * @example '3.2'
   */
  readonly engineVersion: string;

  /**
   * The version of the Lynx Engine.
   * @example '3.2'
   * @deprecated Use `SystemInfo.engineVersion` instead
   */
  readonly lynxSdkVersion: string;

  /**
   * The current operating system version.
   */
  readonly osVersion: string;

  /**
   * The physical pixel height of the real device.
   */
  readonly pixelHeight: number;

  /**
   * The physical pixel width of the real device.
   */
  readonly pixelWidth: number;

  /**
   * The physical pixel ratio of the main screen.
   */
  readonly pixelRatio: number;

  /**
   * The platform of the current device.
   */
  readonly platform: 'Android' | 'iOS' | 'macOS' | 'windows' | 'headless' | 'web';

  /**
   * The JavaScript engine currently used.
   * @note Not avaliable in lepus
   */
  readonly runtimeType: 'v8' | 'jsc' | 'quickjs';
};