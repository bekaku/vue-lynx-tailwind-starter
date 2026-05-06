<script setup lang="ts">
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
    flat: false,
    square: false,
    margin: true,
  },
);
</script>

<template>
  <view :class="{ 'p-4': margin }">
    <view
      :class="
        cn(
          'bg-card px-1 py-0',
          !square ? 'rounded-xl' : '',
          !flat ? 'shadow-sm' : '',
          border && !flat ? 'border border-border' : '',
          props.class,
        )
      "
      :style="{boxShadow: !flat ? '0 8px 16px rgba(0, 0, 0, 0.08)' : 'none'}"
    >
      <slot />
    </view>
  </view>
</template>
