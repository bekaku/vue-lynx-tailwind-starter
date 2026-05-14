<script setup lang="ts">
import BaseLoading from '@/components/base/BaseLoading.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { ref } from 'vue';
const isOpen = ref(false);
const handleShow = (e: any) => {
  console.log('action-sheet.vue > handleShow');
  isOpen.value = true;
  setTimeout(() => {
    isOpen.value = false;
  }, 3000);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Loading" />
    <view class="m-4 p-4 bg-primary rounded-lg" @tap="handleShow">
      <text class="text-primary-foreground font-semibold">
        Open Loading isOpen : {{ isOpen }}
      </text>
    </view>

    <BaseLoading
      v-model:visible="isOpen"
      description="This will hide after 3 seconds..."
    />
  </view>
</template>
