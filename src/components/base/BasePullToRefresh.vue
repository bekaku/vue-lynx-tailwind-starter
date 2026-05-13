<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue';
import BaseSpinner from './BaseSpinner.vue';

const props = defineProps<{
  isRefreshing: boolean;
  class?: string;
  scrollClass?: string;
}>();

const emit = defineEmits<{
  refresh: [void];
  scrolltoupper: [e: any];
  scrolltolower: [e: any];
}>();

// State variables for touch tracking
const pullDistance = ref(0);
const startY = ref(0);
const scrollTop = ref(0);
const isPulling = ref(false);

const basePullToRefeshRef = useTemplateRef<any>('basePullToRefeshRef');
const onScroll = (e: any) => {
  // Track scroll position to ensure we only pull from the very top.
  // We use 0 as a fallback just in case the detail object is missing.
  scrollTop.value = e.detail?.scrollTop || 0;
};

const onScrolltoupper = (e: any) => {
  emit('scrolltoupper', e);
};
const onScrolltolower = (e: any) => {
  emit('scrolltolower', e);
};

const onTouchStart = (e: any) => {
  // Allow pulling only if the scroll-view is at the top (allow a 5px margin of error)
  // and we are not already in a refreshing state.
  if (scrollTop.value > 5 || props.isRefreshing) return;

  isPulling.value = true;
  startY.value = e.touches[0].clientY;
};

const onTouchMove = (e: any) => {
  if (!isPulling.value || props.isRefreshing) return;

  const currentY = e.touches[0].clientY;
  const distance = currentY - startY.value;

  // Only react to downward pulls
  if (distance > 0) {
    // Multiply by 0.4 to simulate rubber-band friction/resistance
    pullDistance.value = distance * 0.4;
  }
};

const onTouchEnd = () => {
  if (!isPulling.value || props.isRefreshing) return;

  isPulling.value = false;

  // If pulled past the 60px threshold, trigger the refresh event
  if (pullDistance.value > 60) {
    pullDistance.value = 80; // Lock the indicator height at 80px
    emit('refresh');
  } else {
    // Snap back to 0 if the user didn't pull far enough
    pullDistance.value = 0;
  }
};

// Listen to the parent's isRefreshing prop.
// When it turns false, smoothly collapse the indicator.
watch(
  () => props.isRefreshing,
  (newVal) => {
    console.log('isRefreshing', newVal);
    if (!newVal) {
      pullDistance.value = 0;
    }
  },
);
</script>
<template>
  <view
    class="relative flex-1 w-full h-full overflow-hidden bg-transparent"
    :class="props.class"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <view
      class="absolute top-0 left-0 w-full flex flex-row justify-center items-center overflow-hidden"
      :style="{
        height: `${Math.min(pullDistance, 80)}px`,
        transition: isPulling ? 'none' : 'height 0.3s ease-out',
      }"
    >
      <view class="flex flex-row items-center gap-2">
        <BaseSpinner :show="isRefreshing" width="20px" />
        <text class="text-sm text-muted">
          {{
            isRefreshing
              ? 'Refreshing...'
              : pullDistance > 60
                ? 'Release to refresh'
                : 'Pull down to refresh'
          }}
        </text>
      </view>
    </view>

    <scroll-view
      ref="basePullToRefeshRef"
      class="flex-1 w-full h-full"
      :class="props.scrollClass"
      :style="{
        transform: `translateY(${Math.min(pullDistance, 80)}px)`,
        transition: isPulling ? 'none' : 'transform 0.3s ease-out',
      }"
      scroll-y
      @scroll="onScroll"
      @scrolltoupper="onScrolltoupper"
      @scrolltolower="onScrolltolower"
    >
      <slot />
    </scroll-view>
  </view>
</template>
