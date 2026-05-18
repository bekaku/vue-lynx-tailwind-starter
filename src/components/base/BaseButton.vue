<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/appUtil';
import { useTheme } from '@/composables/useTheme';
const { isDark } = useTheme();
const buttonVariants = cva(
  'flex flex-row items-center justify-center transition-all',
  {
    variants: {
      variant: {
        dark: !isDark.value ? 'bg-zinc-900' : 'bg-zinc-800',
        default: 'bg-primary',
        destructive: 'bg-red-500',
        outline: `border bg-transparent ${!isDark.value ? 'border-zinc-200  active:bg-zinc-100' : 'border-zinc-500 active:bg-zinc-700'}`,
        secondary: 'bg-zinc-100 active:bg-zinc-200',
        ghost: !isDark.value
          ? 'bg-transparent active:bg-zinc-100'
          : 'bg-transparent active:bg-zinc-800',
        link: 'bg-transparent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const textVariants = cva('font-medium text-center', {
  variants: {
    variant: {
      default: 'text-zinc-50',
      dark: 'text-zinc-50',
      destructive: 'text-zinc-50',
      outline: !isDark.value ? 'text-zinc-900' : 'text-zinc-100',
      secondary: 'text-zinc-900',
      ghost: !isDark.value ? 'text-zinc-900' : 'text-zinc-100',
      link: !isDark.value
        ? 'text-zinc-900 underline'
        : 'text-zinc-100 underline',
    },
    size: {
      default: 'text-md',
      sm: 'text-xs',
      lg: 'text-base',
      icon: 'text-sm', // ปกติ Icon จะไม่ใช้ Text size นี้ แต่อาจมีไว้เผื่อ fallback
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: string;
  textClass?: string;
  label?: string;
  disabled?: boolean;
  rounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
  rounded: false,
});

const emit = defineEmits<{
  (e: 'tap', payload: any): void;
  (e: 'catchtap', payload: any): void;
}>();

const handleTap = (e: any) => {
  if (!props.disabled) {
    emit('tap', e);
  }
};
const handleCatchTap = (e: any) => {
  if (!props.disabled) {
    // emit('catchtap', e);
    emit('tap', e);
  }
};
</script>

<template>
  <view
    :class="cn(!rounded ? 'rounded-md' : 'rounded-full', buttonVariants({ variant, size }), 
    props.disabled ? 'opacity-50 pointer-events-none' : 'active:opacity-80',
    props.class)"
    @tap="handleTap"
  >
  <!-- :catchtap="handleCatchTap" -->
    <slot v-if="$slots.start" name="start" />
    <slot>
      <text
        v-if="label"
        :class="cn(textVariants({ variant, size }), props.textClass)"
      >
        {{ label }}
      </text>
    </slot>
    <slot v-if="$slots.end" name="end" />
  </view>
</template>
