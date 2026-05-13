<script setup lang="ts">
import BaseItem from '@/components/base/BaseItem.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import type { ChatType } from '@/types/common';
import {
  LogOut,
  Pin,
  PinOff,
  Star,
  Trash,
  UserPlus,
  Volume2,
  VolumeOff,
  VolumeX,
} from 'lucide-static';

const { chatId, chatType } = defineProps<{
  chatId: number | string;
  pin: boolean;
  favorite: boolean;
  muteNotify: boolean;
  chatType: ChatType;
}>();
const emit = defineEmits<{
  'toggle-mute': [chatId: number | string];
  'toggle-pin': [chatId: number | string];
  'toggle-fav': [chatId: number | string];
  'toggle-chat': [chatId: number | string];
  'delete-chat': [chatId: number | string];
  'leave-group': [chatId: number | string];
  'invite-people': [chatId: number | string];
  'on-close': [chatId: number | string];
}>();
const toggleMute = () => {
  if (!chatId) {
    return;
  }
  emit('toggle-mute', chatId);
};
const togglePin = () => {
  if (!chatId) {
    return;
  }
  emit('toggle-pin', chatId);
};
const toggleFav = () => {
  if (!chatId) {
    return;
  }
  emit('toggle-fav', chatId);
};
const invitePeople = () => {
  if (!chatId) {
    return;
  }
  emit('invite-people', chatId);
};
const deleteChat = async () => {
  if (!chatId) {
    return;
  }
  emit('delete-chat', chatId);
};
const leaveGroup = async () => {
  if (!chatId) {
    return;
  }
  emit('leave-group', chatId);
};
</script>
<template>
  <view class="flex flex-col w-full">
    <BaseItem
      :separator="false"
      :title-bold="false"
      :title="!muteNotify ? 'Mute chat' : 'Unmute chat'"
      button
      @tap="toggleMute"
    >
      <template #start>
        <BaseIcon :name="!muteNotify ? Volume2 : VolumeOff" />
      </template>
    </BaseItem>
    <BaseItem
      :separator="false"
      :title-bold="false"
      :title="!pin ? 'Pin' : 'Unpin'"
      button
      @tap="togglePin"
    >
      <template #start>
        <BaseIcon :size="18" :name="pin ? PinOff : Pin" />
      </template>
    </BaseItem>
    <BaseItem
      :separator="false"
      :title-bold="false"
      :title="favorite ? 'Unfavorite' : 'Favorite'"
      button
      @tap="toggleFav"
    >
      <template #start>
        <BaseIcon :size="18" :name="Star" />
      </template>
    </BaseItem>
    <BaseItem
      v-if="chatType == 'GROUP'"
      :separator="false"
      :title-bold="false"
      title="Invite"
      button
      @tap="invitePeople"
    >
      <template #start>
        <BaseIcon :size="18" :name="UserPlus" />
      </template>
    </BaseItem>
    <BaseItem
      :separator="false"
      :title-bold="false"
      title="Delete"
      button
      title-class="text-destructive"
      @tap="deleteChat"
    >
      <template #start>
        <BaseIcon :size="18" :name="Trash" color="#ef4444" :auto-dark="false" />
      </template>
    </BaseItem>
    <BaseItem
      v-if="chatType == 'GROUP'"
      :separator="false"
      :title-bold="false"
      title="Leave the group"
      button
      title-class="text-destructive"
      @tap="leaveGroup"
    >
      <template #start>
        <BaseIcon :size="18" :name="LogOut" color="#ef4444" :auto-dark="false" />
      </template>
    </BaseItem>
  </view>
</template>
