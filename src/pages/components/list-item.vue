<script setup lang="ts">
import Item from '@/components/ui/Item.vue';
import ToolBar from '@/components/ui/ToolBar.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import type { LabelValue } from '@/types/common';
import { ref } from 'vue-lynx';
import Card from '@/components/ui/Card.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import TextHeader from '@/components/ui/TextHeader.vue';

const menuItems = ref<LabelValue<any>[]>([
  { label: 'Tailwind CSS', value: '/tailwind' },
  { label: 'About', value: '/about' },
  { label: 'NativeLocalStorageModule', value: '/native-local-storage' },
  { label: 'Users', value: '/user-list' },
  { label: 'Stores', value: '/store' },
  { label: 'Tabs Route', value: '/tabs-route' },
  { label: 'Tabs Keepalive', value: '/tabs-keepalive' },
  { label: 'List Item', value: '/components/list-item' },
  { label: 'Card', value: '/components/card' },
  { label: 'Button', value: '/components/button' },
  { label: 'Card', value: '/components/card' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
]);
const handleItemClick = (item: string) => {
  console.log(`Tapped on: ${item}`);
};
</script>

<template>
  <view class="w-full h-full bg-background">
    <ToolBar class="mb-2" title="List Item"> </ToolBar>

    <Card>
      <Item title="Profile" button @tab="handleItemClick('Profile')" />
      <Item
        title="Notifications"
        description="Manage your push notifications"
        button
        @tab="handleItemClick('Notifications')"
      />

      <Item
        title="Dark Mode"
        description="Toggle dark mode theme"
        button
        class="border-b-0"
      >
        <template #start>
          <view
            class="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center"
          >
            <text class="text-zinc-900 text-xs">🌙</text>
          </view>
        </template>

        <template #end>
          <text class="text-zinc-400 text-xs font-medium">Slot end</text>
        </template>
      </Item>
    </Card>
    <TextHeader class="ml-5">
     <text class="text-muted">List Item</text> 
    </TextHeader>

    <list
      scroll-orientation="vertical"
      list-type="single"
      :span-count="1"
      :style="{
        marginTop: '10px',
        paddingBottom: '100px',
        width: '100%',
        height: '100%',
      }"
    >
      <list-item :item-key="String(0)">
        <Item title="Dark" description="Swith theme Dark|Light">
          <template #start>
            <view
              class="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center"
            >
              <text class="text-zinc-400 text-xs">🌙</text>
            </view>
          </template>
          <template #end>
            <ThemeToggle />
          </template>
        </Item>
      </list-item>
      <list-item
        v-for="(item, index) in menuItems"
        :key="item.value"
        :item-key="String(index + 1)"
      >
        <Item :title="item.label || ''" button :to="item.value">
          <template #end>
            <view class="w-8 h-8 flex items-center justify-center">
              <text class="text-zinc-400 text-xs">❯</text>
            </view>
          </template>
        </Item>
      </list-item>
    </list>
  </view>
</template>
