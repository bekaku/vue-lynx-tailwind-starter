<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseItem from '@/components/base/BaseItem.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useDevice } from '@/composables/useDevice';
import { useScrollRestore } from '@/composables/useScrollRestore';
import { useTheme } from '@/composables/useTheme';
import type { LabelValue } from '@/types/common';
import { BadgeCheck, ChevronRight, SunMoon } from 'lucide-static';
import {
  onActivated,
  onDeactivated,
  onMounted,
  ref,
  useTemplateRef,
} from 'vue';
const { scrollTop, onScroll } = useScrollRestore();
const { isDark } = useTheme();
const { platform } = useDevice();
const themeToggleRef = useTemplateRef<any>('themeToggleRef');
const longpress = ref(false);
// const globalProps = lynx.__globalProps;
const menuItems = ref<LabelValue<any>[]>([
  { label: 'Action Sheet', value: '/action-sheet' },
  { label: 'Alert', value: '/alert' },
  { label: 'Badge', value: '/badge' },
  { label: 'Button', value: '/button' },
  { label: 'Chat', value: '/chat' },
  { label: 'Card', value: '/card' },
  { label: 'Confirm dialog', value: '/confirm-dialog' },
  { label: 'Dialog', value: '/dialog' },
  { label: 'Event modifier', value: '/event-modifier' },
  { label: 'Fetch data', value: '/fetch-data/feed' },
  { label: 'Grid', value: '/grid' },
  { label: 'Icons', value: '/icons' },
  { label: 'Image', value: '/image' },
  { label: 'Image picker', value: '/image-picker' },
  { label: 'Inifinite Load', value: '/inifinite-load' },
  { label: 'Input', value: '/input' },
  { label: 'Item', value: '/item' },
  { label: 'Loading', value: '/loading' },
  { label: 'List', value: '/list' },
  { label: 'List column', value: '/list-column' },
  { label: 'List waterfall', value: '/list-waterfall' },
  { label: 'Keep alive', value: '/keepalive' },
  { label: 'Native LocalStorage', value: '/native-local-storage' },
  { label: 'Notfound', value: '/not-foudn' },
  { label: 'Popover', value: '/popover' },
  { label: 'Pull to refresh', value: '/pull-to-refresh' },
  { label: 'Users', value: '/user-list' },
  { label: 'Skeleton', value: '/skeleton' },
  { label: 'Scroll view', value: '/scroll-view' },
  { label: 'Stores', value: '/store' },
  { label: 'Tailwind CSS', value: '/tailwind' },
  { label: 'Tabs Route', value: '/tabs-route' },
  { label: 'Tabs Keepalive', value: '/tabs-keepalive' },
  { label: 'Text ellipsis', value: '/text-ellipsis' },
  { label: 'Transition', value: '/transition' },
]);

onMounted(() => {
  // const info = lynx.getSystemInfoSync();
  console.log('index.vue > onMounted');
});
onActivated(() => {
  console.log('index.vue > onActivated');
});

onDeactivated(() => {
  console.log('index.vue > onDeactivated');
});
const handleTheme = (e: any) => {
  console.log('index.vue > handleTheme', e);
  if (themeToggleRef.value) {
    themeToggleRef.value.onToggleTheme(!isDark.value);
  }
};
const handleLongpress = (e: any) => {
  longpress.value = true;
  console.log('index.vue > handleLongpress', e);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar :show-back-button="false" title="Vue Lynx" />
    <!-- <scroll-view
      :class="['flex-1 w-full']"
      scroll-orientation="vertical"
            :scroll-top="scrollTop"
      @scroll="onScroll"
    > -->
    <scroll-view
      :class="['flex-1 w-full']"
      scroll-orientation="vertical"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <BaseCard class="w-full px-2">
        <view class="flex flex-col p-[14px]">
          <text class="text-xl font-bold tracking-tight">Vue Lynx </text>
          <text class="text-sm text-muted">
            Vue Lynx Starter Template By Chanavee platform : {{ platform }}
          </text>
        </view>

        <BaseItem
          title="Dark"
          description="Swith theme Dark/Light"
          button
          @tap="handleTheme"
        >
          <template #start>
            <view class="flex items-center justify-center">
              <BaseIcon :name="SunMoon" :size="26" />
            </view>
          </template>
          <template #end>
            <ThemeToggle disabled ref="themeToggleRef" />
          </template>
        </BaseItem>
        <BaseItem
          title="Longpress"
          description="Press and hold to show longpress"
          button
          @longpress="handleLongpress"
        >
          <template #end>
            <BaseIcon
              :name="BadgeCheck"
              :color="longpress ? '#00c950' : '#6a7282'"
              :auto="false"
            />
          </template>
        </BaseItem>
        <BaseItem
          v-for="(item, index) in menuItems"
          :key="item.value"
          :title="item.label || ''"
          button
          :title-bold="false"
          :to="item.value"
        >
          <template #end>
            <view class="w-8 h-8 flex items-center justify-center">
              <BaseIcon :size="14" :name="ChevronRight" color="#71717b" />
            </view>
          </template>
        </BaseItem>
      </BaseCard>
    </scroll-view>
  </view>
</template>
