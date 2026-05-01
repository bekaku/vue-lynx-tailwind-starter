<script setup lang="ts">
import BaseToggle from '@/components/base/BaseToggle.vue';
import { useThemeStore } from '@/stores/themeStore';
import { ref } from 'vue-lynx';
const themeStore = useThemeStore();
const { setTheme, themeNames } = themeStore;

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {},
);
const darkEnabled = ref(themeStore.isDark);

const handleTab = (dark: boolean) => {
  if (props.disabled) {
    toggleTheme(dark);
  }
};
const toggleTheme = (dark: boolean) => {
  setTheme(dark ? 'dark' : 'light');
  darkEnabled.value = dark;
};
const onToggleTheme = (dark: boolean) => {
  toggleTheme(dark);
};
defineExpose({
  onToggleTheme,
});
</script>
<template>
  <view>
    <slot>
      <!-- <BaseToggle v-model="darkEnabled" @update:modelValue="onToggleTheme" @tab="handleTab" /> -->
      <BaseToggle
        v-model="darkEnabled"
        id="app-theme-switch"
        :disabled="disabled"
        @tab="handleTab"
      />
    </slot>
  </view>
</template>
