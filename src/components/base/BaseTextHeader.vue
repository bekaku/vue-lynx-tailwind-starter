<script setup lang="ts">
/*
    <BaseTextHeader>
      <text class="text-muted">Flex Basis</text>
    </BaseTextHeader>
*/
import { cn } from '@/utils/appUtil';

const props = defineProps<{
  class?: string;
  color?: string;
}>();
</script>

<template>
  <text v-bind="$attrs" :class="cn('app-text pl-4 pt-2 text-xl font-semibold tracking-tight', props.class)">
    <slot />
  </text>
</template>
