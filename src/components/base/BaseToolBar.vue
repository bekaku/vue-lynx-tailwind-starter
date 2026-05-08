<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { useSafeArea } from '@/composables/useSafeArea';
import type { TollbarProps } from '@/types/props';
import { cn } from '@/utils/appUtil';
import BaseBackButton from './BaseBackButton.vue';
const { safeAreaTop, safeAreaBottom } = useSafeArea();
const { onNavigateTo } = useBase();
const props = withDefaults(defineProps<TollbarProps>(), {
  showBackButton: true,
});

const onTab = () => {
  onNavigateTo('/');
};
</script>

<template>
  <view
    :class="
      cn(
        'flex flex-row items-center justify-between w-full min-h-14 px-4 pb-[1px]  border-b border-border bg-card',
        props.class,
      )
    "
    :style="{
      paddingTop: safeAreaTop + 'px'
    }"
  >
    <view class="flex flex-row items-center justify-start min-w-[60px]">
      <slot name="start">
        <BaseBackButton v-if="showBackButton" v-bind="props.backButton" />
      </slot>
    </view>

    <view class="flex flex-1 flex-row items-center justify-center">
      <slot>
        <text v-if="props.title" class="font-semibold text-lg">{{
          props.title
        }}</text>
      </slot>
    </view>

    <view class="flex flex-row items-center justify-end min-w-[60px]">
      <slot name="end" />
    </view>
  </view>
</template>
