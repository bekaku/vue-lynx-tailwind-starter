<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { cn } from '../../utils/appUtil';
import { defaultAndroidPaddingFix } from '@/libs/constant';

const props = defineProps<{ class?: string }>();
const { isAndroid } = useBase();
</script>

<template>
  <view
    :class="
      cn('flex flex-col px-4', isAndroid ? 'py-[-4px]' : 'pt-[8px] pb-[16px]', props.class)
    "
  >
    <slot />
  </view>
</template>
