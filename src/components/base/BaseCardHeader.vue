<script setup lang="ts">
import { cn } from '../../utils/appUtil'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <view :class="cn('flex flex-col gap-1.5 pl-4 pt-4 pr-4 pb-2', props.class)">
    <slot />
  </view>
</template>