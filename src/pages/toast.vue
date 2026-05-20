<script setup lang="ts">
import BaseToast from '@/components/base/BaseToast.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { ref } from 'vue';
import { useToast } from '../composables/useToast';

const toast = useToast();

const showToast1 = ref(false);
const showToast2 = ref(false);

const onRetry = () => {
  console.log('Retry button in toast was clicked or toast dismissed!');
};

const showToast3 = () => {
  const isError = true;

  if (isError) {
    toast.show({
      message: 'Invalid Email or Password',
      position: 'top',
      actionText: 'Close',
    });
  } else {
    toast.show({
      message: 'Login Success!',
    });
  }
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-card">
    <BaseToolBar title="Toast" />
    <view class="flex-1 flex items-center justify-center gap-4 flex-col">
      <view class="bg-[#5B67CA] p-3 rounded-lg" @tap="showToast1 = true">
        <text class="text-white">Show Bottom Toast</text>
      </view>

      <view class="bg-teal-500 p-3 rounded-lg" @tap="showToast2 = true">
        <text class="text-white">Show Middle Toast (With Action)</text>
      </view>

      <view class="bg-primary p-3 rounded-lg" @tap="showToast3">
        <text class="text-white">Show via programitically</text>
      </view>
    </view>
    <BaseToast
      v-model:isOpen="showToast1"
      message="Profile saved successfully!"
    />
    <BaseToast
      v-model:isOpen="showToast2"
      message="No internet connection."
      position="middle"
      :duration="5000"
      actionText="RETRY"
      @on-close="onRetry"
    />
  </view>
</template>
