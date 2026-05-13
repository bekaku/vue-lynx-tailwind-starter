<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue';
import BasePopover from '@/components/base/BasePopover.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import { useTheme } from '@/composables/useTheme';
import { biEmojiSmile } from '@quasar/extras/bootstrap-icons';
import { Camera, Image, Mic, Plus, Send } from 'lucide-static';
import { ref, useTemplateRef } from 'vue';
import BaseItem from '../base/BaseItem.vue';
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    class?: string;
    readonly?: boolean;
  }>(),
  {
    disabled: undefined,
    readonly: undefined,
  },
);
const { isDark } = useTheme();
const inputText = ref('');
const emit = defineEmits<{
  'on-send': [value: string];
}>();

const chatInputRef =
  useTemplateRef<InstanceType<typeof BaseTextarea>>('chatInputRef');
const onSendMsg = async () => {
  const msg = inputText.value.trim();
  if (!msg) return;
  emit('on-send', msg);
  onClearInput();
};
const onClearInput = () => {
  inputText.value = '';
  console.log('ChatInput.vue > onClearInput');
  if (chatInputRef.value) {
    chatInputRef.value.onSetValue('');
  }
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
  <view
    class="w-full bg-card px-2 py-3 flex flex-row items-center border-t border-border"
  >
    <view class="p-2 mr-1 active:opacity-70 rounded-full">
      <BasePopover position="top-left">
        <template #trigger="{ isOpen }">
          <BaseIcon :name="Plus" :size="24" color="#2b7fff" :auto-dark="false"/>
        </template>

        <template #default="{ close }">
          <view class="flex flex-col w-full">
            <BaseItem
              :separator="false"
              :title-bold="false"
              title="Select photo"
              button
              @tap="
                () => {
                  close();
                }
              "
            >
              <template #start>
                <BaseIcon :name="Image" />
              </template>
            </BaseItem>
            <BaseItem
              :separator="false"
              :title-bold="false"
              title="Take photo"
              button
              @tap="
                () => {
                  close();
                }
              "
            >
              <template #start>
                <BaseIcon :name="Camera" />
              </template>
            </BaseItem>
          </view>
        </template>
      </BasePopover>
    </view>

    <view
      class="flex-1 rounded-xl px-3 py-2 flex flex-row items-center min-h-[40px]"
      :class="!isDark ? 'bg-zinc-100' : 'bg-zinc-700'"
    >
      <BaseTextarea
        ref="chatInputRef"
        textarea-class="flex-1 bg-transparent py-0 text-base max-h-[120px]"
        placeholder="Type a message..."
        auto-grow
        dense
        transparent
        :border="false"
        :maxlength="1000"
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
          :auto-dark="false"
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
        :auto-dark="false"
        style="margin-left: 2px"
      />
    </view>

    <view
      v-else
      class="p-2 ml-1 active:opacity-70 rounded-full"
      @tap="onMicTap"
    >
      <BaseIcon :name="Mic" :size="24" color="#2b7fff" :auto-dark="false" />
    </view>
  </view>
</template>
