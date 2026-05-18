<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import type { LabelValue } from '@/types/common';
import { ref } from 'vue';

import { images } from '@/libs/mock/files';
import ScrollItem from '@/components/test/ScrollItem.vue';
import StickyItem from '@/components/test/StickyItem.vue';

const onScroll = (e: any) => {
  console.log('onScroll', e);
};
const onScrolltoupper = (e: any) => {
  console.log('onScrolltoupper', e);
};
const onScrolltolower = (e: any) => {
  console.log('onScrolltolower', e);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="List column" />

    <list
      class="h-full w-full px-2"
      scroll-orientation="vertical"
      list-type="flow"
      :span-count="2"
    >
      <template v-for="(item, index) in images" :key="`list-item-${index}`">
        <template v-if="index % 4 == 3">
          <list-item
            :full-span="true"
            :key="`list-item-${index}`"
            :item-key="`list-item-${index}`"
            class="w-full test-border"
            :style="{ width: '100%' }"
          >
            <view class="w-full bg-red-300 py-2">
              <text class="text-black px-2">{{ `full span item` }}</text>
            </view>
          </list-item>
        </template>
        <template v-else>
          <list-item
            :key="`list-item-${index}`"
            :item-key="`list-item-${index}`"
          >
            <ScrollItem :index="index" :virtical="true" :src="item.filePath" />
            <!-- <view class="w-full p-2">
              <text class="app-text bg-red-300">{{ `normal span item ${index}` }}</text>
            </view> -->
          </list-item>
        </template>
      </template>
    </list>
  </view>
</template>
