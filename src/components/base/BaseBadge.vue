<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { cn } from '@/utils/appUtil';
import { cva, type VariantProps } from 'class-variance-authority';
const { isNative } = useDevice();
const badgeVariants = cva('flex flex-row items-center justify-center border', {
  variants: {
    variant: {
      default: 'border-transparent bg-primary',
      secondary: 'border-transparent bg-secondary',
      destructive: 'border-transparent bg-destructive',
      outline: 'border-border bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const textVariants = cva('text-xs leading-none', {
  variants: {
    variant: {
      default: 'text-white',
      secondary: 'text-secondary-foreground',
      destructive: 'text-white',
      outline: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type BadgeProps = VariantProps<typeof badgeVariants>;

const props = withDefaults(
  defineProps<{
    variant?: BadgeProps['variant'];
    class?: any;
    textClass?: any;
    label?: string;
    round?: boolean;
  }>(),
  {
    variant: 'default',
    round: false,
  },
);
</script>

<template>
  <view
    :class="
      cn(
        badgeVariants({ variant }),
        'px-[5px] rounded-full',
        isNative ? 'py-[-14px]' : 'py-[3px]',
        props.class,
      )
    "
  >
    <view :class="cn(textVariants({ variant }))">
      <slot>
        <text :class="props.textClass" class="app-text text-xs">{{
          props.label
        }}</text>
      </slot>
    </view>
  </view>
</template>
