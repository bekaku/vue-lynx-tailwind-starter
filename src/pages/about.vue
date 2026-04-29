<script setup lang="ts">
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Page from '@/components/ui/Page.vue';
import ToolBar from '@/components/ui/ToolBar.vue';
import { reactive } from 'vue-lynx';
import { useRoute } from 'vue-router';

const route = useRoute();

const active = reactive({
  outer: false,
  middle: false,
  inner: false,
});

// 2. ฟังก์ชัน flash จัดการ State ได้ตรงๆ ไม่ต้องสลับ Context (Main Thread <-> Background) ให้วุ่นวาย
const flash = (key: 'outer' | 'middle' | 'inner') => {
  active[key] = true;
  setTimeout(() => {
    active[key] = false;
  }, 200);
};

// 3. Event Handlers
const handleOuterTap = (e: any) => {
  // if (e.target !== e.currentTarget) return;
  console.log('outer', e);
  flash('outer');
};

const handleMiddleTap = (e: any) => {
  // if (e.target !== e.currentTarget) return;
  console.log('middle', e);
  flash('middle');
};

const handleInnerTap = (e: any) => {
  // event.stopPropagation()
  console.log('inner', e);
  flash('inner');
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <ToolBar title="About page" />

    <Card>
      <CardContent>
        <text
          :style="{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#111',
            marginBottom: '8px',
          }"
        >
          About
        </text>
        <text :style="{ fontSize: '14px', color: '#555', lineHeight: '20px' }">
          Vue Router works in Lynx by using createMemoryHistory() instead of
          createWebHistory(). This avoids any dependency on window.location or
          the History API.
        </text>
        <text :style="{ fontSize: '12px', color: '#999', marginTop: '12px' }">
          Current path: {{ route.fullPath }}
        </text>
      </CardContent>
    </Card>
  </view>
</template>
<style scoped></style>
