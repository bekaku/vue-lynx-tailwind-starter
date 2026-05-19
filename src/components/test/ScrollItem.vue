<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { computed } from 'vue';
import BaseImage from '../base/BaseImage.vue';
import BaseCard from '@/components/base/BaseCard.vue';
const { isWeb } = useDevice();
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
    height: '160px',
  },
);
const getStickyStyle = computed(() => {
  if (!props.sticky) {
    return {
      width: '100%',
      height: props.height,
    };
  } else {
    return !isWeb
      ? {
          width: '100%',
          height: props.height,
          position: 'sticky',
          top: '0px',
        }
      : {
          width: '100%',
          height: props.height,
          position: 'sticky',
          top: '0px',
          zIndex: 100,
        };
  }
});
</script>
<template>
  <view v-if="virtical" :style="getStickyStyle" class="my-2" :flatten="false">
    <BaseCard class="mx-2" :margin="false">
      <BaseImage
        :style="{ width: '100%', height: props.height }"
        :src="src"
        fit="aspectFill"
      />
      <view class="p-2 bg-black/50" style="position: absolute;bottom: 0;">
        <text class="text-white text-xs">
          {{ `item-${props.index}-sticky-${sticky}` }}
        </text>
      </view>
    </BaseCard>
  </view>
  <BaseCard
    v-else
    :margin="false"
    class="w-[200px] h-[160px] mr-[10px] overflow-hidden"
  >
    <BaseImage
      :style="{ width: '100%', height: '120px' }"
      :src="src"
      fit="aspectFill"
    />
    <view class="p-2">
      <text class="app-text text-xs">
        {{ `item-${props.index}` }}
      </text>
    </view>
  </BaseCard>
  <!-- <view v-else class="w-[200px] h-[160px] ml-[10px] bg-black overflow-hidden">
    <text class="px-[3px] text-xs bg-black text-white">
      {{ `item-${props.index}` }}
    </text>
    <BaseImage class="w-full h-[150px]" :src="src" fit="aspectFit" />
  </view> -->
</template>
