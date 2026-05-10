<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import type { LabelValue } from '@/types/common';
import { ref } from 'vue';

import { images } from '@/libs/mock/images';
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
    <BaseToolBar title="List waterfall" />

    <list
      class="h-full w-full px-2"
      scroll-orientation="vertical"
      list-type="waterfall"
      :span-count="2"
      :style="{ listMainAxisGap: '15px', listCrossAxisGap: '8px' }"
    >
      <template v-for="(item, index) in images" :key="`list-item-${index}`">
        <list-item :item-key="`list-item-${index}`">
          <ScrollItem
            :index="index"
            :height="`${(index % 3) * 30 + 200}px`"
            :virtical="true"
            :src="item.filePath"
          />
        </list-item>
      </template>
    </list>
  </view>
</template>
