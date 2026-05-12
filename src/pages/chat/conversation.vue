<script setup lang="ts">
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseTextEllipsis from '@/components/base/BaseTextEllipsis.vue';
import ChatItem from '@/components/chats/ChatItem.vue';
import { useDevice } from '@/composables/useDevice';
import { chatMessageListApi } from '@/libs/mock/chats';
import type { GroupChatMsgDto } from '@/types/common';
import { nextTick, ref, useTemplateRef, onMounted, computed } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import {
  EllipsisVertical,
  Mic,
  Phone,
  Plus,
  Send,
  Smile,
  Video,
} from 'lucide-static';
import { useBase } from '@/composables/useBase';
import { biEmojiSmile } from '@quasar/extras/bootstrap-icons';
import ChatInput from '@/components/chats/ChatInput.vue';

const { isAndroid } = useDevice();
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
onMounted(async () => {
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
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar
      title="Chat Page Test Page 2 this is just test long title bar to see how it looks"
      top
      title-left
    >
      <view class="flex flex-col flex-1 justify-start">
        <BaseTextEllipsis
          :class="isAndroid ? 'py-[-14px]' : ''"
          text-class="font-semibold text-lg"
          :rows="1"
          :content="`Conversation Page Id: ${pageId}`"
        />
        <view class="flex flex-row">
          <text class="text-xs text-muted">Group 1</text>
        </view>
      </view>
      <template #end>
        <view class="flex flex-row gap-1">
          <BaseButton variant="ghost" rounded size="icon" class="h-8 w-8">
            <BaseIcon :name="Phone" :size="18" color="#2b7fff" :auto="false" />
          </BaseButton>
          <BaseButton variant="ghost" rounded size="icon" class="h-8 w-8">
            <BaseIcon :name="Video" :size="18" color="#2b7fff" :auto="false" />
          </BaseButton>
          <BaseButton variant="ghost" rounded size="icon" class="h-8 w-8">
            <BaseIcon
              :name="EllipsisVertical"
              :size="18"
              color="#2b7fff"
              :auto="false"
            />
          </BaseButton>
        </view>
      </template>
    </BaseToolBar>
    <view
      v-if="isLoading"
      class="absolute top-[70px] left-0 w-full flex flex-row justify-center z-50 pointer-events-none"
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
      <ChatItem
        v-for="(item, index) in dataList"
        :key="`chat-${item.id}-${index}`"
        :item="item"
        :index="index"
      />
    </scroll-view>

    <ChatInput @on-send="onSendMsg"/>

    <!-- <view
      class="w-full bg-card px-4 py-3 flex flex-row items-center border-t border-gray-200"
    >
      <view class="p-2 mr-1 active:opacity-70 rounded-full" @tap="onAttachTap">
        <BaseIcon :name="Plus" :size="24" color="#2b7fff" :auto="false" />
      </view>

      <view
        class="flex-1 bg-gray-100 rounded-lg px-4 py-2 flex flex-row items-center min-h-[40px]"
      >
        <BaseTextarea
          textarea-class="flex-1 bg-transparent py-0 text-base max-h-[120px]"
          placeholder="Type a message..."
          auto-grow
          dense
          transparent
          :border="false"
          :maxlength="1000"
          :maxlines="6"
          v-model="inputText"
        >
        </BaseTextarea>

        <view
          class="p-1 active:opacity-70 ml-1 rounded-full"
          @tap="onEmojiKeyboardTap"
        >
          <BaseIcon
            :name="biEmojiSmile"
            icon-set="quasar-bootstrap-icons"
            :size="20"
            color="#2b7fff"
            :auto="false"
          />
        </view>
      </view>

      <view
        v-if="inputText.trim().length > 0"
        class="ml-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center active:opacity-70"
        @tap="onSendMsg"
      >
        <BaseIcon
          :name="Send"
          :size="18"
          color="#fff"
          :auto="false"
          style="margin-left: 2px"
        />
      </view>

      <view
        v-else
        class="p-2 ml-1 active:opacity-70 rounded-full"
        @tap="onMicTap"
      >
        <BaseIcon :name="Mic" :size="24" color="#2b7fff" :auto="false" />
      </view>
    </view> -->
  </view>
</template>
