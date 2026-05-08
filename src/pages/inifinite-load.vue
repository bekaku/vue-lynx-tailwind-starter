<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import type { LabelValue } from '@/types/common';
import { onMounted, ref } from 'vue';

import { images } from '@/libs/mock/images';
import ScrollItem from '@/components/test/ScrollItem.vue';
import StickyItem from '@/components/test/StickyItem.vue';

const hasMoreData = ref(true);
const items = ref<any[]>([]);
const totalPage = ref(0);
const isLoading = ref(false);
onMounted(() => {
  items.value.push(...images);
});

const onScroll = (e: any) => {
  console.log('onScroll', e);
};
const onScrolltoupper = (e: any) => {
  console.log('onScrolltoupper', e);
};
const onScrolltolower = (e: any) => {
  if (!hasMoreData.value) {
    return;
  }
  console.log('onScrolltolower', e);
  totalPage.value++;
  isLoading.value = true;
  setTimeout(() => {
    if (totalPage.value == 5) {
      hasMoreData.value = false;
    }
    items.value.push(...images);
    isLoading.value = false;
  }, 1500);
};
const onScrollstatechange = (e: any) => {
  console.log('onScrollstatechange', e);
};
const onLayoutcomplete = (e: any) => {
  console.log('onLayoutcomplete', e);
};
const onSnap = (e: any) => {
  console.log('onSnap', e);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Inifinite Load" />

    <list
      class="h-full w-full"
      scroll-orientation="vertical"
      list-type="single"
      :span-count="1"
      :bounces="false"
      :lower-threshold-item-count="2"
      @scroll="onScroll"
      @scrolltoupper="onScrolltoupper"
      @scrolltolower="onScrolltolower"
      @scrollstatechange="onScrollstatechange"
      @layoutcomplete="onLayoutcomplete"
      @snap="onSnap"
    >
      <list-item
        v-for="(item, index) in items"
        :key="`list-item-${index}`"
        :item-key="`${index}-list-item`"
      >
        <ScrollItem :index="index" :virtical="true" :src="item.filePath" />
      </list-item>

      <!-- <list-item
        v-if="items.length > 0 && hasMoreData"
        item-key="loading"
        key="loading"
      >
        <view class="w-full">
          <text>{{ `Load More Data...` }}</text>
        </view>
      </list-item>
      <list-item v-else item-key="no-more" key="no-more">
        <view class="w-full">
          <text>{{ `No More Data...` }}</text>
        </view>
      </list-item> -->
    </list>

    <view
      class="absolute p-2 rounded-md"
      :style="{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: '90%',
        left: '50%',
        transform: 'translateX(-50%)',
      }"
    >
      <view class="flex flex-col justify-center w-full">
        <text v-if="hasMoreData" class="text-white">
          {{ !isLoading ? 'Load More Data...' : 'Loading...' }}
        </text>
        <text v-else class="text-white">{{ `No More Data...` }}</text>
      </view>
    </view>
  </view>
</template>
