<script setup lang="ts">
import { cn } from '@/utils/appUtil'
const props = defineProps<{ class?: string }>()
</script>

<template>
  <view 
    :class="cn(
      'w-full flex flex-row items-center justify-around bg-white border-t border-border', 
      props.class
    )"
  >
    <slot />
  </view>
</template>