<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { useSafeArea } from '@/composables/useSafeArea';
import type { ToolbarProps } from '@/types/props';
import { cn } from '@/utils/appUtil';
import BaseBackButton from './BaseBackButton.vue';
import BaseTextEllipsis from './BaseTextEllipsis.vue';
import { useDevice } from '@/composables/useDevice';
const { safeAreaTop, safeAreaBottom } = useSafeArea();
const { onNavigateTo } = useBase();
const { isAndroid } = useDevice();
const props = withDefaults(defineProps<ToolbarProps>(), {
  showBackButton: true,
  top: false,
  titleLeft: false,
});

const onTab = () => {
  onNavigateTo('/');
};
</script>

<template>
  <view
    :class="
      cn(
        'flex flex-row  justify-between w-full min-h-14 px-2 pb-[8px]  border-b border-border bg-card',
        !props.top ? 'items-center' : 'items-start',
        props.class,
      )
    "
    :style="{
      paddingTop:
        safeAreaTop && Number(safeAreaTop) > 0 ? safeAreaTop + 'px' : '8px',
    }"
  >
    <view
      class="flex flex-row relative h-max items-end justify-start"
    >
      <slot name="start">
        <BaseBackButton v-if="showBackButton" v-bind="props.backButton" />
      </slot>
    </view>

    <view class="flex flex-1 flex-row items-center " :class="!props.titleLeft ? 'justify-center' : 'justify-start'">
      <slot>
        <view>
          <BaseTextEllipsis
            v-if="props.title"
            :class="isAndroid ? 'py-[-14px]' : ''"
            text-class="font-semibold text-lg"
            :rows="1"
            :content="props.title"
          />
        </view>

        <!-- <text v-if="props.title" class="font-semibold text-lg">{{
          props.title
        }}</text> -->
      </slot>
    </view>

    <view
      v-if="$slots.end"
      class="flex flex-row items-center justify-end min-w-[60px]"
    >
      <slot name="end" />
    </view>
  </view>
</template>
