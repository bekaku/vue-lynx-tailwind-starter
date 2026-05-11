<script setup lang="ts">
import BaseToggle from '@/components/base/BaseToggle.vue';
import { useTheme } from '@/composables/useTheme';
import { useThemeStore } from '@/stores/themeStore';
import { ref } from 'vue';
const { onSetTheme } = useTheme();
const themeStore = useThemeStore();
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {},
);
const darkEnabled = ref<boolean>(themeStore.isDark);

const handleTab = (dark: boolean) => {
  if (props.disabled) {
    toggleTheme(dark);
  }
};
const toggleTheme = (dark: boolean) => {
  onSetTheme(dark ? 'dark' : 'light');
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
      <!-- <BaseToggle v-model="darkEnabled" @update:modelValue="onToggleTheme" @tap="handleTab" /> -->
      <BaseToggle
        v-model="darkEnabled"
        id="app-theme-switch"
        :disabled="disabled"
        @tap="handleTab"
      />
    </slot>
  </view>
</template>
