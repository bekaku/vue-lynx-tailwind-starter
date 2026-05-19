<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BasePopover from '@/components/base/BasePopover.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import BaseTextEllipsis from '@/components/base/BaseTextEllipsis.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import ChatAvatar from '@/components/chats/ChatAvatar.vue';
import ChatInput from '@/components/chats/ChatInput.vue';
import ChatItem from '@/components/chats/ChatItem.vue';
import ChatMenu from '@/components/chats/ChatMenu.vue';
import { useBase } from '@/composables/useBase';
import { useDevice } from '@/composables/useDevice';
import { chatHistoryListApi, chatMessageListApi } from '@/libs/mock/chats';
import type { GroupChatDto, GroupChatMsgDto } from '@/types/common';
import { biStarFill } from '@quasar/extras/bootstrap-icons';
import { EllipsisVertical, Phone, Video, VolumeOff } from 'lucide-static';
import { computed, nextTick, onMounted, ref, useTemplateRef } from 'vue';
defineEmits<{
  'toggle-mute': [chatId: number | string];
  'toggle-pin': [chatId: number | string];
  'toggle-fav': [chatId: number | string];
  'toggle-chat': [chatId: number | string];
  'delete-chat': [chatId: number | string];
  'leave-group': [chatId: number | string];
  'invite-people': [chatId: number | string];
}>();
const { getParam } = useBase();
const pageId = computed<string>(() => getParam('id'));
const chatContentScrollViewRef = useTemplateRef<any>(
  'chatContentScrollViewRef',
);
const dataList = ref<GroupChatMsgDto[]>([...chatMessageListApi.dataList]);
const hasMoreData = ref(true);
const totalPage = ref(0);
const isLoading = ref(false);
const firstLoad = ref(false);

const inputText = ref('');

const currentUserId = 1;
const groupItem = ref<GroupChatDto>();
onMounted(async () => {
  groupItem.value = chatHistoryListApi.dataList.find(
    (item) => item.id == pageId.value,
  );
  await nextTick();
  setTimeout(() => {
    onScrollToBottom(false);
    setTimeout(() => {
      onScrollToBottom(true);
      console.log('chat page -> firstLoad complete');
      firstLoad.value = true;
    }, 400);
  }, 100);
});
const onScrolltoupper = (e: any) => {
  if (!hasMoreData.value || isLoading.value || !firstLoad.value) {
    return;
  }

  console.log('onScrolltoupper', e);
  totalPage.value++;
  isLoading.value = true;

  // Simulate API Delay
  setTimeout(async () => {
    if (totalPage.value == 3) {
      hasMoreData.value = false;
    }

    // 1. Get the exact number of items we are adding
    const newItems = chatMessageListApi.dataList;
    const addedCount = newItems.length;

    // 2. Add the items to the top of the list
    dataList.value.unshift(...newItems);
    isLoading.value = false;

    // 3. Wait for the Vue virtual DOM to update the nodes
    await nextTick();

    // 4. Important: The native layout engine might need a split second to measure the new items.
    // We use a tiny timeout to ensure the layout is ready.
    setTimeout(() => {
      // 🌟 Jump to the old top message (which is now shifted down by 'addedCount').
      // Use smooth: false so it happens instantly without the user seeing a jump.
      onScrollToItem(addedCount, false);
    }, 50);
  }, 1500);
};
const onScroll = (e: any) => {
  //   console.log('onScroll', e);
};
const onScrollToItem = (targetIndex: number, isSmooth: boolean = true) => {
  if (chatContentScrollViewRef.value) {
    chatContentScrollViewRef.value
      .invoke({
        method: 'scrollTo',
        params: {
          index: targetIndex,
          offset: 0,
          smooth: isSmooth,
        },
      })
      .exec();
  }
};
const onScrollToBottom = (isSmooth: boolean = true) => {
  if (!chatContentScrollViewRef.value || dataList.value.length === 0) {
    return;
  }
  onScrollToItem(dataList.value.length - 1, isSmooth);
};
const onScrollToTop = (isSmooth: boolean = false) => {
  if (!chatContentScrollViewRef.value || dataList.value.length === 0) {
    return;
  }
  onScrollToItem(0, isSmooth);
};

const onSendMsg = async (message: string) => {
  if (!message) {
    return;
  }
  const msg = message.trim();
  if (!msg) return;

  const newMessage = {
    id: Date.now(),
    chatMsg: msg,
    msgDateTime: new Date().toISOString(),
    readCount: 0,
    sent: true,
    sendUser: {
      id: currentUserId,
      email: 'myemail@test.com',
      name: 'Chanawee',
      active: true,
    },
  };

  dataList.value.push(newMessage);

  inputText.value = '';

  await nextTick();
  onScrollToBottom(true);
};
const onAttachTap = () => {
  console.log('Open attachment menu');
};

const onEmojiKeyboardTap = () => {
  console.log('Open emoji keyboard');
};

const onMicTap = () => {
  console.log('Start voice record');
};

const toggleMute = (chatId: number | string) => {
  if (!chatId || !groupItem.value) {
    return;
  }
  groupItem.value.muteNotify = !groupItem.value.muteNotify;
};
const togglePin = (chatId: number | string) => {
  if (!chatId || !groupItem.value) {
    return;
  }
  groupItem.value.pin = !groupItem.value.pin;
};
const toggleFav = (chatId: number | string) => {
  if (!chatId || !groupItem.value) {
    return;
  }
  groupItem.value.favorite = !groupItem.value.favorite;
};
const invitePeople = (chatId: number | string) => {
  if (!chatId || !groupItem.value) {
    return;
  }
};
const deleteChat = async (chatId: number | string) => {
  if (!chatId || !groupItem.value) {
    return;
  }
};
const leaveGroup = async (chatId: number | string) => {
  if (!chatId || !groupItem.value) {
    return;
  }
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar
      title="Chat Page Test Page 2 this is just test long title bar to see how it looks"
      top
      title-left
    >
      <view class="flex flex-row flex-1 gap-1 justify-start">
        <view class="mt-1 mr-1">
          <ChatAvatar :item="groupItem" />
        </view>
        <view class="flex flex-col flex-1 justify-start">
          <BaseTextEllipsis
            text-class="font-semibold text-md"
            :rows="1"
            :content="groupItem?.groupName || 'Untitled Group'"
          >
            <template #default="{ textStyles, textMaxline }">
              <view class="flex flex-row items-center">
                <text
                  class="app-text flex-wrap leading-relaxed font-semibold text-md"
                  :style="{ lineHeight: '1.5em', ...textStyles }"
                  :text-maxline="textMaxline"
                >
                  {{ groupItem?.groupName || 'Untitled Group' }}
                </text>
                <BaseIcon
                  v-if="groupItem?.favorite"
                  :name="biStarFill"
                  icon-set="quasar-bootstrap-icons"
                  color="#f59e0b"
                  :size="12"
                  :auto-dark="false"
                  class="ml-[2px]"
                />
                <BaseIcon
                  v-if="groupItem?.muteNotify"
                  :name="VolumeOff"
                  :size="12"
                  color="#a1a1aa"
                  class="ml-[2px]"
                />
              </view>
            </template>
          </BaseTextEllipsis>
          <view class="flex flex-row items-center gap-1">
            <text class="text-xs text-muted">
              {{
                groupItem?.chatType == 'PERSONAL'
                  ? 'Software engineer'
                  : 'Group'
              }}
            </text>
          </view>
        </view>
      </view>
      <template #end>
        <view class="flex flex-row gap-1.5 pr-2">
          <BaseButton variant="ghost" rounded size="icon" class="h-8 w-8">
            <BaseIcon
              :name="Phone"
              :size="18"
              color="#2b7fff"
              :auto-dark="false"
            />
          </BaseButton>
          <BaseButton variant="ghost" rounded size="icon" class="h-8 w-8">
            <BaseIcon
              :name="Video"
              :size="18"
              color="#2b7fff"
              :auto-dark="false"
            />
          </BaseButton>

          <BasePopover position="bottom-right">
            <template #trigger="{ isOpen }">
              <BaseIcon
                :name="EllipsisVertical"
                :size="18"
                color="#2b7fff"
                :auto-dark="false"
              />
            </template>

            <template #default="{ close }">
              <ChatMenu
                v-if="groupItem && groupItem.id"
                :chat-id="groupItem.id"
                :chat-type="groupItem.chatType"
                :pin="groupItem.pin"
                :mute-notify="groupItem.muteNotify"
                :favorite="groupItem.favorite"
                @toggle-pin="
                  (chatId: number | string) => {
                    togglePin(chatId);
                    close();
                  }
                "
                @toggle-mute="
                  (chatId: number | string) => {
                    toggleMute(chatId);
                    close();
                  }
                "
                @toggle-fav="
                  (chatId: number | string) => {
                    toggleFav(chatId);
                    close();
                  }
                "
                @delete-chat="
                  (chatId: number | string) => {
                    deleteChat(chatId);
                    close();
                  }
                "
                @leave-group="
                  (chatId: number | string) => {
                    leaveGroup(chatId);
                    close();
                  }
                "
                @invite-people="
                  (chatId: number | string) => {
                    invitePeople(chatId);
                    close();
                  }
                "
              />
            </template>
          </BasePopover>
        </view>
      </template>
    </BaseToolBar>
    <view
      v-if="isLoading"
      class="absolute top-[85px] left-0 w-full flex flex-row justify-center z-50 pointer-events-none"
    >
      <view class="bg-black/40 p-2 rounded-md flex flex-row gap-2 items-center">
        <BaseSpinner width="18px" show />
        <text class="text-xs text-white">Loading messages...</text>
      </view>
    </view>
    <scroll-view
      ref="chatContentScrollViewRef"
      scroll-orientation="vertical"
      class="bg-card py-4 flex-1"
      :style="{ width: '100%', height: '100%' }"
      :lower-threshold-item-count="2"
      @scrolltoupper="onScrolltoupper"
      @scroll="onScroll"
    >
      <view v-for="(item, index) in dataList" :key="`chat-${item.id}-${index}`">
        <ChatItem :item="item" :index="index" />
      </view>
    </scroll-view>

    <ChatInput @on-send="onSendMsg" />
  </view>
</template>
