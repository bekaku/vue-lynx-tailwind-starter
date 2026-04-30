<script setup lang="ts">
import IconLucide from '@/components/IconLucide.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import Item from '@/components/ui/Item.vue';
import ToolBar from '@/components/ui/ToolBar.vue';
import { useBase } from '@/composables/useBase';
import { useScrollRestore } from '@/composables/useScrollRestore';
import { useTheme } from '@/composables/useTheme';
import type { LabelValue } from '@/types/common';
import { ref, useTemplateRef } from 'vue-lynx';
const { scrollTop, onScroll } = useScrollRestore();
const { isDark } = useTheme();
const { platform } = useBase();
const themeToggleRef = useTemplateRef<any>('themeToggleRef');
const menuItems = ref<LabelValue<any>[]>([
  { label: 'Tailwind CSS', value: '/tailwind' },
  { label: 'About', value: '/about' },
  { label: 'Button', value: '/components/button' },
  { label: 'Card', value: '/components/card' },
  { label: 'Card', value: '/components/card' },
  { label: 'Event modifier', value: '/event-modifier' },
  { label: 'Grid', value: '/grid' },
  { label: 'Icons', value: '/icons' },
  { label: 'List Item', value: '/components/list-item' },
  { label: 'Native LocalStorage', value: '/native-local-storage' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Users', value: '/user-list' },
  { label: 'Stores', value: '/store' },
  { label: 'Tabs Route', value: '/tabs-route' },
  { label: 'Tabs Keepalive', value: '/tabs-keepalive' },
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
      <view class="input-card-url">
        <text class="bold-text">Card URL</text>
        <explorer-input
          id="input-id"
          class="input-box"
          @input="handleInput"
          :value="inputValue"
          placeholder="Enter Card URL"
        />
        <view class="connect-button">
          <text class="button-text">Go</text>
        </view>
      </view>

      <Card class="w-full">
        <CardHeader>
          <CardTitle>Vue Lynx</CardTitle>
          <text class="text-muted text-sm">
            Vue Lynx Starter Template By Chanavee platform: {{ platform }}
          </text>
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
              <IconLucide :size="24" icon="sunMoon" />
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
              <!-- <text class="text-zinc-400 text-xs">❯</text> -->
              <IconLucide :size="14" icon="chevronRight" />
            </view>
          </template>
        </Item>
      </Card>
    </scroll-view>
  </view>
</template>
