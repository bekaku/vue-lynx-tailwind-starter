<script setup lang="ts">
import BaseToolBar from '@/components/base/BaseToolBar.vue';

import BaseButton from '@/components/base/BaseButton.vue';
import ScrollItem from '@/components/test/ScrollItem.vue';
import { images } from '@/libs/mock/images';
import { ref } from 'vue-lynx';

const myListRef = ref<any>(null);

const onScroll = (e: any) => {
  console.log('onScroll', e);
};
const onScrolltoupper = (e: any) => {
  console.log('onScrolltoupper', e);
};
const onScrolltolower = (e: any) => {
  console.log('onScrolltolower', e);
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
const onScrollToItem = (targetIndex: number) => {
  const key = `list-item-${targetIndex}`;
  console.log('onScrollToItem', key);
  if (myListRef.value) {
    myListRef.value
      .invoke({
        method: 'scrollToPosition',
        params: {
          position: targetIndex,
          offset: 0,
          alignTo: 'top',
          // itemKey: key, //not work
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
  }
};

const onScrollToBottom = () => {
  if (!myListRef.value) {
    return;
  }
  onScrollToItem(images.length - 1);
};
const onScrollToTop = () => {
  if (!myListRef.value) {
    return;
  }
  onScrollToItem(0);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="List" />

    <view class="w-full flex p-2 gap-2">
      <BaseButton
        variant="outline"
        label="Scroll to item 5"
        @tap="onScrollToItem(5)"
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

    <list
      ref="myListRef"
      class="h-full w-full flex-1 px-2"
      scroll-orientation="vertical"
      list-type="single"
      :span-count="1"
      :bounces="false"
      @scroll="onScroll"
      @scrolltoupper="onScrolltoupper"
      @scrolltolower="onScrolltolower"
      @scrollstatechange="onScrollstatechange"
      @layoutcomplete="onLayoutcomplete"
      @snap="onSnap"
    >
      <list-item
        v-for="(item, index) in images"
        :key="`list-item-${index}`"
        :item-key="`list-item-${index}`"
      >
        <ScrollItem :index="index" :virtical="true" :src="item.filePath" />
      </list-item>
    </list>
  </view>
</template>
