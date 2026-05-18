<script setup lang="ts">
import { cn } from '../../utils/appUtil'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <text :class="cn('app-text text-xl font-semibold tracking-tight', props.class)">
    <slot />
  </text>
</template>