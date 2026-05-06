<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/appUtil';
import { useTheme } from '@/composables/useTheme';

const { isDark } = useTheme();

const alertVariants = cva(
  'relative flex flex-row w-full rounded-lg border p-4 items-start gap-3',
  {
    variants: {
      variant: {
        default: 'bg-card text-primary border-border',
        destructive: 'text-destructive border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type AlertProps = VariantProps<typeof alertVariants>;

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    variant?: AlertProps['variant'];
    class?: any;
  }>(),
  {
    variant: 'default',
  },
);
</script>

<template>
  <view :class="cn(alertVariants({ variant }), props.class)">
    <view v-if="$slots.icon" class="mt-0.5 shrink-0 flex-none">
      <slot name="icon" />
    </view>

    <view class="flex flex-col flex-1 shrink-0 gap-1">
      <text
        v-if="props.title"
        :class="
          cn(
            'text-base font-medium leading-none tracking-tight',
            variant === 'destructive' ? 'text-destructive' : '',
          )
        "
      >
        {{ props.title }}
      </text>

      <text
        v-if="props.description"
        :class="
          cn(
            'text-sm leading-tight',
            variant === 'destructive' ? 'text-destructive' : 'text-muted',
          )
        "
      >
        {{ props.description }}
      </text>

      <!-- 🌟 Default Slot เผื่อกรณีอยากแทรก Component อื่นๆ เข้าไปข้างในแทนข้อความ -->
      <slot v-if="!props.title && !props.description" />
    </view>
  </view>
</template>
