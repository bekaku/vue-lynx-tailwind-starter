<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import type { GroupChatMsgDto } from '@/types/common';
import { biReply } from '@quasar/extras/bootstrap-icons';
import BaseContentText from '../base/BaseContentText.vue';
import BaseIcon from '../base/BaseIcon.vue';

const { item } = defineProps<{
  item: GroupChatMsgDto;
  sent: boolean;
}>();

const emit = defineEmits<{
  'on-tap': [value: number | string];
}>();
const ontap = (e: any) => {
  if (!item || !item.id) {
    return;
  }
  emit('on-tap', item.id);
};
</script>
<template>
  <view
    @tap="ontap"
    class="relative w-full flex flex-col"
    :class="[!sent ? 'items-start' : 'items-end']"
    :style="{
      top: '8px',
      paddingLeft: !sent ? '72px' : '10px',
      paddingRight: !sent ? '10px' : '30px',
    }"
  >
    <view
      class="max-w-[70%] border border-border rounded-2xl p-[8px] flex flex-col"
    >
      <view class="flex flex-row gap-2">
        <BaseAvatar
          v-if="item.sendUser?.avatar?.thumbnail"
          :src="item.sendUser?.avatar?.thumbnail"
          fallback="JD"
          class="h-[20px] w-[20px]"
        />
        <BaseIcon
          :name="biReply"
          icon-set="quasar-bootstrap-icons"
          :size="16"
          color="#71717a"
        />
        <text class="text-sm app-text">Replying to</text>
      </view>
      <view>
        <BaseContentText
          text-class="text-muted text-sm"
          :content="item.chatMsg || item.chatMessageType"
          :ellipsis="{ rows: 2 }"
        />
      </view>
    </view>
  </view>
</template>
