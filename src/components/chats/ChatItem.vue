<script setup lang="ts">
import type {
  FileManager,
  GroupChatFileDto,
  GroupChatMsgDto,
} from '@/types/common';
import { computed } from 'vue';
import BaseImage from '../base/BaseImage.vue';
import BaseAvatar from '../base/BaseAvatar.vue';
import BaseContentText from '../base/BaseContentText.vue';
import { useTheme } from '@/composables/useTheme';
import { Download, EllipsisVertical, File, Heart, Smile } from 'lucide-static';
import BaseIcon from '../base/BaseIcon.vue';
import BaseItem from '../base/BaseItem.vue';
import { formattedDateTime } from '@/utils/dateUtil';

// --- Props & Emits ---
const { isDark } = useTheme();
const props = withDefaults(
  defineProps<{
    item: GroupChatMsgDto;
    index: number;
    showSendAvatar?: boolean;
  }>(),
  {
    showSendAvatar: false,
  },
);

const emit = defineEmits<{
  (e: 'on-save-all', files: GroupChatFileDto[]): void;
  (e: 'on-media-tap', file: GroupChatFileDto, index: number): void;
}>();

// --- Computed Properties ---
const isMine = computed(() => {
  if (!props.item) {
    return false;
  }
  return props.item.sent;
});

const isMutedMessage = computed(
  () =>
    props.item.unsend ||
    props.item.chatMessageType == 'LEAVE' ||
    props.item.chatMessageType == 'INVITE',
);

const isBgTransparent = computed(
  () =>
    getImageItems.value.length > 0 &&
    !props.item.chatMsg &&
    getFilesItems.value.length == 0,
);
const messageTextColor = computed(() => {
  if (isMutedMessage.value) {
    return isDark.value ? 'text-zinc-400' : 'text-zinc-600';
  }
  return props.item.sent
    ? 'text-zinc-900'
    : isDark.value
      ? 'text-white'
      : 'text-zinc-950';
});
const messageBg = computed(() => {
  if (isMutedMessage.value) {
    return isDark.value ? 'bg-zinc-500' : 'bg-zinc-200';
  }
  if (isBgTransparent.value) {
    // return 'bg-transparent';
  }
  return props.item.sent
    ? 'bg-primary-100'
    : isDark.value
      ? 'bg-zinc-700'
      : 'bg-zinc-200';
});
const senderName = computed(() => {
  return props.item.sendUser?.username || 'Unknown User';
});

const avatarSrc = computed(() => {
  return props.item.sendUser?.avatar?.thumbnail || 'https://i.pravatar.cc/150';
});

const formattedTime = computed(() => {
  if (!props.item.msgDateTime) {
    return '';
  }
  // Combine them into the exact requested format: "DD/MM/YYYY HH:mm"
  return formattedDateTime(props.item.msgDateTime);
});

const statusText = computed(() => {
  if (props.item.unsend) return 'Unsent';
  if (props.item.readCount > 0) return `Read by ${props.item.readCount}`;
  if (props.item.sent) return 'Delivered';
  return 'Sending...';
});

// --- Media Grid Logic ---
const getImageItems = computed(() => {
  if (!props.item?.files || props.item.files.length == 0) {
    return [];
  }
  return props.item.files.filter(
    (f) => f.fileManager && f.fileManager.fileMimeType == 'IMAGE',
  );
});
const getFilesItems = computed(() =>
  !props.item.files
    ? []
    : props.item.files.filter(
        (f) => f.fileManager && f.fileManager.fileMimeType != 'IMAGE',
      ),
);
const hasFiles = computed(() => {
  if (!props.item || !props.item.files || props.item.files.length == 0) {
    return false;
  }
  return getFilesItems.value.length > 0;
});
const hasFilesImage = computed(() => {
  if (!props.item || !props.item.files || props.item.files.length == 0) {
    return false;
  }
  return getImageItems.value.length > 0;
});

const displayFilesImage = computed(() => {
  if (!getImageItems.value) return [];
  // Take maximum of 4 files for the grid
  return getImageItems.value.slice(0, 4);
});

const extraFilesImageCount = computed(() => {
  if (!getImageItems.value) return 0;
  // If there are more than 4 files, calculate the remainder
  return Math.max(0, getImageItems.value.length - 4);
});

// Set a fixed width container for the grid to ensure perfect squares
// Adjust '240px' based on your layout constraints
const gridWidth = computed(() => {
  if (!getImageItems.value) return 'auto';
  const count = getImageItems.value.length;
  return count >= 2 ? '240px' : '160px';
});

const getGridItemStyle = (index: number) => {
  const count = displayFilesImage.value.length;

  // Single image: full width
  if (count === 1) {
    return { width: '100%', height: '160px' };
    // return { width: '160px', height: '160px' };
  }

  // 2 or more images: 2 columns
  return {
    width: 'calc(50% - 2px)',
    height: '118px',
    // marginBottom: index < 2 ? '4px' : '0',
  };
  // return {
  //   width: '118px',
  //   height: '118px',
  //   marginBottom: index < 2 ? '4px' : '0',
  // };
};

// --- Event Handlers ---

const onSaveAll = () => {
  if (props.item.files) {
    console.log('onSaveAll');
    emit('on-save-all', props.item.files);
  }
};

const onMediaTap = (file: GroupChatFileDto, index: number) => {
  console.log('onMediaTap', file);
  emit('on-media-tap', file, index);
};
const onFileTap = (file: GroupChatFileDto, index: number) => {
  console.log('onFileTap', file);
};
const onUserTap = (e: any) => {
  console.log('onUserTap', e);
};

const onOptionsTap = (e: any) => {
  console.log('onOptionsTap', e);
};

const onEmojiTap = (e: any) => {
  console.log('onEmojiTap', e);
};
const handleLongpressText = (e: any) => {
  console.log('handleLongpressText', e);
};
</script>
<template>
  <view
    class="w-full flex flex-row mb-4 px-4"
    :class="isMine ? 'justify-end' : 'justify-start'"
  >
    <BaseAvatar
      v-if="!isMine"
      :src="avatarSrc"
      :fallback="item.id + ''"
      class="w-8 h-8 rounded-full mr-3 shrink-0"
      :catchtap="onUserTap"
    />

    <view
      v-if="isMine && !isMutedMessage"
      class="flex flex-row items-end gap-1 mr-1 self-end mb-6"
    >
      <view class="p-1 active:opacity-70 rounded-full" @tap="onEmojiTap">
        <BaseIcon :name="Heart" :size="18" color="#57534e" />
      </view>
      <view class="p-1 active:opacity-70 rounded-full" @tap="onOptionsTap">
        <BaseIcon :name="EllipsisVertical" :size="18" color="#57534e" />
      </view>
    </view>

    <view class="flex flex-col max-w-[75%]">
      <view
        class="flex flex-row items-center mb-1"
        :class="isMine ? 'justify-end' : 'justify-start'"
        :catchtap="onUserTap"
      >
        <text v-if="!isMine" class="text-sm font-semibold text-foreground mr-2">
          {{ senderName }}
        </text>
        <!-- <text class="text-xs text-muted">{{ formattedTime }}</text> -->
      </view>

      <view
        class="p-3 flex flex-col"
        :class="[
          isMine ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm',
          messageBg,
        ]"
      >
        <BaseContentText
          v-if="item.chatMsg"
          class="mb-1"
          :text-class="messageTextColor"
          :content="item.chatMsg || ''"
        />

        <!-- <view
          v-if="hasFilesImage"
          class="flex flex-row flex-wrap justify-between"
          :style="{ width: gridWidth }"
        >
          <view
            v-for="(file, index) in displayFilesImage"
            :key="index"
            class="relative overflow-hidden rounded-sm"
            :style="getGridItemStyle(index)"
            @tap="onMediaTap(file, index)"
          >
            <BaseImage
              v-if="file.fileManager"
              :src="
                file.fileManager?.fileThumbnailPath ||
                file.fileManager?.filePath
              "
              class="w-full h-full"
              fit="aspectFill"
            />

            <view
              v-if="index === 3 && extraFilesImageCount > 0"
              class="absolute top-0 bg-black/50 left-0 w-full h-full flex flex-row items-center justify-center z-11"
            >
              <text class="text-white text-xl font-bold">
                +{{ extraFilesImageCount }}
              </text>
            </view>
          </view>
        </view> -->

        <view
          v-if="hasFilesImage"
          class="flex flex-row flex-wrap"
          :style="{ width: gridWidth }"
        >
          <view
            v-for="(file, index) in displayFilesImage"
            :key="index"
            class="rounded-lg border border-border overflow-hidden relative"
            @tap="onMediaTap(file, index)"
            :style="getGridItemStyle(index)"
          >
            <BaseImage
              v-if="file.fileManager"
              :src="
                file.fileManager?.fileThumbnailPath ||
                file.fileManager?.filePath
              "
              class="w-full h-full"
              fit="aspectFill"
            />
            <view
              v-if="index === 3 && extraFilesImageCount > 0"
              class="absolute top-0 bg-black/50 left-0 w-full h-full rounded-lg flex flex-row items-center justify-center z-11"
            >
              <text class="text-white text-xl font-bold">
                +{{ extraFilesImageCount }}
              </text>
            </view>
          </view>
        </view>

        <view
          v-if="hasFiles"
          class="flex flex-col gap-2"
          :style="{ width: 'auto' }"
        >
          <template v-for="(f, index) in getFilesItems" :key="index">
            <BaseItem
              class="rounded-md overflow-hidden"
              button
              :separator="false"
              :title-bold="false"
              :title-lines="2"
              @tap="onFileTap(f, index)"
            >
              <view class="h-m-[50px] overflow-hidden text-ellipsis">
                <text class="app-text" :text-maxline="2">
                  {{ f.fileManager?.fileName }}
                </text>
              </view>
              <template #start>
                <BaseIcon :name="File" />
              </template>
            </BaseItem>
          </template>
        </view>

        <text
          class="text-xs mt-1"
          :class="isMine ? 'text-zinc-500' : 'text-muted'"
          >{{ formattedTime }}</text
        >
      </view>

      <view
        class="flex flex-row items-center mt-1"
        :class="isMine ? 'justify-end' : 'justify-between'"
      >
        <text class="text-xs text-muted">{{ statusText }}</text>

        <view
          v-if="!isMine && hasFilesImage"
          class="flex flex-row items-center active:opacity-70 ml-4"
          @tap="onSaveAll"
        >
          <BaseIcon :name="Download" :size="16" class="mr-2" color="#2b7fff" />
          <text class="text-xs font-semibold text-primary">Save all</text>
        </view>
      </view>
    </view>

    <view
      v-if="!isMine && !isMutedMessage"
      class="flex flex-row items-center gap-1 ml-1 self-end mb-6"
    >
      <view class="p-1 active:opacity-70 rounded-full" @tap="onOptionsTap">
        <BaseIcon :name="EllipsisVertical" :size="18" color="#57534e" />
      </view>
      <view class="p-1 active:opacity-70 rounded-full" @tap="onEmojiTap">
        <BaseIcon :name="Heart" :size="18" color="#57534e" />
      </view>
    </view>
    <BaseAvatar
      v-if="showSendAvatar && isMine"
      :src="avatarSrc"
      :fallback="item.id + ''"
      class="w-8 h-8 rounded-full mr-3 shrink-0"
    />
  </view>
</template>
