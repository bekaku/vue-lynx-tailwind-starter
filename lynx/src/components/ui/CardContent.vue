<script setup lang="ts">
import { cn } from '../../utils/appUtil'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <view :class="cn('p-4', props.class)">
    <slot />
  </view>
</template>