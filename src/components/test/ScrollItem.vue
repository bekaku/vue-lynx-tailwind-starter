<script setup lang="ts">
import { computed } from 'vue-lynx';
import BaseImage from '../base/BaseImage.vue';
import { useBase } from '@/composables/useBase';
const { isWeb } = useBase();
const props = withDefaults(
  defineProps<{
    index: number;
    src: string;
    sticky?: boolean;
    virtical?: boolean;
    height?: string;
    class?: any;
  }>(),
  {
    virtical: true,
    sticky: false,
    height:'160px'
  },
);
const getStickyStyle = computed(() => {
  if (!props.sticky) {
    return {
      width: 'calc(100% - 10px)',
      height: props.height,
    };
  } else {
    return !isWeb
      ? {
          width: 'calc(100% - 10px)',
          height: props.height,
          position: 'sticky',
          top: '0px',
        }
      : {
          width: 'calc(100% - 10px)',
          height: props.height,
          position: 'sticky',
          top: '0px',
          zIndex: 100,
        };
  }
});
</script>
<template>
  <view
    v-if="virtical"
    :style="getStickyStyle"
    class="my-2 overflow-hidden border border-border"
    :class="[props.sticky ? 'bg-red-300' : 'bg-black']"
    :flatten="false"
  >
    <text class="px-[3px] text-xs bg-black text-white">
      {{ `item-${props.index}-sticky-${sticky}` }}
    </text>
    <BaseImage
      :style="{ width: 'calc(100% - 10px)', height: '140px' }"
      :src="src"
      fit="scale-down"
    />
  </view>
  <view v-else class="w-[200px] h-[160px] ml-[10px] bg-black overflow-hidden">
    <text class="px-[3px] text-xs bg-black text-white">
      {{ `item-${props.index}` }}
    </text>
    <BaseImage class="w-full h-[150px]" :src="src" fit="scale-down" />
  </view>
</template>
