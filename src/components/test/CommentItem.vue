<script setup lang="ts">
import { pluralize } from '@/utils/appUtil';
import {
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  Heart,
  MessageCircleMore,
} from 'lucide-static';
import { ref } from 'vue';
import BaseAvatar from '../base/BaseAvatar.vue';
import BaseButton from '../base/BaseButton.vue';
import BaseContentText from '../base/BaseContentText.vue';
import BaseIcon from '../base/BaseIcon.vue';
import BaseItem from '../base/BaseItem.vue';
import { useDevice } from '@/composables/useDevice';

interface CommentData {
  id: number;
  user: string;
  time_ago: string;
  content: string;
  comments: CommentData[];
}

defineProps<{
  comment: CommentData;
  depth?: number;
  index?: number;
  isChild?: boolean;
}>();
const open = ref(false);
const { isAndroid } = useDevice();
const onUserTap = (e: any, user?: string) => {
  console.log('onUserTap', user, e);
};
</script>

<template>
  <view
    v-if="comment && comment.user"
    class="relative flex flex-col"
    :style="{ paddingLeft: `${(isChild ? 1 : 0) * 16}px` }"
  >
    <!-- :style="{ paddingLeft: `${(depth ?? 1) * 10}px` }" -->
    <view
      class="absolute top-0 bottom-0 w-[14px] border-border"
      :class="[isChild ? 'border-r border-t ml-[4px]' : 'border-r']"
      :style="{
        left: `${(isChild ? 1 : 0) * 10}px`,
        top: '14px',
        bottom: '14px',
      }"
    ></view>
    <!-- left: `${(depth ?? 0) * 10}px`, -->
    <BaseItem
      :separator="false"
      class="pl-0 bg-transparent"
      :class="isAndroid ? 'pb-[-4px]' : ''"
      top
    >
      <template #start>
        <BaseAvatar
          :class="[isChild ? 'h-[24px] w-[24px]' : 'h-[32px] w-[32px]']"
          :src="
            index
              ? index % 2 !== 0
                ? 'https://randomuser.me/api/portraits/men/1.jpg'
                : 'https://randomuser.me/api/portraits/women/21.jpg'
              : 'https://i.pravatar.cc/128'
          "
          :fallback="comment.id + ''"
        />
      </template>
      <view class="flex flex-row items-center" :style="{ gap: '6px' }">
        <text
          class="text-base font-semibold"
          :catchtap="(event: any) => onUserTap(event, comment?.user)"
        >
          {{ comment.user }}
        </text>
        <text class="text-muted" :style="{ fontSize: '0.9em' }">
          {{ comment.time_ago }}
        </text>
      </view>
      <view class="active:opacity-80 self-start max-w-full pt-0">
        <BaseContentText
          :class="isAndroid ? 'pt-[-8px]' : ''"
          :content="comment.content"
          :ellipsis="{ rows: 3, showMore: true }"
        />
      </view>
      <template #end>
        <BaseButton
          size="icon"
          variant="ghost"
          rounded
          class="h-[18px] w-[18px]"
        >
          <BaseIcon :name="EllipsisVertical" :size="16" />
        </BaseButton>
      </template>
    </BaseItem>

    <!-- Comment body -->
    <view :style="{ marginLeft: depth && depth > 0 ? '36px' : '44px' }">
      <!-- <view
        class="bg-content-item py-[0.5em] px-[0.5em] rounded-lg active:opacity-80 self-start max-w-full"
      >
        <text :style="{ lineHeight: '1.5em' }">
          {{ stripHtml(comment.content) }}
        </text>
      </view> -->
      <view
        class="flex flex-row mb-[0.5em] py-[0.5em] px-[0.5em] gap-2 items-center"
      >
        <view class="active:bg-ripple rounded-sm flex gap-1 items-center">
          <text class="text-sm text-muted">Love it</text>
          <BaseIcon :name="Heart" :size="16" />
          <text class="text-sm text-muted">1.9k</text>
        </view>

        <text class="text-sm text-muted">|</text>
        <view class="active:bg-ripple rounded-sm flex gap-1 items-center">
          <text class="text-sm text-muted">Reply it</text>
          <BaseIcon :name="MessageCircleMore" :size="16" />
          <text class="text-sm text-muted">{{ comment.comments.length }}</text>
        </view>
      </view>

      <!-- Toggle children -->
      <view
        v-if="comment.comments && comment.comments.length"
        :style="{ paddingLeft: '0.5em' }"
      >
        <view
          :style="{
            borderRadius: '10px',
            padding: '8px',
            alignSelf: 'flex-start',
          }"
          class="bg-content-item flex gap-2 active:bg-ripple"
          @tap="open = !open"
        >
          <BaseIcon :name="open ? ChevronUp : ChevronDown" :size="16" />
          <text class="text-muted" :style="{ fontSize: '0.9em' }">
            {{
              (!open ? 'View ' : 'Hide ') +
              pluralize(comment.comments.length, 'reply', 'replies')
            }}
          </text>
        </view>
      </view>
    </view>

    <!-- Nested comments -->
    <template v-if="open && comment.comments">
      <CommentItem
        v-for="(child, index) in comment.comments"
        :key="child.id"
        :index="index"
        :comment="child"
        :depth="(depth ?? 0) + 1"
        is-child
      />
    </template>
  </view>
</template>
