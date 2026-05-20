<script setup lang="ts">
import type { LabelValue } from '@/types/common';
import BaseIcon from '@/components/base/BaseIcon.vue';
import { useTheme } from '@/composables/useTheme';
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    class?: string;
    items: LabelValue<any>[];
  }>(),
  {},
);
const { isDark } = useTheme();
const emit = defineEmits<{
  'update:modelValue': [value: any];
}>();

const handleTap = (e: any, val: any) => {
  emit('update:modelValue', val);
};
</script>

<template>
  <view class="w-full flex flex-row justify-start items-center py-4">
    <view
      class="flex flex-row holder rounded-xl p-1"
      :class="[!isDark ? 'bg-zinc-100' : 'bg-zinc-700']"
    >
      <view
        v-for="(item, index) in props.items"
        :key="index"
        @tap="(e: any) => handleTap(e, item.value)"
        class="flex flex-row px-4 py-2 gap-1 rounded-lg transition-all duration-200 shadow-sm"
        :class="[
          item.value === modelValue
            ? !isDark
              ? 'bg-white'
              : 'bg-zinc-800'
            : 'bg-transparent',
        ]"
      >
        <BaseIcon v-if="item.icon" v-bind="item.icon" />
        <text
          class="text-sm font-semibold"
          :class="item.value === modelValue ? 'app-text' : 'text-muted'"
        >
          {{ item.label }}
        </text>
      </view>
    </view>
  </view>
</template>

<style scoped>
/* 💡 ทริคเสริมสำหรับ Lynx: 
   ถ้า shadow-sm ของ Tailwind บน Android/iOS ไม่ชัด 
   ให้ใช้สไตล์แบบนี้แทนครับ */
.shadow-sm {
  /* สำหรับ iOS */
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-radius: 4px;
  shadow-opacity: 0.1;
  /* สำหรับ Android */
  elevation: 2;
}
</style>
