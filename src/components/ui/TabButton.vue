<script setup lang="ts">
import { cn } from '@/utils/appUtil'

interface Props {
  label: string
  active?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
})

const emit = defineEmits<{
  (e: 'tab'): void
}>()
</script>

<template>
  <view
    :class="cn('flex flex-col items-center justify-center flex-1 h-full gap-1 active:opacity-70', props.class)"
    @tap="emit('tab')"
  >
    <!-- โซนสำหรับใส่ Icon -->
    <slot name="icon" />

    <!-- ชื่อ Tab -->
    <!-- ใช้ตัวแปรสีตรงๆ (เช่น text-primary) เพื่อเลี่ยงปัญหา CSS Selector แบบข้อที่แล้ว -->
    <text
      :class="cn(
        'text-[10px] font-medium transition-colors',
        active ? 'text-primary' : 'text-zinc-500'
      )"
    >
      {{ label }}
    </text>
  </view>
</template>