<script setup lang="ts">
const props = defineProps<{ class?: string }>()
</script>

<template>
  <view :class="props.class" :style="{border:'1px solid red'}">
    <slot />
  </view>
</template>