<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import { watch, onUnmounted } from 'vue';
import BaseTransitionWrapper from './BaseTransitionWrapper.vue';

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    message: string;
    duration?: number;
    position?: 'top' | 'middle' | 'bottom';
    actionText?: string;
  }>(),
  {
    duration: 3000,
    position: 'bottom',
    actionText: '',
  },
);

const emit = defineEmits<{
  'update:isOpen': [value: boolean];
  'on-close': [];
}>();
const { isDark } = useTheme();
let timeoutId: any = null;

const closeToast = () => {
  emit('update:isOpen', false);
  emit('on-close');
};

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      if (timeoutId) clearTimeout(timeoutId);

      if (props.duration > 0) {
        timeoutId = setTimeout(() => {
          closeToast();
        }, props.duration);
      }
    } else {
      if (timeoutId) clearTimeout(timeoutId);
    }
  },
);

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId);
});
</script>
<template>
  <view
    class="absolute left-0 w-full flex flex-row justify-center px-4"
    :class="{
      'top-12 bottom-auto': position === 'top',
      'top-1/2 bottom-auto -translate-y-1/2': position === 'middle',
      'bottom-12 top-auto': position === 'bottom',
      'z-50': isOpen,
      '-z-10': !isOpen,
    }"
    :style="{ pointerEvents: isOpen ? 'auto' : 'none' }"
  >
    <BaseTransitionWrapper name="slide-up">
      <view
        v-if="isOpen"
        class="rounded-xl px-4 py-4 flex flex-row items-center justify-between shadow-sm max-w-full w-full"
        :class="{
          'opacity-100 translate-y-0': isOpen,
          'opacity-0': !isOpen,
          '-translate-y-10': position === 'top' && !isOpen,
          'translate-y-10': position === 'bottom' && !isOpen,
          'scale-90': position === 'middle' && !isOpen,
          'bg-zinc-100': !isDark,
          'bg-zinc-700': isDark,
        }"
      >
         <!-- 'bg-zinc-100': !isDark,
          'bg-zinc-700': isDark, -->
        <text
          class="flex-1"
          :class="[!isDark ? 'text-zinc-800' : 'text-zinc-50']"
          >{{ message }}</text
        >

        <view
          v-if="actionText"
          @tap="closeToast"
          class="ml-4 pl-4 border-l border-border"
        >
          <text class="text-primary text-sm font-bold active:opacity-70">{{
            actionText
          }}</text>
        </view>
      </view>
    </BaseTransitionWrapper>
  </view>
</template>
