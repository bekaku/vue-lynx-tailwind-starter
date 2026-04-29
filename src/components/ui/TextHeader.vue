<script setup lang="ts">
/*
    <TextHeader>
      <text class="text-muted">Flex Basis</text>
    </TextHeader>
*/
import { cn } from '@/utils/appUtil';

const props = defineProps<{
  class?: string;
  color?: string;
}>();
</script>

<template>
  <view v-bind="$attrs" :class="cn('pl-4 pt-2 text-xl font-semibold tracking-tight', props.class)">
    <slot />
  </view>
</template>
