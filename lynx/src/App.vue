<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import { useAndroidBack } from '@/composables/useAndroidBack';
const { themeClass } = useTheme();
useAndroidBack();
</script>

<template>
  <view class="w-full h-full bg-background" :class="themeClass">
    <RouterView />
  </view>
</template>
