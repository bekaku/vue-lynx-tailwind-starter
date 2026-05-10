<script setup lang="ts">
import BaseAlert from '@/components/base/BaseAlert.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseItem from '@/components/base/BaseItem.vue';
import BaseLoading from '@/components/base/BaseLoading.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useFetch } from '@/composables/useFetch';
import { useScrollRestore } from '@/composables/useScrollRestore';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/vue-query';
import { ChevronLeft, ChevronRight } from 'lucide-static';
import { computed, onMounted, ref, useTemplateRef } from 'vue-lynx';

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
const {
  // data,
  // isLoading,
  // error,
  execute,
} = useFetch<FeedItem[]>();

const page = ref(1);
const getCurrentTabText = computed(() => {
  return validFeeds[currentFeed.value].title;
});
onMounted(() => {
  // onLoadData();
});
const queryClient = useQueryClient();

const maxPage = computed(() => validFeeds[currentFeed.value].pages);
const hasPrev = computed(() => page.value > 1);
const hasNext = computed(() => page.value < maxPage.value);
const { data, isLoading, isFetching, isError } = useQuery({
  queryKey: computed(() => ['feed', currentFeed.value, page.value]),
  queryFn: () =>
    execute(`/${currentFeed.value}`, {
      method: 'GET',
      params: { page: page.value.toString() },
    }),
  staleTime: 5 * 60 * 1000,
  placeholderData: keepPreviousData,
});
const onLoadFeedData = async (feed: string) => {
  console.log('onLoadData', feed);
  page.value = 1;
  currentFeed.value = feed;
  onScrollToTop();
  // onLoadData();
};

// const onLoadData = async () => {
//   try {
//     const response = await execute(`/${currentFeed.value}`, {
//       method: 'GET',
//       params: { page: page.value.toString() },
//     });
//     console.log('response', response);
//   } catch (err) {
//     console.error('Error:', err);
//   }
// };
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
          smooth: true,
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
  }
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar :title="getCurrentTabText" />
    <view class="flex flex-col">
      <scroll-view
        scroll-orientation="horizontal"
        class="bg-primary py-2 text-white flex justify-center"
      >
        <BaseButton
          v-for="key in feedKeys"
          :key="key"
          text-class="text-white"
          rounded
          :class="key === currentFeed ? 'bg-primary-400' : ''"
          :label="validFeeds[key].title"
          @tap="onLoadFeedData(key)"
        />
      </scroll-view>
      <!-- Pagination nav -->
      <view
        class="bg-hn-card flex flex-row items-center justify-center border-b border-border"
        :style="{ padding: '15px 30px', gap: '1em' }"
      >
        <BaseButton
          variant="ghost"
          size="sm"
          label="prev"
          :disabled="!hasPrev"
          text-class="text-primary"
          @tap="goPrev"
        >
          <template #start>
            <BaseIcon :name="ChevronLeft" color="#2b7fff" ::auto="false" />
          </template>
        </BaseButton>

        <text :style="{ fontSize: '15px' }"> {{ page }}/{{ maxPage }} </text>

        <BaseButton
          variant="ghost"
          size="sm"
          label="more"
          :disabled="!hasNext"
          text-class="text-primary"
          @tap="goNext"
        >
          <template #start>
            <BaseIcon
              :name="ChevronRight"
              color="#2b7fff"
              :auto="false"
            />
          </template>
        </BaseButton>
      </view>
    </view>
    <view class="flex-1 flex flex-col">
      <scroll-view
        ref="feedScrollViewRef"
        :class="['flex-1 w-full']"
        scroll-orientation="vertical"
        :scroll-top="scrollTop"
        @scroll="onScroll"
      >
        <view v-if="isLoading || isFetching" class="flex justify-center py-2">
          <BaseSpinner show />
        </view>
        <BaseCard v-else flat :margin="false" square>
          <view v-if="isError">
            <text>isError {{ isError }}</text>
            <!-- <BaseAlert
              variant="destructive"
              title="Error"
              :description="feedError"
            >
            </BaseAlert> -->
          </view>
          <view v-else-if="data && data.length > 0">
            <BaseItem
              v-for="(item, index) in data"
              :key="item.id + ''"
              :index="index"
              :title="item.title || ''"
              :description="item.domain || ''"
              button
              :to="`/fetch-data/feed-detail/${item.id}`"
            >
              <template #start>
                <view class="w-12 flex flex-row justify-center mr-2 shrink-0">
                  <text class="text-xl text-primary font-bold">{{
                    item.points || 0
                  }}</text>
                </view>
              </template>
              <view class="flex flex-row flex-wrap py-[3px] pag-2">
                <text class="text-sm text-muted"> by </text>
                <text
                  class="ml-2 text-sm text-muted underline"
                  :catchtap="(event: any) => onUserTap(event, item.user)"
                >
                  {{ item.user }}
                </text>
                <text class="ml-2 text-sm text-muted">
                  {{ item.time_ago }}
                </text>
                <text class="ml-2 text-sm text-muted underline">
                  {{
                    item.comments_count && item.comments_count > 0
                      ? item.comments_count + ' comments'
                      : 'No comments yet'
                  }}
                </text>
              </view>
            </BaseItem>
          </view>
        </BaseCard>
      </scroll-view>
    </view>

    <!-- <BaseLoading
      v-model:visible="isLoading"
      description="Please wait while loading..."
    /> -->
  </view>
</template>
