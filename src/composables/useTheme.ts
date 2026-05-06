/* eslint-disable @typescript-eslint/no-explicit-any */
import { useThemeStore } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';
import { useBase } from './useBase';
import type { ThemeName } from '@/types/common';
import { useStorage } from './useStorage';

export const useTheme = () => {
  const themeStore = useThemeStore();
  const { isNativeAvailable } = useBase()
  const { setTheme } = themeStore;
  const { isDark, themeClass } = storeToRefs(themeStore)
  const { setItem, getItem } = useStorage();
  const themeNameAtt = 'theme';
  const onInit = async () => {
    const themeName: any = await getItem(themeNameAtt) || 'light';
    onSetTheme(themeName);
  }
  const onSetTheme = (name: ThemeName) => {
    setTheme(name)
    setItem(themeNameAtt, name);
    if (name == 'dark') {
      onSetStatusStyle('#18181b', false)
    } else {
      onSetStatusStyle('#FFFFFF', true)
    }

  }
  const onSetStatusStyle = (colorHex: string, isDarkText: boolean) => {
    if (isNativeAvailable) {
      NativeModules.DeviceInfoModule.setStatusBarStyle(colorHex, isDarkText, (value: boolean) => {
        console.log('setStatusBarStyle', value)
      });
    }
  }
  return {
    isDark,
    themeClass,
    onSetTheme,
    onSetStatusStyle,
    onInit
  };
};
