<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseTextEllipsis from '@/components/base/BaseTextEllipsis.vue';
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { useTheme } from '@/composables/useTheme';
import BaseIcon from '@/components/base/BaseIcon.vue';
import { Bell, Search } from 'lucide-static';
import { ref } from 'vue';
import type { GroupChatDto } from '@/types/common';
import { chatHistoryListApi } from '@/libs/mock/chats';
import BaseItem from '@/components/base/BaseItem.vue';
import { useDevice } from '@/composables/useDevice';
import { formattedTime } from '@/utils/dateUtil';
const { isDark } = useTheme();
const search = ref('');
const { isAndroid } = useDevice();
const dataList = ref<GroupChatDto[]>([...chatHistoryListApi.dataList]);
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Chat" />

    <scroll-view
      ref="chatContentScrollViewRef"
      scroll-orientation="vertical"
      class="bg-card py-4 flex-1"
      :style="{ width: '100%', height: '100%' }"
      :lower-threshold-item-count="2"
    >
      <view class="mx-4 mb-4">
        <BaseInput v-model="search" placeholder="Search chats">
          <template #start>
            <BaseIcon :name="Search" />
          </template>
        </BaseInput>
      </view>

      <view v-for="(item, index) in dataList" :key="`all-${item.id}-${index}`">
        <BaseItem
          button
          :separator="false"
          top
          :to="`/chat/conversation/${item.id}`"
        >
          <template #start>
            <BaseAvatar
              :src="item.dtoAvatar?.thumbnail || 'https://i.pravatar.cc/150'"
              :fallback="item.id + ''"
            />
          </template>

          <view class="flex flex-col items-start gap-0">
            <BaseTextEllipsis
              :class="isAndroid ? 'py-[-18px]' : ''"
              :rows="1"
              :content="`${item.chatType == 'GROUP' ? '(' + item.totalMembers + ') ' : ''}${
                item.groupName ? item.groupName : 'Untitled Group'
              }`"
            />

            <template
              v-if="item.latestMessageType != 'LOCATION' && item.latestMessage"
            >
              <BaseTextEllipsis
                text-class="text-sm text-muted"
                :class="isAndroid ? 'py-[-18px]' : ''"
                :rows="1"
                :content="item.latestMessage"
              />
            </template>
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
    </scroll-view>
  </view>
</template>
