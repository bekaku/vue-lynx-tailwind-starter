<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { useBase } from '../../composables/useBase';
import { cn } from '../../utils/appUtil';

interface Props {
  title?: string;
  description?: string;
  button?: boolean;
  separator?: boolean;
  disabled?: boolean;
  whitespaceNowrap?: boolean;
  titleMedium?: boolean;
  class?: string;
  to?: string;
  id?: string;
  index?: number;
}

const props = withDefaults(defineProps<Props>(), {
  button: false,
  disabled: false,
  separator: true,
  titleMedium: true,
  whitespaceNowrap: false,
});
const { onNavigateTo } = useBase();
const { isAndroid } = useDevice();
const emit = defineEmits<{
  (e: 'tap', payload: any): void;
  (e: 'longpress', payload: any): void;
}>();

const handleTap = (e: any) => {
  if (props.button && !props.disabled) {
    if (props.to) {
      onNavigateTo(props.to);
    }
    emit('tap', e);
  }
};
const handleLongpress = (e: any) => {
  emit('longpress', e);
};
</script>

<template>
  <view
    :class="
      cn(
        'flex flex-row items-center justify-between py-2 px-[16px] bg-card',
        props.button && !props.disabled ? 'active:bg-ripple' : '',
        props.disabled ? 'opacity-50' : '',
        props.separator ? 'border-b border-border' : '',
        props.class,
      )
    "
    :id="id"
    @longpress="handleLongpress"
    @tap="handleTap"
  >
    <view class="flex flex-row items-center flex-1 gap-1">
      <view v-if="$slots.start">
        <slot name="start" />
      </view>

      <view class="flex flex-col flex-1 justify-start">
        <text
          v-if="title"
          class="text-sm"
          :class="{
            'whitespace-nowrap': whitespaceNowrap,
            'font-medium': titleMedium,
          }"
        >
          {{ title }}
        </text>

        <text
          v-if="description"
          class="text-xs text-muted mt-0.5"
          :class="{ 'whitespace-nowrap': whitespaceNowrap }"
        >
          {{ description }}
        </text>
        <view v-if="$slots.default" :class="isAndroid ? 'py-[-14px]' : ''">
          <slot />
        </view>
      </view>
    </view>

    <view v-if="$slots.end" class="flex flex-row items-center justify-end pl-2">
      <slot name="end" />
    </view>
  </view>
</template>
