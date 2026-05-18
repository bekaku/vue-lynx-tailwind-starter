<script setup lang="ts">
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import type { LabelValue } from '@/types/common';
import { ref } from 'vue';

import ScrollItem from '@/components/test/ScrollItem.vue';
import StickyItem from '@/components/test/StickyItem.vue';
import { images } from '@/libs/mock/files';
import BaseButton from '@/components/base/BaseButton.vue';
const myScrollViewRef = ref<any>(null);

const onScroll = (e: any) => {
  // console.log('onScroll', e);
};
const onScrolltoupper = (e: any) => {
  // console.log('onScrolltoupper', e);
};
const onScrolltolower = (e: any) => {
  // console.log('onScrolltolower', e);
};

const onScrollToItem = (targetIndex: number) => {
  const itemId = `scroll-item-${targetIndex}`;
  console.log('onScrollToItem', itemId);
  const actualDomIndex = targetIndex >= 2 ? targetIndex + 1 : targetIndex;
  if (myScrollViewRef.value) {
    myScrollViewRef.value
      .invoke({
        method: 'scrollTo',
        params: {
          index: actualDomIndex,
          offset: 0,
          smooth: true,
        },
        success: (res: any) => {
          console.log('scroll success!');
        },
        fail: (err: any) => {
          console.error('scroll error:', err);
        },
      })
      .exec();

    // lynx
    //   .createSelectorQuery()
    //   .select(`#scroll-item-${targetIndex}`)
    //   .invoke({
    //     method: 'scrollTo',
    //     params: {
    //       offset: 0,
    //       smooth: true,
    //       block: 'start',
    //     },
    //   })
    //   .exec();
  }
};
const onScrollToBottom = () => {
  if (!myScrollViewRef.value) {
    return;
  }
  onScrollToItem(images.length - 1);
};
const onScrollToTop = () => {
  if (!myScrollViewRef.value) {
    return;
  }
  onScrollToItem(0);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Scroll view" />

    <view class="my-[15px]">
      <text class="app-text font-bold px-4 pt-2">Horizontal</text>
      <scroll-view
        scroll-orientation="horizontal"
        class="h-[170px] pl-[5px]"
        :style="{ width: 'calc(100% - 10px)' }"
        @scroll="onScroll"
        @scrolltoupper="onScrolltoupper"
        @scrolltolower="onScrolltolower"
      >
        <ScrollItem
          v-for="(item, index) in images"
          :key="index"
          :index="index"
          :virtical="false"
          :src="item.filePath"
        >
        </ScrollItem>
      </scroll-view>
    </view>

    <view class="mt-[15px] flex-1 flex flex-col">
      <text class="app-text font-bold px-4 pt-2">Vertical</text>
      <view class="w-full flex p-2 gap-2">
        <BaseButton
          variant="outline"
          label="Scroll to item 8"
          @tap="onScrollToItem(8)"
        />
        <BaseButton
          variant="outline"
          label="Scroll to bottom"
          @tap="onScrollToBottom()"
        />
        <BaseButton
          variant="outline"
          label="Scroll to top"
          @tap="onScrollToTop()"
        />
      </view>
      <scroll-view
        ref="myScrollViewRef"
        scroll-orientation="vertical"
        class="ml-[5px] pl-[5px] pb-[55px] px-2"
        :style="{ width: '100%', height: '100%' }"
        @scroll="onScroll"
        @scrolltoupper="onScrolltoupper"
        @scrolltolower="onScrolltolower"
      >
        <template v-for="(item, index) in images" :key="index">
          <StickyItem v-if="index == 2" :index="index" :sticky="true" />
          <ScrollItem
            :id="`scroll-item-${index}`"
            :index="index"
            :virtical="true"
            :sticky="index == 4"
            :src="item.filePath"
          />
        </template>
      </scroll-view>
    </view>
  </view>
</template>
