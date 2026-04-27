<script setup lang="ts">
import { cn } from '@/utils/appUtil';
import Button from './Button.vue';
import { useBase } from '@/composables/useBase';
import type { TollbarProps } from '@/types/props';
import BackButton from './BackButton.vue';

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
        'flex flex-row items-center justify-between w-full h-14 px-4  border-b border-border bg-card',
        props.class,
      )
    "
  >
    <view class="flex flex-row items-center justify-start min-w-[60px]">
      <slot name="start">
        <BackButton v-if="showBackButton" v-bind="props.backButton" />
      </slot>
    </view>

    <view class="flex flex-1 flex-row items-center justify-center">
      <slot>
        <text v-if="props.title" class="font-semibold text-lg">{{ props.title }}</text>
      </slot>
    </view>

    <view class="flex flex-row items-center justify-end min-w-[60px]">
      <slot name="end" />
    </view>
  </view>
</template>
