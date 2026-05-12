<script setup lang="ts">
import BaseAlert from '@/components/base/BaseAlert.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseContentText from '@/components/base/BaseContentText.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import CommentItem from '@/components/test/CommentItem.vue';
import { useBase } from '@/composables/useBase';
import { useDevice } from '@/composables/useDevice';
import { useFetch } from '@/composables/useFetch';
import { isAbsoluteUrl, toHost } from '@/utils/appUtil';
import { Clock, User } from 'lucide-static';
import { computed, onMounted, useTemplateRef } from 'vue';

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
const { isWeb } = useDevice();
const { getParam } = useBase();

const itemId = computed<string>(() => getParam('id'));
const { data, isLoading, error, execute } = useFetch<ItemDetail>();

onMounted(() => {
  onLoadData();
});
// const { data, isLoading, isFetching, isError } = useQuery({
//   queryKey: computed(() => ['item', itemId.value]),
//   queryFn: () =>
//     execute(`/item/${itemId.value}`, {
//       method: 'GET',
//     }),
//   staleTime: 5 * 60 * 1000,
//   placeholderData: keepPreviousData,
// });
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
const onScroll = (e: any) => {
  console.log('onScroll', e);
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
        @scroll="onScroll"
      >
        <view v-if="isLoading">
          <!-- <BaseSpinner show /> -->
          <view
            class="bg-card flex flex-col mb-[10px] gap-2"
            :style="{ padding: '16px' }"
          >
            <BaseSkeleton width="w-full" :style="{ height: '35px' }" />
            <BaseSkeleton :style="{ height: '10px', width: '30%' }" />
            <BaseSkeleton :style="{ height: '10px', width: '70%' }" />
            <BaseSkeleton :style="{ height: '10px', width: '100%' }" />
            <BaseSkeleton :style="{ height: '10px', width: '100%' }" />
            <BaseSkeleton :style="{ height: '10px', width: '100%' }" />
          </view>

          <view
            v-for="i in 5"
            :key="i"
            class="bg-card flex flex-col gap-2"
            :style="{ padding: '14px' }"
          >
            <view class="flex flex-row gap-2">
              <BaseSkeleton
                width="w-[32px]"
                height="h-[32px]"
                rounded="rounded-full"
              />
              <view class="flex-1 flex flex-col gap-2">
                <BaseSkeleton :style="{ height: '15px' }" />
                <BaseSkeleton :style="{ height: '10px', width: '100%' }" />
                <BaseSkeleton :style="{ height: '10px', width: '100%' }" />
              </view>

              <BaseSkeleton
                rounded="rounded-full"
                :style="{ height: '10px', width: '10px' }"
              />
            </view>
            <view class="flex flex-col gap-2" :style="{ paddingLeft: '40px' }">
              <view class="flex flex-row gap-2">
                <BaseSkeleton :style="{ height: '10px', width: '15%' }" />
                <BaseSkeleton :style="{ height: '10px', width: '15%' }" />
              </view>
            </view>
          </view>
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
              <view class="flex flex-row flex-wrap items-center mt-[8px] gap-[4px]">
                <text class="text-muted text-sm">
                  {{ data.points }} points | by
                </text>
                 <BaseIcon :name="User" :size="15" color="#71717a" />
                <text
                  class="text-muted text-sm underline"
                  :catchtap="(event: any) => onUserTap(event, data?.user)"
                >
                  {{ data.user }}
                </text>

                <BaseIcon :name="Clock" :size="15" color="#71717a" />
                <text class="text-muted text-sm">
                  {{ data.time_ago }}
                </text>
              </view>

              <view class="py-[0.5em]">
                <BaseContentText
                  :ellipsis="{ rows: 3, showMore: true }"
                  :content="data.content"
                />
              </view>
            </BaseCardContent>
          </BaseCard>

          <view
            :style="{
              padding: '16px',
              position: 'sticky',
              top: '0px',
              zIndex: isWeb ? 25 : 0,
            }"
            class="flex flex-col gap-2 bg-card"
            :sticky="true"
            :flatten="false"
          >
            <text v-if="data" class="text-md text-muted">
              {{
                data.comments && data.comments.length
                  ? data.comments.length + ' comments'
                  : 'No comments yet'
              }}</text
            >
          </view>

          <BaseCard flat :margin="false" square class="my-[15px]">
            <view :style="{ paddingLeft: '16px', paddingRight: '16px', paddingBottom: '16px' }">
              <!-- <view
                class="flex flex-row items-center"
                :style="{ gap: '4px', position: 'sticky', top: '0px' }"
                sticky
                :flatten="false"
              >
                <text class="text-md text-muted pt-3">
                  {{
                    data.comments && data.comments.length
                      ? data.comments.length + ' comments'
                      : 'No comments yet'
                  }}
                </text>
              </view> -->
              <CommentItem
                v-for="(comment, index) in data.comments"
                :key="comment.id"
                :index="index"
                :comment="comment"
                :depth="0"
              />
            </view>
          </BaseCard>
        </template>
      </scroll-view>
    </view>
  </view>
</template>
