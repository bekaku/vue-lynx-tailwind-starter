<script setup lang="ts">
import BaseAlert from '@/components/base/BaseAlert.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseLoading from '@/components/base/BaseLoading.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import CommentItem from '@/components/test/CommentItem.vue';
import { useBase } from '@/composables/useBase';
import { useFetch } from '@/composables/useFetch';
import { isAbsoluteUrl, stripHtml, toHost } from '@/utils/appUtil';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { computed, onMounted, useTemplateRef } from 'vue-lynx';

interface ItemDetail {
  id: number;
  title: string;
  url: string;
  user: string;
  points: number;
  time_ago: string;
  comments_count: number;
  comments: CommentData[];
  content: string;
  type: string;
}
interface CommentData {
  id: number;
  user: string;
  time_ago: string;
  content: string;
  comments: CommentData[];
}

const feedScrollViewRef = useTemplateRef<any>('feedScrollViewRef');

const { getParam } = useBase();

const itemId = computed<string>(() => getParam('id'));
const {
  // data,
  // isLoading,
  error,
  execute,
} = useFetch<ItemDetail>();

onMounted(() => {
  // onLoadData();
});
const { data, isLoading, isFetching, isError } = useQuery({
  queryKey: computed(() => ['item', itemId.value]),
  queryFn: () =>
    execute(`/item/${itemId.value}`, {
      method: 'GET',
    }),
  staleTime: 5 * 60 * 1000,
  placeholderData: keepPreviousData,
});
const onLoadData = async () => {
  try {
    const response = await execute(`/item/${itemId.value}`, {
      method: 'GET',
    });
    console.log('response', response);
  } catch (err) {
    console.error('Error:', err);
  }
};
const onUserTap = (e: any, user?: string) => {
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
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Item Detail" />
    <view class="flex-1 flex flex-col">
      <scroll-view
        ref="feedScrollViewRef"
        :class="['flex-1 w-full']"
        scroll-orientation="vertical"
      >
        <view v-if="isLoading || isFetching" class="flex justify-center py-2">
          <BaseSpinner show />
        </view>
        <view v-else-if="error">
          <BaseAlert variant="destructive" title="Error" :description="error">
          </BaseAlert>
        </view>
        <template v-else-if="data">
          <BaseCard flat :margin="false" square>
            <BaseCardContent>
              <text
                :style="{
                  lineHeight: '1.3em',
                }"
                class="text-2xl font-bold"
              >
                {{ data.title }}
              </text>

              <text
                v-if="isAbsoluteUrl(data.url)"
                class="text-muted text-sm mt-[4px]"
              >
                {{ toHost(data.url) }}
              </text>
              <view class="flex flex-row flex-wrap mt-[8px] gap-[4px]">
                <text class="text-muted text-sm">
                  {{ data.points }} points | by
                </text>
                <text
                  class="text-muted text-sm underline"
                  :catchtap="(event: any) => onUserTap(event, data?.user)"
                >
                  {{ data.user }}
                </text>
                <text class="text-muted text-sm">
                  {{ data.time_ago }}
                </text>
              </view>

              <view class="py-[0.5em]">
                <text :style="{ fontSize: '0.9em', lineHeight: '1.5em' }">
                  {{ stripHtml(data.content) }}
                </text>
              </view>
            </BaseCardContent>
          </BaseCard>

          <BaseCard flat :margin="false" square class="mt-[15px]">
            <BaseCardContent>
              <view
                class="flex flex-row items-center"
                :style="{ padding: '1em 0', gap: '8px' }"
              >
                <text class="text-md text-muted">
                  {{
                    data.comments && data.comments.length
                      ? data.comments.length + ' comments'
                      : 'No comments yet'
                  }}
                </text>
              </view>
              <CommentItem
                v-for="comment in data.comments"
                :key="comment.id"
                :comment="comment"
                :depth="0"
              />
            </BaseCardContent>
          </BaseCard>
        </template>
      </scroll-view>
    </view>

    <!-- <BaseLoading
      v-model:visible="isLoading"
      description="Please wait while loading..."
    /> -->
  </view>
</template>
