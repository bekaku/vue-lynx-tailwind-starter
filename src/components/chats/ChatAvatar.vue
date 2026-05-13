<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import type { GroupChatDto } from '@/types/common';
import { biPinAngleFill } from '@quasar/extras/bootstrap-icons';

const {
  avatarSize = '40px',
  rounded = false,
  showPin = true,
} = defineProps<{
  item?: GroupChatDto;
  avatarSize?: string;
  rounded?: boolean;
  showPin?: boolean;
}>();
const emit = defineEmits<{
  tap: [e: any];
}>();
const onAvtarTap = (e: any) => {
  emit('tap', e);
};
</script>
<template>
  <view v-if="item" class="relative flex">
    <BaseAvatar
      :src="item?.dtoAvatar?.thumbnail || 'https://i.pravatar.cc/150'"
      :fallback="item.id + ''"
      class="rounded-full shrink-0"
      :style="{ width: avatarSize, height: avatarSize }"
      :catchtap="onAvtarTap"
    />
    <BaseBadge
      v-if="item.online"
      class="bg-green-500/80 absolute p-0"
      :style="{ height: '10px', width: '10px', right: '-2px', top: '1px' }"
    />
    <BaseIcon
      v-if="item.pin"
      class="absolute"
      :name="biPinAngleFill"
      icon-set="quasar-bootstrap-icons"
      :size="12"
      color="#3b82f6"
      :auto-dark="false"
      :style="{ height: '14px', width: '14px', right: '-2px', bottom: '-1px' }"
    />
  </view>
</template>
