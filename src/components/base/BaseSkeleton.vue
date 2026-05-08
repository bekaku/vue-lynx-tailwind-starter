<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    rounded?: string;
    class?: string;
  }>(),
  {
    width: 'w-full',
    height: 'h-4',
    rounded: 'rounded-md',
  },
);

const { isDark } = useTheme();
</script>

<template>
  <view
    :class="[
      'skeleton-pulse bg-muted',
      !isDark ? 'bg-zinc-200' : 'bg-zinc-700',
      props.width,
      props.height,
      props.rounded,
      props.class,
    ]"
  />
</template>
