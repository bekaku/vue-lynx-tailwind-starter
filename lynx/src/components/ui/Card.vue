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
          'bg-card p-1',
          !square ? 'rounded-lg' : '',
          !flat ? 'shadow-sm' : '',
          border && !flat ? 'border border-border' : '',
          props.class,
        )
      "
    >
      <slot />
    </view>
  </view>
</template>
