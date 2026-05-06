<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { useTheme } from '@/composables/useTheme';
import { defaultAndroidPaddingFix } from '@/libs/constant';
import { cn } from '@/utils/appUtil';

interface Props {
  label: string;
  active?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
});

const emit = defineEmits<{
  (e: 'tap'): void;
}>();

const { isDark } = useTheme();
const { isAndroid } = useBase();
</script>

<template>
  <view
    :class="
      cn(
        'flex flex-col items-center justify-center flex-1 h-full gap-1 active:opacity-70',
        props.class,
      )
    "
    @tap="emit('tap')"
  >
    <view :class="isAndroid ? 'android-padding-fix' : ''">
      <slot name="icon" />
    </view>

    <text
      :class="
        cn(
          'text-[10px] font-medium transition-colors',
          active ? 'text-primary' : !isDark ? 'text-zinc-500' : 'text-zinc-400',
        )
      "
    >
      {{ label }}
    </text>
  </view>
</template>
