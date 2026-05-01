<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
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
  (e: 'tab'): void;
}>();

const { isDark } = useTheme();
</script>

<template>
  <view
    :class="
      cn(
        'flex flex-col items-center justify-center flex-1 h-full gap-1 active:opacity-70',
        props.class,
      )
    "
    @tap="emit('tab')"
  >
    <slot name="icon" />
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
