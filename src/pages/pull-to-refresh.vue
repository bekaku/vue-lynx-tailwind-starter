<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BasePullToRefresh from '@/components/base/BasePullToRefresh.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useTheme } from '@/composables/useTheme';
import { ref } from 'vue';
const { isDark } = useTheme();

const isLoading = ref(false);
const items = ref([1, 2, 3, 4, 5]);
const fetchData = async () => {
  isLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    items.value.unshift(items.value.length + 1);
  } catch (error) {
    console.error('Data loading failed.:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Pull to refresh" />

    <BasePullToRefresh :is-refreshing="isLoading" @refresh="fetchData">
      <BaseCard class="w-full">
        <view
          v-for="item in items"
          :key="item"
          class="p-4 rounded-lg"
        >
          <text class="text-foreground text-base">No. {{ item }}</text>

          <view class="border-t h-[1px] border-border"/>
        </view>
      </BaseCard>
    </BasePullToRefresh>
  </view>
</template>
<style>
.cls-1 {
  fill: red;
}
</style>
