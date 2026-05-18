<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';

const { isWeb } = useDevice();
const props = withDefaults(
  defineProps<{
    index: number;
    src?: string;
    sticky: boolean;
    height?: number;
    class?: any;
  }>(),
  {
    height: 100,
  },
);
</script>
<template>
  <view
    class="w-full h-[30px] bg-red-200 mt-[5px]"
    :style="
      isWeb
        ? {
            position: 'sticky',
            top: '0px',
            zIndex: 100,
          }
        : {
            position: 'sticky',
            top: '0px',
          }
    "
    :flatten="false"
  >
    <text class="app-text">{{ `Scroll-Item-${props.index}-sticky-${props.sticky}` }}</text>
  </view>
</template>
