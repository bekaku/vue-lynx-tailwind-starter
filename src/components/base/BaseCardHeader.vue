<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { cn } from '@/utils/appUtil';

const props = defineProps<{ class?: string }>();
const { isAndroid } = useDevice();
</script>

<template>
  <view
    :class="
      cn(
        'flex flex-col my-0 px-[14px]',
        !isAndroid ?  'py-[14px]' : 'pb-[-18px]',
        props.class,
      )
    "
  >
    <slot />
  </view>
</template>
