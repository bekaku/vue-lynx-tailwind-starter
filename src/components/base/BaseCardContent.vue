<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { cn } from '../../utils/appUtil';
import { defaultAndroidPaddingFix } from '@/libs/constant';
import { useDevice } from '@/composables/useDevice';

const props = defineProps<{ class?: string }>();
</script>

<template>
  <view :class="cn('flex flex-col px-4 py-[16px]', props.class)">
    <slot />
  </view>
</template>
