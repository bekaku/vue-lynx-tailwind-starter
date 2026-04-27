import { useThemeStore } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';

export const useTheme = () => {
  const themeStore = useThemeStore();
  const { isDark, themeClass } = storeToRefs(themeStore)
  return {
    isDark,
    themeClass
  };
};
