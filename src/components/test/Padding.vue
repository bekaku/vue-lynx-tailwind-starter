<script setup lang="ts">
const props = defineProps<{ class?: string }>();
</script>

<template>
  <view
    :class="props.class"
    :style="{ border: '1px solid red', paddingTop: 0, paddingBottom: 0 }"
  >
    <slot />
  </view>
</template>
