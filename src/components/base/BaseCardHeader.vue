<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { cn } from '@/utils/appUtil';

const props = defineProps<{ class?: string }>();
</script>

<template>
  <view
    :class="
      cn(
        'flex flex-col my-0 px-[14px] py-[14px]',
        props.class,
      )
    "
  >
    <slot />
  </view>
</template>
