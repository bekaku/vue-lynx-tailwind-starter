<script setup lang="ts">
import { cn } from '../../utils/appUtil'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <view :class="cn('flex flex-row items-center p-6 pt-0', props.class)">
    <slot />
  </view>
</template>