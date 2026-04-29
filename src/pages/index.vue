<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import Item from '@/components/ui/Item.vue';
import Page from '@/components/ui/Page.vue';
import ToolBar from '@/components/ui/ToolBar.vue';
import { useTheme } from '@/composables/useTheme';
import type { LabelValue } from '@/types/common';
import { useScrollRestore } from '@/composables/useScrollRestore';
import { ref, useTemplateRef } from 'vue-lynx';
import iconHouse from '@/assets/icons/lucide/house.png';
import { useBase } from '@/composables/useBase';
import AppImage from '@/components/ui/AppImage.vue';
const { scrollTop, onScroll } = useScrollRestore();
const { isDark } = useTheme();
const { platform } = useBase();
const themeToggleRef = useTemplateRef<any>('themeToggleRef');
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
  { label: 'Grid', value: '/grid' },
  { label: 'event-modifier', value: '/event-modifier' },
  { label: 'Notfound', value: '/components/not-foudn' },
]);

const inputValue = ref('');
const handleInput = (e: any) => {
  // const currentValue = e.detail.value.trim();
  console.log('handleInput', e);
};
const handleTheme = (e: any) => {
  console.log('index.vue > handleTheme', e);
  if (themeToggleRef.value) {
    themeToggleRef.value.onToggleTheme(!isDark.value);
  }
};

</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <ToolBar :show-back-button="false" title="Vue Lynx" />
    <scroll-view
      :class="['flex-1 w-full']"
      scroll-orientation="vertical"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Vue Lynx</CardTitle>
          <text class="text-muted text-sm">
            Vue Lynx Starter Template By Chanavee platform: {{ platform }}
          </text>

          <view class="w-full flex-1 items-center justify-center bg-background">
            <!-- <explorer-input :input="handleInput" :value="inputValue" /> -->
            <AppImage :src="iconHouse" class="w-8 h-8 rounded-lg"></AppImage>
            <!-- <image :src="iconHouse" class="w-8 h-8" /> -->
          </view>
        </CardHeader>

        <Item
          title="Dark"
          description="Swith theme Dark|Light"
          button
          @tab="handleTheme"
        >
          <template #start>
            <view
              class="w-8 h-8 rounded-full flex items-center justify-center"
              :class="[!isDark ? 'bg-zinc-100' : 'bg-zinc-700']"
            >
              <text class="text-zinc-400 text-xs">🌙</text>
            </view>
          </template>
          <template #end>
            <ThemeToggle disabled ref="themeToggleRef" />
          </template>
        </Item>
        <Item
          v-for="(item, index) in menuItems"
          :key="item.value"
          :title="item.label || ''"
          button
          :to="item.value"
        >
          <template #end>
            <view class="w-8 h-8 flex items-center justify-center">
              <text class="text-zinc-400 text-xs">❯</text>
            </view>
          </template>
        </Item>
      </Card>
    </scroll-view>
  </view>
</template>
