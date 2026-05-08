<script setup lang="ts">
import { ref } from 'vue-lynx';
import { pluralize, stripHtml } from '@/utils/appUtil';
import BaseItem from '../base/BaseItem.vue';
import IconLucide from '../IconLucide.vue';
import BaseButton from '../base/BaseButton.vue';
import BaseAvatar from '../base/BaseAvatar.vue';
import BaseRipple from '../base/BaseRipple.vue';
import { useBase } from '@/composables/useBase';
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
}>();
const { isAndroid } = useDevice();
const open = ref(false);

const onUserTap = (e: any, user?: string) => {
  console.log('onUserTap', user, e);
};
</script>

<template>
  <view
    v-if="comment && comment.user"
    class="flex flex-col border-t"
    :style="{ paddingLeft: `${(depth ?? 0) * 8}px` }"
  >
    <BaseItem
      :separator="false"
      class="pl-0"
      :class="isAndroid ? 'py-[-10px]' : ''"
    >
      <template #start>
        <BaseAvatar
          class="mr-[6px]"
          :class="[
            depth && depth > 0 ? 'h-[24px] w-[24px]' : 'h-[32px] w-[32px]',
          ]"
          src="https://i.pravatar.cc/128"
          :fallback="comment.id + ''"
        />
      </template>
      <view class="flex flex-row" :style="{ gap: '6px' }">
        <text
          :style="{
            fontSize: '0.9em',
            textDecorationLine: 'underline',
          }"
          :catchtap="(event: any) => onUserTap(event, comment?.user)"
        >
          {{ comment.user }}
        </text>
        <text class="text-muted" :style="{ fontSize: '0.9em' }">
          {{ comment.time_ago }}
        </text>
      </view>
      <template #end>
        <BaseButton
          size="icon"
          variant="ghost"
          rounded
          class="h-[18px] w-[18px]"
        >
          <IconLucide :size="16" name="ellipsisVertical" />
        </BaseButton>
      </template>
    </BaseItem>

    <!-- Comment body -->
    <view :class="[depth && depth > 0 ? 'ml-[30px]' : 'ml-[38px]']">
      <view
        class="bg-content-item py-[0.5em] px-[0.5em] rounded-lg active:opacity-80 w-fit"
      >
        <text :style="{ fontSize: '0.9em', lineHeight: '1.5em' }">
          {{ stripHtml(comment.content) }}
        </text>
      </view>
      <view
        class="flex flex-row mb-[0.5em] py-[0.5em] px-[0.5em] gap-2 items-center"
      >
        <view class="active:bg-ripple flex gap-1 items-center">
          <text class="text-sm">Love it</text>
          <IconLucide name="heart" :size="16" />
          <text class="text-sm text-muted">1.9k</text>
        </view>

        <text class="text-sm text-muted">|</text>
        <view class="active:bg-ripple flex gap-1 items-center">
          <text class="text-sm">Reply it</text>
          <text class="text-sm text-muted">{{ comment.comments.length }}</text>
        </view>
      </view>

      <!-- Toggle children -->
      <view v-if="comment.comments && comment.comments.length">
        <view
          :style="{
            backgroundColor: open ? 'transparent' : '#fffbf2',
            borderRadius: '4px',
            padding: open ? '0' : '0.3em 0.5em',
            alignSelf: 'flex-start',
            marginBottom: open ? '0' : '0.5em',
          }"
          @tap="open = !open"
        >
          <text class="text-muted" :style="{ fontSize: '0.9em' }">
            {{
              open
                ? '[-]'
                : '[+] ' +
                  pluralize(comment.comments.length, 'reply', 'replies') +
                  ' collapsed'
            }}
          </text>
        </view>
      </view>
    </view>

    <!-- Nested comments -->
    <template v-if="open && comment.comments">
      <CommentItem
        v-for="child in comment.comments"
        :key="child.id"
        :comment="child"
        :depth="(depth ?? 0) + 1"
      />
    </template>
  </view>
</template>
