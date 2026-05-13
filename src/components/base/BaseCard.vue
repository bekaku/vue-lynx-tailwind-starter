<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { cn } from '@/utils/appUtil';

const props = withDefaults(
  defineProps<{
    class?: string;
    border?: boolean;
    flat?: boolean;
    square?: boolean;
    margin?: boolean;
  }>(),
  {
    border: true,
    flat: true,
    square: false,
    margin: true,
  },
);
const {isAndroid} = useDevice();
</script>

<template>
  <view class="bg-transparent" :class="{ 'p-4': margin }">
    <view
      :class="
        cn(
          'bg-card pt-0 pb-0 overflow-hidden',
          !square ? 'rounded-xl' : '',
          !flat ? 'shadow-sm' : '',
          border && !flat ? 'border border-border' : '',
          isAndroid ? 'py-[-18px]' : '',
          props.class,
        )
      "
      :style="{boxShadow: !flat ? '0 8px 16px rgba(0, 0, 0, 0.08)' : 'none'}"
    >
      <slot />
    </view>
  </view>
</template>
