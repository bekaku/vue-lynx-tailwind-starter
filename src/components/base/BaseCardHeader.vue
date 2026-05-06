<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { defaultAndroidPaddingFix } from '@/libs/constant';
import { cn } from '@/utils/appUtil';

const props = defineProps<{ class?: string }>();
const { isAndroid } = useBase();
</script>

<template>
  <view
    :class="
      cn(
        'flex flex-col my-0 px-[14px]',
        isAndroid ? 'android-padding-fix' : 'py-[14px]',
        props.class,
      )
    "
  >
    <slot />
  </view>
</template>
