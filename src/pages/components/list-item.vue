<script setup lang="ts">
import BaseItem from '@/components/base/BaseItem.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import type { LabelValue } from '@/types/common';
import { ref } from 'vue-lynx';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseTextHeader from '@/components/base/BaseTextHeader.vue';

const menuItems = ref<LabelValue<any>[]>([
  { label: 'Tailwind CSS', value: '/tailwind' },
  { label: 'About', value: '/about' },
  { label: 'NativeLocalStorageModule', value: '/native-local-storage' },
  { label: 'Users', value: '/user-list' },
  { label: 'Stores', value: '/store' },
  { label: 'Tabs Route', value: '/tabs-route' },
  { label: 'Tabs Keepalive', value: '/tabs-keepalive' },
  { label: 'List BaseItem', value: '/components/list-item' },
  { label: 'BaseCard', value: '/components/card' },
  { label: 'BaseButton', value: '/components/button' },
  { label: 'BaseCard', value: '/components/card' },
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
    <BaseToolBar class="mb-2" title="List BaseItem"> </BaseToolBar>

    <BaseCard>
      <BaseItem title="Profile" button @tab="handleItemClick('Profile')" />
      <BaseItem
        title="Notifications"
        description="Manage your push notifications"
        button
        @tab="handleItemClick('Notifications')"
      />

      <BaseItem
        title="Dark Mode"
        description="BaseToggle dark mode theme"
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
      </BaseItem>
    </BaseCard>
    <BaseTextHeader class="ml-5">
     <text class="text-muted">List BaseItem</text> 
    </BaseTextHeader>

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
        <BaseItem title="Dark" description="Swith theme Dark|Light">
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
        </BaseItem>
      </list-item>
      <list-item
        v-for="(item, index) in menuItems"
        :key="item.value"
        :item-key="String(index + 1)"
      >
        <BaseItem :title="item.label || ''" button :to="item.value">
          <template #end>
            <view class="w-8 h-8 flex items-center justify-center">
              <text class="text-zinc-400 text-xs">❯</text>
            </view>
          </template>
        </BaseItem>
      </list-item>
    </list>
  </view>
</template>
