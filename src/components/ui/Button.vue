<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/appUtil';
import { useTheme } from '@/composables/useTheme';
const { isDark } = useTheme();
// 1. Variants สำหรับ <view> (Container)
const buttonVariants = cva(
  'flex flex-row items-center justify-center rounded-md transition-all disabled:opacity-50',
  {
    variants: {
      variant: {
        default: !isDark.value
          ? 'bg-zinc-900 active:bg-zinc-800'
          : 'bg-zinc-800 active:bg-zinc-700',
        primary: 'bg-primary active:bg-primary-ripple',
        destructive: 'bg-red-500 active:bg-red-600',
        outline: 'border border-zinc-200 bg-transparent active:bg-zinc-100',
        secondary: 'bg-zinc-100 active:bg-zinc-200',
        ghost: !isDark.value ?'bg-transparent active:bg-zinc-100' :'bg-transparent active:bg-zinc-800',
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

// 2. Variants สำหรับ <text> (Typography) - แก้ปัญหา Native ไม่ Inherit สี
const textVariants = cva('font-medium text-center', {
  variants: {
    variant: {
      default: 'text-zinc-50',
      primary: 'text-zinc-50',
      destructive: 'text-zinc-50',
      outline: !isDark.value ? 'text-zinc-900' : 'text-zinc-100',
      secondary: 'text-zinc-900',
      ghost: !isDark.value ? 'text-zinc-900' : 'text-zinc-100',
      link: !isDark.value ? 'text-zinc-900 underline' : 'text-zinc-100 underline',
    },
    size: {
      default: 'text-sm',
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

// ดึง Type ออกมาเพื่อใช้กำหนด Props
type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: string;
  textClass?: string;
  label?: string; // แนะนำให้รับ label เป็น prop สำหรับกรณีใช้งานทั่วไป
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'tab', payload: any): void;
}>();

// Lynx นิยมใช้ @tap (หรือ @bindtap) สำหรับเหตุการณ์การสัมผัส
const handleTap = (e: any) => {
  if (!props.disabled) {
    emit('tab', e);
  }
};
</script>

<template>
  <view
    :class="cn(buttonVariants({ variant, size }), props.class)"
    @tap="handleTap"
  >
    <slot>
      <text
        v-if="label"
        :class="cn(textVariants({ variant, size }), props.textClass)"
      >
        {{ label }}
      </text>
    </slot>
  </view>
</template>
