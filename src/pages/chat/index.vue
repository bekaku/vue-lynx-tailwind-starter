<script setup lang="ts">
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseItem from '@/components/base/BaseItem.vue';
import BaseTextEllipsis from '@/components/base/BaseTextEllipsis.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import ChatAvatar from '@/components/chats/ChatAvatar.vue';
import { useDevice } from '@/composables/useDevice';
import { useTheme } from '@/composables/useTheme';
import { chatHistoryListApi } from '@/libs/mock/chats';
import type { GroupChatDto } from '@/types/common';
import { formattedTime } from '@/utils/dateUtil';
import { biStarFill } from '@quasar/extras/bootstrap-icons';
import { Inbox, Search, VolumeOff, VolumeX } from 'lucide-static';
import { ref, computed, useTemplateRef, onMounted, nextTick } from 'vue';
import BaseAlert from '@/components/base/BaseAlert.vue';
import BaseActionSheet from '@/components/base/BaseActionSheet.vue';
import ChatMenu from '@/components/chats/ChatMenu.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BasePullToRefresh from '@/components/base/BasePullToRefresh.vue';
const { isDark } = useTheme();
const search = ref('');
const dataList = ref<GroupChatDto[]>([...chatHistoryListApi.dataList]);
const searchTextRef =
  useTemplateRef<InstanceType<typeof BaseInput>>('searchTextRef');
const openMenu = ref(false);
const currentTapItem = ref<GroupChatDto>();

onMounted(async () => {
  await nextTick();
});
const filterChats = computed<GroupChatDto[]>(() => {
  return dataList.value.filter((item) => {
    if (!search.value) {
      return [];
    }
    const searchText = search.value.toLowerCase();
    return (
      item.groupName &&
      item.groupName.toLowerCase().includes(searchText.toLowerCase())
    );
  });
});
const onLongpressTap = (e: any, id: number | string | undefined | null) => {
  console.log('onAvatarTap', id);
  if (!id) {
    return;
  }

  const item = filterChats.value.find((item) => item.id === id);
  if (!item) {
    return;
  }
  currentTapItem.value = item;
  openMenu.value = true;
};

const onCloseMenu = (e: any, clearCurrent = true) => {
  openMenu.value = false;
  if (clearCurrent) {
    currentTapItem.value = undefined;
  }
};

const toggleMute = (chatId: number | string) => {
  if (!chatId || !currentTapItem.value) {
    return;
  }
  onCloseMenu(false);
};
const togglePin = (chatId: number | string) => {
  if (!chatId || !currentTapItem.value) {
    return;
  }
  onCloseMenu(false);
};
const toggleFav = (chatId: number | string) => {
  if (!chatId || !currentTapItem.value) {
    return;
  }
  onCloseMenu(false);
};
const invitePeople = (chatId: number | string) => {
  if (!chatId || !currentTapItem.value) {
    return;
  }
  onCloseMenu(false);
};
const deleteChat = async (chatId: number | string) => {
  if (!chatId || !currentTapItem.value) {
    return;
  }
  onCloseMenu(false);
};
const leaveGroup = async (chatId: number | string) => {
  if (!chatId || !currentTapItem.value) {
    return;
  }
  onCloseMenu(false);
};

const isLoading = ref(false);

const onBlurSearchText = () => {
  if (searchTextRef.value) {
    searchTextRef.value.blur();
  }
};
const onReload = async () => {
  onBlurSearchText();
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  isLoading.value = false;
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Chat" />

    <BasePullToRefresh
      scroll-class="flex-1 w-full overflow-hidden bg-card"
      :is-refreshing="isLoading"
      @refresh="onReload"
    >
      <!-- <scroll-view
      ref="chatContentScrollViewRef"
      scroll-orientation="vertical"
      class="bg-card py-4 flex-1"
      :style="{ width: '100%', height: '100%' }"
      :lower-threshold-item-count="2"
    > -->
      <view class="mx-6 mb-6 mt-6">
        <BaseInput
          ref="searchTextRef"
          v-model="search"
          placeholder="Search chats"
        >
          <template #start>
            <BaseIcon :name="Search" />
          </template>
        </BaseInput>
      </view>

      <view
        v-for="(item, index) in filterChats"
        :key="`all-${item.id}-${index}`"
      >
        <BaseItem
          button
          :separator="false"
          top
          :to="`/chat/conversation/${item.id}`"
          @longpress="(e: any) => onLongpressTap(e, item.id)"
        >
          <template #start>
            <ChatAvatar :item="item" />
          </template>

          <view class="flex flex-col items-start gap-0 ">
            <view class="flex flex-row gap-1 items-center ">
              <BaseIcon
                v-if="item?.favorite"
                :name="biStarFill"
                icon-set="quasar-bootstrap-icons"
                color="#f59e0b"
                :size="12"
                :auto-dark="false"
                class="ml-[2px]"
              />
              <BaseTextEllipsis
                :rows="1"
                text-class="text-lg app-text"
                :content="`${item.chatType == 'GROUP' ? '(' + item.totalMembers + ') ' : ''}${
                  item.groupName ? item.groupName : 'Untitled Group'
                }`"
              />
            </view>

            <view
              v-if="item.latestMessageType != 'LOCATION' && item.latestMessage"
              class="flex flex-row gap-1 w-full items-center"
            >
              <BaseIcon
                v-if="item?.muteNotify"
                :name="VolumeOff"
                :size="12"
                color="#52525b"
              />
              <BaseTextEllipsis
                text-class="text-sm text-muted"
                :rows="1"
                :content="item.latestMessage"
              />
            </view>
            <template v-else-if="item.latestMessageType">
              <text class="text-sm text-muted">{{
                item.latestMessageType
              }}</text>
            </template> 
          </view>

          <template #end>
            <view class="flex flex-col gap-2 items-end">
              <text v-if="item.latestUpdate" class="text-xs text-muted">
                {{ formattedTime(item.latestUpdate) }}
              </text>
              <view>
                <BaseBadge
                  v-if="item.totalNewMessage > 0"
                  variant="destructive"
                  class="h-5 w-5 p-0"
                >
                  <text class="text-white text-xs">
                    {{ item.totalNewMessage }}
                  </text>
                </BaseBadge>
              </view>
            </view>
          </template>
        </BaseItem>
      </view>
      <view v-if="filterChats.length === 0" class="p-4">
        <BaseAlert title="Not Found" description="Chats not found.">
          <template #icon>
            <BaseIcon :name="Inbox" />
          </template>
        </BaseAlert>
      </view>
      <!-- </scroll-view> -->
    </BasePullToRefresh>
    <BaseActionSheet
      v-if="openMenu && currentTapItem && currentTapItem.id"
      v-model:visible="openMenu"
      :title="currentTapItem.groupName || ''"
      @close="onCloseMenu"
      @requestclose="onCloseMenu"
    >
      <ChatMenu
        :chat-id="currentTapItem.id"
        :chat-type="currentTapItem.chatType"
        :pin="currentTapItem.pin"
        :mute-notify="currentTapItem.muteNotify"
        :favorite="currentTapItem.favorite"
        @toggle-pin="togglePin"
        @toggle-mute="toggleMute"
        @toggle-fav="toggleFav"
        @delete-chat="deleteChat"
        @leave-group="leaveGroup"
        @invite-people="invitePeople"
      />

      <view class="py-2 px-4">
        <BaseButton variant="outline" label="Cancle" @tap="onCloseMenu" />
      </view>
    </BaseActionSheet>
  </view>
</template>
