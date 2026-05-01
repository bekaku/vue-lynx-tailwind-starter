<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { useBase } from '@/composables/useBase';
const { onNavigateTo } = useBase();
const goHome = () => {
  onNavigateTo('/', true);
};
</script>

<template>
  <view
    class="w-full h-full flex flex-col items-center justify-center bg-background p-4"
  >
    <text class="text-6xl font-bold mb-2">404</text>
    <text class="text-lg text-zinc-500 mb-8">Oops! BasePage not found.</text>

    <BaseButton label="Back to Home" @tab="goHome" />
  </view>
</template>
