<script setup lang="ts">
import BaseAlert from '@/components/base/BaseAlert.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseItem from '@/components/base/BaseItem.vue';
import BaseLoading from '@/components/base/BaseLoading.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import FeedItem from '@/components/test/FeedItem.vue';
import { useFetch } from '@/composables/useFetch';
import { useScrollRestore } from '@/composables/useScrollRestore';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/vue-query';
import { ChevronLeft, ChevronRight, Siren } from 'lucide-static';
import { computed, nextTick, onMounted, ref, useTemplateRef } from 'vue';

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

const validFeeds: Record<string, { title: string; pages: number }> = {
  news: { title: 'News', pages: 10 },
  newest: { title: 'Newest', pages: 12 },
  ask: { title: 'Ask', pages: 2 },
  show: { title: 'Show', pages: 2 },
  jobs: { title: 'Jobs', pages: 1 },
};
const { scrollTop, onScroll } = useScrollRestore();
const feedScrollViewRef = useTemplateRef<any>('feedScrollViewRef');
const feedKeys = Object.keys(validFeeds);
const currentFeed = ref('news');
const { isLoading, error, execute } = useFetch<FeedItem[]>();
const data = ref<FeedItem[]>([]);

const page = ref(1);
const getCurrentTabText = computed(() => {
  return validFeeds[currentFeed.value].title;
});
const queryClient = useQueryClient();

const maxPage = computed(() => validFeeds[currentFeed.value].pages);
const hasPrev = computed(() => page.value > 1);
const hasNext = computed(() => page.value < maxPage.value);

const firstLoad = ref(false);
onMounted(async () => {
  await onLoadData();
});
//transtack query available
// const { data, isLoading, isFetching, isError, } = useQuery({
//   queryKey: computed(() => ['feed', currentFeed.value, page.value]),
//   queryFn: async () => {
//     const response = await execute(`/${currentFeed.value}`, {
//       method: 'GET',
//       params: { page: page.value.toString() },
//     });
//     items.value.push(...response);
//     return response;
//   },
//   staleTime: 5 * 60 * 1000,
//   placeholderData: keepPreviousData,
// });

const onLoadFeedData = async (feed: string) => {
  console.log('onLoadData', feed);
  page.value = 1;
  data.value = [];
  firstLoad.value = false;
  currentFeed.value = feed;
  onScrollToTop();
  onLoadData();
};

const onLoadData = async (): Promise<void> => {
  if (!data.value) {
    data.value = [];
  }
  try {
    const currentFocus = data.value.length;
    console.log('currentFocus', currentFocus);
    const response = await execute(`/${currentFeed.value}`, {
      method: 'GET',
      params: { page: page.value.toString() },
      addResponseData: false,
    });

    console.log('response', response);
    data.value.push(...response);
    await nextTick();
    if (!firstLoad.value) {
      firstLoad.value = true;
    }
    setTimeout(() => {
      onScrollToItem(currentFocus);
    }, 50);
    return new Promise((resolve) => resolve());
  } catch (err) {
    console.error('Error:', err);
    return new Promise((resolve) => resolve());
  }
};
const onUserTap = (e: any, user: string) => {
  console.log('onUserTap', user, e);
};

const onScrollToItem = (targetIndex: number) => {
  if (feedScrollViewRef.value) {
    feedScrollViewRef.value
      .invoke({
        method: 'scrollTo',
        params: {
          index: targetIndex,
          offset: 0,
          smooth: false,
        },
        success: function (res: any) {
          console.log('scroll success!');
        },
        fail: function (res: any) {
          console.error('scroll error:', res);
        },
      })

      .exec();
  }
};

const onScrollToTop = () => {
  if (!feedScrollViewRef.value) {
    return;
  }
  onScrollToItem(0);
};

const goPrev = () => {
  if (hasPrev.value) {
    page.value--;
    console.log('goPrev');
  }
};
const goNext = () => {
  if (hasNext.value) {
    page.value++;
    console.log('goNext');
    onLoadData();
  }
};

const onScrolltolower = (e: any) => {
  if (isLoading.value) {
    return;
  }
  goNext();
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar :title="getCurrentTabText" />
    <view class="flex flex-col">
      <scroll-view
        scroll-orientation="horizontal"
        class="py-2 flex justify-center bg-card"
      >
        <BaseButton
          v-for="key in feedKeys"
          :key="key"
          :text-class="key === currentFeed ? 'text-primary' : ''"
          rounded
          :variant="key === currentFeed ? 'link' : 'ghost'"
          :label="validFeeds[key].title"
          @tap="onLoadFeedData(key)"
        />
      </scroll-view>
    </view>
    <view class="flex-1 flex flex-col">
      <view v-if="!firstLoad" class="flex justify-center py-2">
        <BaseSpinner show />
      </view>
      <view v-if="error" class="p-4">
        <BaseAlert variant="destructive" title="Error" :description="error">
          <template #icon>
            <BaseIcon :name="Siren" color="#ef4444" :auto-dark="false" />
          </template>
        </BaseAlert>
      </view>
      <scroll-view
        ref="feedScrollViewRef"
        :class="['flex-1 w-full bg-card']"
        scroll-orientation="vertical"
        :scroll-top="scrollTop"
        @scroll="onScroll"
        @scrolltolower="onScrolltolower"
      >
        <view v-for="(item, index) in data" :key="item.id + ''">
          <FeedItem :item="item" :index="index" />
        </view>
      </scroll-view>
      <view
        v-if="isLoading && firstLoad"
        class="absolute bottom-0 mb-4 left-0 w-full flex flex-row justify-center z-50 pointer-events-none"
      >
        <view
          class="bg-black/40 p-2 rounded-md flex flex-row gap-2 items-center"
        >
          <BaseSpinner width="18px" show />
          <text class="text-xs text-white">Loading...</text>
        </view>
      </view>
    </view>
  </view>
</template>
