<script setup lang="ts">
import type { OgMeta } from '@/types/common';
import BaseCard from './BaseCard.vue';
import BaseImage from './BaseImage.vue';
import BaseIcon from './BaseIcon.vue';
import BaseContentText from './BaseContentText.vue';
import { SquareArrowOutUpRight } from 'lucide-static';
import { useDevice } from '@/composables/useDevice';

const props = withDefaults(
  defineProps<{
    item: OgMeta;
    short?: boolean;
    showBg?: boolean;
    textLines?: number;
    descriptionLines?: number;
    imageSize?: string;
    imageMaxHeight?: string;
    class?: string;
  }>(),
  {
    short: false,
    showBg: true,
    textLines: 1,
    descriptionLines: 2,
    imageSize: '125px',
    imageMaxHeight: '150px',
  },
);
const {isAndroid} = useDevice();
const onTap = (e: any) => {
  console.log('onTap', e);
};
</script>
<template>
  <BaseCard :margin="false" square :class="props.class" :catchtap="onTap">
    <BaseImage
      v-if="!props.short && item.image"
      class="relative"
      :src="item.image"
      fit="aspectFill"
      :style="{
        width: '100%',
        height: imageMaxHeight,
      }"
    />
    <view class="flex flex-row w-full py-2 px-3 bg-content-item">
      <view class="flex-1 flex flex-col">
        <text v-if="item.domain" class="text-sm"> {{ item.domain }}</text>
        <BaseContentText
          v-if="item.title"
          :class="isAndroid ? 'pt-[-14px] pb-[-14px]' : ''"
          :content="item.title"
          :ellipsis="{ rows: 1 }"
        />
        <BaseContentText
          v-if="item.desc"
          text-class="text-sm text-muted"
           :class="isAndroid ? 'pt-[-14px] pb-[-14px]' : ''"
          :content="item.desc"
          :ellipsis="{ rows: 2 }"
        />
      </view>
      <view class="flex flex-col items-end">
        <BaseIcon :name="SquareArrowOutUpRight" color="#71717a" />
      </view>
    </view>
  </BaseCard>
</template>
