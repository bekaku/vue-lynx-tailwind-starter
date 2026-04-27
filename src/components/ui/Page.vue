<script setup lang="ts">
import { useSafeArea } from '@/composables/useSafeArea';
import { cn } from '@/utils/appUtil';
const { bottom, top } = useSafeArea();
const props = defineProps<{ class?: string }>();
</script>

<template>
  <!-- <view :class="cn('w-full h-full flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] bg-background', props.class)"> -->
  <view
    :style="{paddingBottom: bottom + 'px' }"
    :class="cn('w-full h-full flex flex-col  bg-background', props.class)"
  >
    <slot />
  </view>
</template>
