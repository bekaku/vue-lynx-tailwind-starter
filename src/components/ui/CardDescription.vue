<script setup lang="ts">
import { cn } from '@/utils/appUtil';

const props = defineProps<{ class?: string }>();
</script>

<template>
  <text :class="cn('text-sm text-muted', props.class)">
    <slot />
  </text>
</template>