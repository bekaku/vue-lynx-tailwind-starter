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
  titleBold?: boolean;
  titleLines?: number;
  class?: string;
  titleClass?: string;
  to?: string;
  id?: string;
  index?: number;
  top?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  button: false,
  disabled: false,
  separator: true,
  titleBold: true,
  whitespaceNowrap: false,
  titleLines: -1,
});
const { onNavigateTo } = useBase();
const { isAndroid } = useDevice();
const emit = defineEmits<{
  (e: 'tap', payload: any): void;
  (e: 'longpress', payload: any): void;
}>();

const handleTap = (e: any) => {
  if (!props.disabled) {
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
        'flex flex-row items-center justify-between  pl-[14px] pr-[14px] bg-card',
        props.button && !props.disabled ? 'active:bg-ripple' : '',
        props.disabled ? 'opacity-50' : '',
        props.separator ? 'border-b border-border' : '',
        !isAndroid ? 'py-2' : 'py-2',
        !props.top ? 'items-center' : 'items-start',
        props.class,
      )
    "
    :id="id"
    @longpress="handleLongpress"
    @tap="handleTap"
  >
    <view
      class="flex flex-row flex-1 gap-1.5"
      :class="cn(!props.top ? 'items-center' : 'items-start')"
    >
      <slot v-if="$slots.start" name="start" />

      <view class="flex flex-col flex-1 justify-start">
        <text
          v-if="title"
          :class="
            cn(
              whitespaceNowrap ? 'whitespace-nowrap' : '',
              titleBold ? 'font-medium' : '',
              props.titleClass,
            )
          "
          :text-maxline="titleLines"
        >
          {{ title }}
        </text>

        <text
          v-if="description"
          class="text-sm text-muted mt-0.5"
          :class="{ 'whitespace-nowrap': whitespaceNowrap }"
        >
          {{ description }}
        </text>
        <view v-if="$slots.default" :class="isAndroid ? 'py-[-14px]' : ''">
          <slot />
        </view>
      </view>
    </view>

    <view
      v-if="$slots.end"
      class="flex flex-row justify-end"
      :class="cn(!props.top ? 'items-center' : 'items-start')"
    >
      <slot name="end" />
    </view>
  </view>
</template>
