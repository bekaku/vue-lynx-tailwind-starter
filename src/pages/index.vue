<script setup lang="ts">
import IconLucide from '@/components/IconLucide.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardFooter from '@/components/base/BaseCardFooter.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseItem from '@/components/base/BaseItem.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
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
  { label: 'Event modifier', value: '/event-modifier' },
  { label: 'Grid', value: '/grid' },
  { label: 'Icons', value: '/icons' },
  { label: 'Input', value: '/components/input' },
  { label: 'List BaseItem', value: '/components/list-item' },
  { label: 'Native LocalStorage', value: '/native-local-storage' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Users', value: '/user-list' },
  { label: 'Stores', value: '/store' },
  { label: 'Tabs Route', value: '/tabs-route' },
  { label: 'Tabs Keepalive', value: '/tabs-keepalive' },
]);

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
        <BaseCardHeader>
          <BaseCardTitle>Vue Lynx</BaseCardTitle>
          <text class="text-muted text-sm">
            Vue Lynx Starter Template By Chanavee platform: {{ platform }}
          </text>
        </BaseCardHeader>

        <BaseItem
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
              <!-- <text class="text-zinc-400 text-xs">❯</text> -->
              <IconLucide :size="14" icon="chevronRight" />
            </view>
          </template>
        </BaseItem>
      </BaseCard>
    </scroll-view>
  </view>
</template>
