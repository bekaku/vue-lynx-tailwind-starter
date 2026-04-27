<script setup lang="ts">
import { cn } from '../../utils/appUtil'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <view :class="cn('flex flex-col gap-1.5 p-6', props.class)">
    <slot />
  </view>
</template>