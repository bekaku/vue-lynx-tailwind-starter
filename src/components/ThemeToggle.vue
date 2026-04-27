<script setup lang="ts">
import Toggle from '@/components/ui/Toggle.vue';
import { useThemeStore } from '@/stores/themeStore';
import { onMounted, ref } from 'vue-lynx';
const themeStore = useThemeStore();
const { setTheme, themeNames } = themeStore;
const darkEnabled = ref(themeStore.isDark);
const toggleTheme = (dark: boolean) => {
  setTheme(darkEnabled.value ? 'dark' : 'light');
};
</script>
<template>
  <view>
    <slot>
      <Toggle v-model="darkEnabled" @tab="toggleTheme" />
    </slot>
  </view>
</template>
