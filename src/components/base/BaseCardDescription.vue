<script setup lang="ts">
import { cn } from '@/utils/appUtil';

const props = defineProps<{ class?: string }>();
</script>

<template>
  <text :class="cn('text-sm',$style.cardDescriptionText, props.class)">
    <slot />
  </text>
</template>

<style module>
.cardDescriptionText text {
  color: var(--color-muted);
}
</style>