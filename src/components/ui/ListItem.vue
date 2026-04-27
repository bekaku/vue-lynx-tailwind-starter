<script setup lang="ts">
import { useBase } from '../../composables/useBase';
import { cn } from '../../utils/appUtil';

interface Props {
  title: string;
  description?: string;
  button?: boolean;
  separator?: boolean;
  disabled?: boolean;
  class?: string;
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  button: false,
  disabled: false,
  separator: true,
});
const { onNavigateTo } = useBase();
const emit = defineEmits<{
  (e: 'tab', payload: any): void;
}>();

const handleTap = (e: any) => {
  if (props.button && !props.disabled) {
    if (props.to) {
      onNavigateTo(props.to);
    }
    emit('tab', e);
  }
};
</script>

<template>
  <view
    :class="
      cn(
        'flex flex-row items-center justify-between py-3 px-4 bg-card',
        props.button && !props.disabled ? 'active:bg-ripple' : '',
        props.disabled ? 'opacity-50' : '',
        props.separator ? 'border-b border-border' : '',
        props.class,
      )
    "
    @tap="handleTap"
  >
    <view class="flex flex-row items-center gap-1 flex-1">
      <slot name="start" />
      <view class="flex flex-col justify-center">
        <text class="text-sm font-medium">
          {{ title }}
        </text>

        <text v-if="description" class="text-xs text-muted mt-0.5">
          {{ description }}
        </text>
      </view>
    </view>

    <view class="flex flex-row items-center justify-end pl-2">
      <slot name="end" />
    </view>
  </view>
</template>
