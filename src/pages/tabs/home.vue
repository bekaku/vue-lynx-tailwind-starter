<script setup lang="ts">
import { useRoute } from 'vue-router';
import Card from '@/components/ui/Card.vue';
import Page from '@/components/ui/Page.vue';
import ToolBar from '@/components/ui/ToolBar.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Button from '@/components/ui/Button.vue';
import { onMounted, ref } from 'vue-lynx';
const status = ref('mounted')
const route = useRoute();
const counter = ref<number>(0)
onMounted(()=>{
  console.log('tabs/home.vue > mounted')
})
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <ToolBar title="Tab home" />

    <Card>
      <CardContent>
        <text
          :style="{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '8px',
          }"
        >
          Home
        </text>
        <text :style="{ fontSize: '14px', color: '#555', lineHeight: '20px' }">
          Vue Router works in Lynx by using createMemoryHistory() instead of
          createWebHistory(). This avoids any dependency on window.location or
          the History API.
        </text>
        <text :style="{ fontSize: '12px', color: '#999', marginTop: '12px' }">
          Current path: {{ route.fullPath }}
        </text>

        <view class="p-4 flex flex-row gap-2">
          <text>{{ counter }}</text>
          <Button label="-" class="bg-red-500" @tab="counter--"/>
          <Button label="+" class="bg-green-500" @tab="counter++"/>
        </view>
      </CardContent>
    </Card>
  </view>
</template>
