import { ref } from 'vue';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { ThemeName } from '@/types/common';

export const useThemeStore = defineStore('themeStore', () => {
  const themeNames: ThemeName[] = ['dark', 'light'];

  const currentTheme = ref<ThemeName>('light');

  const themeClass = computed(() => `theme-${currentTheme.value}`);
  const isDark = computed<boolean>(() => currentTheme.value === 'dark');

  function setTheme(name: ThemeName) {
    currentTheme.value = name;
  }

  return { currentTheme, setTheme, themeClass, themeNames, isDark };
});
