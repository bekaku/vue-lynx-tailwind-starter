<script setup lang="ts">
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import Padding from '@/components/test/Padding.vue';
import { useDevice } from '@/composables/useDevice';
const { platform } = useDevice();
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Padding Problem" />

    <view class="w-full p-4">
      <view class="flex flex-row gap-2">
        <text class="py-3 text-xl">This run on </text>
        <text class="py-3 text-xl font-bold text-destructive">
          {{ platform }}</text
        >
      </view>

      <Padding>
        <text>This text inside component</text>
      </Padding>
    </view>
  </view>
</template>
