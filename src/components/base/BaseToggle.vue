<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { isDark } = useTheme();

// const modelValue = defineModel<boolean>({ default: false });
const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    disabled?: boolean;
    id?: string;
  }>(),
  {
    modelValue: false,
  },
);
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  tab: [value: boolean, event: any];
}>();
const handleTap = (e: any) => {
  if (props.disabled) {
    return;
  }
  const newValue = !props.modelValue;
  emit('update:modelValue', newValue);
  emit('tab', newValue, e);
};
</script>

<template>
  <view
    :class="[
      'w-10 h-6 rounded-full p-0.5',
      modelValue ? `bg-primary` : !isDark ? 'bg-zinc-300' : 'bg-zinc-600',
    ]"
    :id="id"
    @tap="handleTap"
  >
    <view
      :class="['w-5 h-5 rounded-full bg-white', modelValue ? 'ml-4' : 'ml-0']"
    />
  </view>
</template>

<style scoped></style>
