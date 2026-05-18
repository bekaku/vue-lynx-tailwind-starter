<script setup lang="ts">
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useSafeArea } from '@/composables/useSafeArea';
import { computed, ref } from 'vue';
const {safeAreaBottom, safeAreaTop} = useSafeArea();
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Echarts" />
    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <view class="p-4 flex flex-col gap-2 justify-center bg-card">
        <text class="text-muted">SAfe Area</text>
        <text class="app-text">
         safeArea from native: {{ {safeAreaBottom, safeAreaTop} }}
        </text>
      </view>
    </scroll-view>
  </view>
</template>
