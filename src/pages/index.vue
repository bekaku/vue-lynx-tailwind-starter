<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseImage from '@/components/base/BaseImage.vue';
import BaseItem from '@/components/base/BaseItem.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import { useDevice } from '@/composables/useDevice';
import { useScrollRestore } from '@/composables/useScrollRestore';
import { useTheme } from '@/composables/useTheme';
import type { LabelValue } from '@/types/common';
import { BadgeCheck, Bell, ChevronRight, Search, SunMoon } from 'lucide-static';
import logoBlack from '@/assets/logo-black.png';
import logoWhite from '@/assets/logo-white.png';
import {
  computed,
  onActivated,
  onDeactivated,
  onMounted,
  ref,
  useTemplateRef,
} from 'vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseCardDescription from '@/components/base/BaseCardDescription.vue';
const { scrollTop, onScroll } = useScrollRestore();
const { isDark } = useTheme();
const { platform } = useDevice();
const themeToggleRef = useTemplateRef<any>('themeToggleRef');
const longpress = ref(false);
// const globalProps = lynx.__globalProps;
const menuItems = ref<LabelValue<any>[]>([
  { label: 'Action Sheet', value: '/action-sheet', description: 'component' },
  { label: 'Alert', value: '/alert', description: 'component' },
  { label: 'Badge', value: '/badge', description: 'component' },
  { label: 'Button', value: '/button', description: 'component' },
  { label: 'Chat', value: '/chat', description: 'example' },
  { label: 'Card', value: '/card', description: 'component' },
  {
    label: 'Confirm dialog',
    value: '/confirm-dialog',
    description: 'component',
  },
  { label: 'Dialog', value: '/dialog', description: 'component' },
  { label: 'Echarts', value: '/echarts', description: 'example' },
  {
    label: 'Event modifier',
    value: '/event-modifier',
    description: 'example',
  },
  { label: 'Fetch data', value: '/fetch-data', description: 'example' },
  { label: 'Grid', value: '/grid', description: 'component' },
  { label: 'Icons', value: '/icons', description: 'component' },
  { label: 'Image', value: '/image', description: 'component' },
  { label: 'Image picker', value: '/image-picker', description: 'component' },
  {
    label: 'Inifinite Load',
    value: '/inifinite-load',
    description: 'example',
  },
  { label: 'Input', value: '/input', description: 'component' },
  { label: 'Item', value: '/item', description: 'component' },
  { label: 'Loading', value: '/loading', description: 'component' },
  { label: 'List', value: '/list', description: 'example' },
  { label: 'List column', value: '/list-column', description: 'example' },
  {
    label: 'List waterfall',
    value: '/list-waterfall',
    description: 'example',
  },
  { label: 'Keep alive', value: '/keepalive', description: 'example' },
  {
    label: 'Native LocalStorage',
    value: '/native-local-storage',
    description: 'example',
  },
  { label: 'Notfound', value: '/not-foudn', description: 'example' },
  { label: 'Popover', value: '/popover', description: 'component' },
  {
    label: 'Pull to refresh',
    value: '/pull-to-refresh',
    description: 'example',
  },
  { label: 'Users', value: '/user-list', description: 'example' },
  { label: 'Skeleton', value: '/skeleton', description: 'component' },
  { label: 'Scroll view', value: '/scroll-view', description: 'example' },
  { label: 'Stores', value: '/store', description: 'example' },
  { label: 'Tailwind CSS', value: '/tailwind', description: 'example' },
  { label: 'Tabs Route', value: '/tabs-route', description: 'example' },
  {
    label: 'Tabs Keepalive',
    value: '/tabs-keepalive',
    description: 'example',
  },
  { label: 'Text ellipsis', value: '/text-ellipsis', description: 'component' },
  { label: 'Transition', value: '/transition', description: 'component' },
]);

const getComponentItems = computed(() => {
  return menuItems.value.filter((item) => item.description === 'component');
});
const getExampletItems = computed(() => {
  return menuItems.value.filter((item) => item.description === 'example');
});
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
  longpress.value = !longpress.value;
  console.log('index.vue > handleLongpress', e);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar :show-back-button="false" title="Home" title-left :border="false">
      <template #start>
        <BaseImage
          :src="!isDark ? logoBlack : logoWhite"
          :style="{ width: '32px', height: '32px' }"
          fit="scaleToFill"
          class="mr-2"
        />
      </template>
      <template #end>
        <view class="flex flex-row gap-1.5 pr-2 items-center">
          <BaseButton variant="ghost" rounded size="icon" class="h-8 w-8">
            <BaseIcon :name="Search" :size="24" />
          </BaseButton>

          <view class="flex flex-col gap-2 items-center">
            <BaseIcon :name="Bell" :size="24" />
            <BaseBadge
              variant="destructive"
              class="absolute -top-1 -right-1 p-0"
              :style="{ width: '18px', height: '18px' }"
            >
              <text class="text-white text-xs"> 9 </text>
            </BaseBadge>
          </view>
        </view>
      </template>
    </BaseToolBar>
    <scroll-view
      :class="['flex-1 w-full']"
      scroll-orientation="vertical"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <view class="flex flex-col px-[24px] pt-[14px]">
        <text class="text-xl font-bold tracking-tight">Vue Lynx </text>
        <text class="text-sm text-muted">
          Vue Lynx Starter Template By Chanavee platform : {{ platform }}
        </text>
      </view>

      <BaseCard class="w-full px-2" flat>
        <BaseCardHeader>
          <BaseCardTitle>Example Page</BaseCardTitle>
          <BaseCardDescription class="text-sm">
            This is a description
          </BaseCardDescription>
        </BaseCardHeader>

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
          v-for="(item, index) in getExampletItems"
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
      <BaseCard class="w-full px-2" flat>
        <BaseCardHeader>
          <BaseCardTitle>Component Page</BaseCardTitle>
          <BaseCardDescription class="text-sm">
            This is a description
          </BaseCardDescription>
        </BaseCardHeader>

        <BaseItem
          title="Longpress"
          description="Press and hold to show longpress"
          button
          :title-bold="false"
          @longpress="handleLongpress"
        >
          <template #end>
            <BaseIcon
              :name="BadgeCheck"
              :color="longpress ? '#00c950' : '#6a7282'"
              :auto-dark="false"
            />
          </template>
        </BaseItem>
        <BaseItem
          v-for="(item, index) in getComponentItems"
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
