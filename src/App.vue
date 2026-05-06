<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import { useAndroidBack } from '@/composables/useAndroidBack';
import { useSafeArea } from '@/composables/useSafeArea';
import { useBase } from './composables/useBase';
import { onMounted } from 'vue-lynx';
const { themeClass, onInit } = useTheme();
const { safeAreaTop, safeAreaBottom } = useSafeArea();
const { isAndroid, isIos } = useBase();
useAndroidBack();
onMounted(() => {
  onInit();
});
</script>

<template>
  <view
    class="w-full h-full bg-background"
    :class="themeClass"
    :style="{
      paddingBottom: safeAreaBottom + 'px',
    }"
  >
    <RouterView />
  </view>
</template>
