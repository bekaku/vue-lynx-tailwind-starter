<script setup lang="ts">
import { ref, onActivated, onDeactivated } from 'vue'
defineOptions({
  name: 'Counter'
})

const props = defineProps<{ label: string }>()

const count = ref(0)
const status = ref('mounted')

onActivated(() => {
  status.value = 'activated'
})

onDeactivated(() => {
  status.value = 'deactivated'
})
</script>

<template>
  <view :style="{  padding: '12px', borderRadius: '4px' }" class="border border-border">
    <text :style="{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }">{{ props.label }}</text>
    <text :style="{ fontSize: '14px', marginBottom: '4px' }">Count: {{ count }}</text>
    <text :style="{ fontSize: '12px',  marginBottom: '8px' }">Status: {{ status }}</text>
    <view @tap="count++"
          :style="{ backgroundColor: '#4a90d9', padding: '8px', borderRadius: '4px' }">
      <text :style="{  fontSize: '13px' }">Increment</text>
    </view>
  </view>
</template>