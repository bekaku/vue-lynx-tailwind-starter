<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    show: boolean;
    width?: string;
  }>(),
  {
    width: '28px',
    show: false,
  },
);
</script>

<template>
  <view
    v-if="show"
    :style="{
      width: props.width,
      height: props.width,
      borderRadius: '14px',
      borderWidth: '3px',
      borderColor: 'var(--color-border)',
      borderTopColor: 'var(--color-primary)',
      animationName: 'spin',
      animationDuration: '0.8s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    }"
  />
</template>

<style>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
