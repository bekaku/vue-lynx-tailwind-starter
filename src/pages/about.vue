<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="About page" />

    <BaseCard>
      <BaseCardContent>
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
      </BaseCardContent>
    </BaseCard>
  </view>
</template>
<style scoped></style>
