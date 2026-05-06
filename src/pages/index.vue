<script setup lang="ts">
import IconLucide from '@/components/IconLucide.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseItem from '@/components/base/BaseItem.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useBase } from '@/composables/useBase';
import { useScrollRestore } from '@/composables/useScrollRestore';
import { useTheme } from '@/composables/useTheme';
import type { LabelValue } from '@/types/common';
import { onMounted, ref, useTemplateRef } from 'vue-lynx';
const { scrollTop, onScroll } = useScrollRestore();
const { isDark } = useTheme();
const { platform } = useBase();
const themeToggleRef = useTemplateRef<any>('themeToggleRef');
const menuItems = ref<LabelValue<any>[]>([
  { label: 'Action Sheet', value: '/action-sheet' },
  { label: 'Alert', value: '/alert' },
  { label: 'Badge', value: '/badge' },
  { label: 'Button', value: '/button' },
  { label: 'Card', value: '/card' },
  { label: 'Confirm dialog', value: '/confirm-dialog' },
  { label: 'Dialog', value: '/dialog' },
  { label: 'Event modifier', value: '/event-modifier' },
  { label: 'Grid', value: '/grid' },
  { label: 'Icons', value: '/icons' },
  { label: 'Image', value: '/image' },
  { label: 'Image picker', value: '/image-picker' },
  { label: 'Input', value: '/input' },
  { label: 'Keep alive', value: '/keepalive' },
  { label: 'List Item', value: '/list-item' },
  { label: 'Native LocalStorage', value: '/native-local-storage' },
  { label: 'Notfound', value: '/not-foudn' },
  { label: 'Users', value: '/user-list' },
  { label: 'Stores', value: '/store' },
  { label: 'Tailwind CSS', value: '/tailwind' },
  { label: 'Tabs Route', value: '/tabs-route' },
  { label: 'Tabs Keepalive', value: '/tabs-keepalive' },
]);

onMounted(() => {
  // const info = lynx.getSystemInfoSync();
});
const handleTheme = (e: any) => {
  console.log('index.vue > handleTheme', e);
  if (themeToggleRef.value) {
    themeToggleRef.value.onToggleTheme(!isDark.value);
  }
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar :show-back-button="false" title="Vue Lynx" />
    <scroll-view
      :class="['flex-1 w-full']"
      scroll-orientation="vertical"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <BaseCard class="w-full">
        <view class="flex flex-col p-[14px]">
          <text class="text-xl font-semibold tracking-tight">Vue Lynx </text>
          <text class="text-sm text-muted"
            >Vue Lynx Starter Template By Chanavee platform:{{ platform }}</text
          >
        </view>

        <BaseItem
          title="Dark"
          description="Swith theme Dark|Light"
          button
          @tap="handleTheme"
        >
          <template #start>
            <view class="flex items-center justify-center">
              <IconLucide :size="24" name="sunMoon" />
            </view>
          </template>
          <template #end>
            <ThemeToggle disabled ref="themeToggleRef" />
          </template>
        </BaseItem>
        <BaseItem
          v-for="(item, index) in menuItems"
          :key="item.value"
          :title="item.label || ''"
          button
          :to="item.value"
        >
          <template #end>
            <view class="w-8 h-8 flex items-center justify-center">
              <IconLucide :size="14" name="chevronRight" />
            </view>
          </template>
        </BaseItem>
      </BaseCard>
    </scroll-view>
  </view>
</template>
