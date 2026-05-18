<script setup lang="ts">
import { cn } from '@/utils/appUtil';

const props = defineProps<{ class?: string }>();
</script>

<template>
  <text :class="cn('text-sm cardDescriptionText', props.class)">
    <slot />
  </text>
</template>

<style scoped>
.cardDescriptionText {
  color: var(--color-muted);
}
</style>