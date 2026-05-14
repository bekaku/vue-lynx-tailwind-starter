<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import BaseItem from '../base/BaseItem.vue';
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseContentText from '@/components/base/BaseContentText.vue';
import {
  EllipsisVertical,
  Forward,
  Heart,
  MessageCircle,
  MessageSquare,
} from 'lucide-static';
import { useBase } from '@/composables/useBase';
import type { OgMeta } from '@/types/common';
import BaseOpengraphItem from '../base/BaseOpengraphItem.vue';

interface FeedItem {
  id: number;
  title: string;
  url: string;
  user: string;
  domain: string;
  points: number;
  time_ago: string;
  comments_count: number;
  type: string;
}
const props = defineProps<{
  item: FeedItem;
  index?: number;
}>();
const { onNavigateTo } = useBase();
const { isAndroid } = useDevice();

const opengraphItem: OgMeta = {
  domain: 'youtube.com',
  url: 'https://www.youtube.com/watch?v=-IkEMMKSqcw',
  title:
    'WONDERS OF PLANET EARTH | Most Magnificent Places | Travel Documentary 4K',
  desc: "Embark on a 90-minute cinematic voyage to Earth's most breathtaking and uncharted destinations. This visual odyssey transports you to the farthest corners of the globe, where nature's artistry surpasses the imagination, revealing landscapes and phenomena that defy belief. From mystical formations sculpted over millennia to ancient wonders where human history intertwines with geological marvels, witness landscapes plucked from fantasy, narrated with captivating detail and insight.",
  image: 'https://i.ytimg.com/vi/-IkEMMKSqcw/maxresdefault.jpg',
  imageAlt: '',
};
const onUserTap = (e: any, user: string) => {
  console.log('onUserTap', user, e);
};
const onMenuTap = (e: any) => {
  console.log('onMenuTap', e);
};
const onItemTap = (e: any) => {
  onNavigateTo(`/fetch-data/feed-detail/${props.item.id}`);
};
</script>

<template>
  <view
    v-if="item"
    class="flex flex-col gap-2 border-b border-border active:bg-ripple"
    :class="isAndroid ? 'pb-2 mb-2' : 'pb-2 mb-[14px]'"
    @tap="onItemTap"
  >
    <BaseItem
      :separator="false"
      class="bg-transparent"
      :class="isAndroid ? 'pb-[-4px]' : 'py-0'"
    >
      <template #start>
        <BaseAvatar
          class="h-[32px] w-[32px]"
          :src="
            index
              ? index % 2 !== 0
                ? 'https://randomuser.me/api/portraits/men/1.jpg'
                : 'https://randomuser.me/api/portraits/women/21.jpg'
              : 'https://i.pravatar.cc/128'
          "
          :fallback="item.id + ''"
        />
      </template>
      <view class="flex flex-row items-center" :style="{ gap: '6px' }">
        <text
          class="text-base font-semibold"
          :catchtap="(event: any) => onUserTap(event, item?.user)"
        >
          {{ item.user || 'Anonymous' }}
        </text>
        <text class="text-muted" :style="{ fontSize: '0.9em' }">
          {{ item.time_ago }}
        </text>
      </view>
      <view>
        <text class="text-sm text-muted">{{ item.domain || '' }}</text>
      </view>
      <template #end>
        <BaseButton
          size="icon"
          variant="ghost"
          rounded
          class="h-[18px] w-[18px]"
          @catchtap="(event: any) => onMenuTap(event)"
        >
          <BaseIcon :name="EllipsisVertical" :size="16" />
        </BaseButton>
      </template>
    </BaseItem>
    <view
      class="flex flex-col self-start w-full pt-0 px-2"
      :style="{ paddingLeft: '24px' }"
    >
      <BaseContentText
        :class="isAndroid ? 'pt-[-4px] pb-[-4px]' : ''"
        :content="item.title"
        :ellipsis="{ rows: 3, showMore: false }"
      />
    </view>

    <!-- Test opengraphItem -->
    <template v-if="index == 0">
      <BaseOpengraphItem :item="opengraphItem" />
    </template>

    <view
      class="flex flex-col self-start w-full pt-0 px-2"
      :style="{ paddingLeft: '24px' }"
    >
      <view
        class="flex flex-row gap-4 pr-4 w-full"
        :class="!isAndroid ? 'pt-3' : 'mt-2'"
      >
        <view
          class="flex flex-row gap-1 border border-border rounded-full py-1 px-3 items-center"
        >
          <BaseIcon :name="Heart" :size="18" color="#71717a" />
          <text class="text-sm text-muted">{{ item.points || 0 }}</text>
        </view>

        <view
          class="flex flex-row gap-1 border border-border rounded-full py-1 px-3 items-center"
        >
          <BaseIcon :name="MessageCircle" :size="18" color="#71717a" />
          <text class="text-sm text-muted">{{ item.comments_count || 0 }}</text>
        </view>

        <view class="flex flex-row flex-1 justify-end w-full">
          <view class="flex flex-row gap-1 items-center">
            <BaseIcon :name="Forward" :size="18" color="#71717a" />
            <text class="text-sm text-muted">{{
              item.comments_count || 0
            }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
