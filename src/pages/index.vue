<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import ListItem from '@/components/ui/ListItem.vue';
import Page from '@/components/ui/Page.vue';
import Toolbar from '@/components/ui/Toolbar.vue';
import { useTheme } from '@/composables/useTheme';
import type { LabelValue } from '@/types/common';
import { useScrollRestore } from '@/composables/useScrollRestore';
import { useSafeArea } from '@/composables/useSafeArea';
import { ref } from 'vue-lynx';

const { bottom, left, right, top } = useSafeArea();
const { scrollTop, onScroll } = useScrollRestore();

const { isDark } = useTheme();

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
]);
</script>

<template>
  <Page>
    <Toolbar :show-back-button="false" title="Vue Lynx" />
    <scroll-view
      :class="['flex-1 w-full']"
      scroll-orientation="vertical"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Vue Lynx Edited</CardTitle>
          <text class="text-muted text-sm">
            Vue Lynx Starter Template By Chanavee

            {{ ({bottom, left, right, top}) }}
          </text>
        </CardHeader>

        <ListItem title="Dark" description="Swith theme Dark|Light">
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
        </ListItem>

        <ListItem
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
        </ListItem>
      </Card>
    </scroll-view>
  </Page>
</template>
