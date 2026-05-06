<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import IconLucide from '@/components/IconLucide.vue';
import type { BaseLucideIcon } from '@/libs/lucideIcons';

const icons: BaseLucideIcon[] = [
  'chevronLeft',
  'chevronRight',
  'messageCircle',
  'moveLeft',
  'house',
  'settings',
  'sunMoon',
  'trash',
  'x',
];
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Icons" />
    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>Icons</BaseCardTitle>
        </BaseCardHeader>
        <BaseCardContent>
          <text class="text-muted py-3">Auto Dark | Light</text>
          <view class="w-full flex flex-row gap-2">
            <IconLucide
              v-for="(item, index) in icons"
              :key="item"
              :size="24"
              :name="item"
            />
          </view>

          <text class="text-muted py-3">Dark</text>
          <view class="w-full flex flex-row gap-2 p-2 bg-zinc-800">
            <IconLucide
              v-for="(item, index) in icons"
              :key="item"
              :size="24"
              dark
              :name="item"
            />
          </view>
        </BaseCardContent>
      </BaseCard>
    </scroll-view>
  </view>
</template>
<style scoped></style>
