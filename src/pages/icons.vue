<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import IconLucide from '@/components/IconLucide.vue';
import type { BaseLucideIcon } from '@/libs/lucideIcons';
import { biArchiveFill, biCamera } from '@quasar/extras/bootstrap-icons';
import { laDocker } from '@quasar/extras/line-awesome';
import { mdiAirplaneTakeoff } from '@quasar/extras/mdi-v4';
import { mdiAbugidaThai } from '@quasar/extras/mdi-v7';
import { Airplay, Bell, Crown, Download, Eraser, PhoneCall, User } from 'lucide-static';

const icons: BaseLucideIcon[] = [
  'camera',
  'house',
];
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Icons" />
    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>Icons PNG</BaseCardTitle>
        </BaseCardHeader>
        <BaseCardContent>
          <text class="text-muted py-3">Auto Dark | Light</text>
          <view class="w-full flex flex-row flex-wrap gap-2">
            <IconLucide
              v-for="(item, index) in icons"
              :key="item"
              :size="24"
              :name="item"
            />
          </view>

          <text class="text-muted py-3">Dark</text>
          <view class="w-full flex flex-row gap-2 flex-wrap p-2 bg-zinc-800">
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

      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>Icons SVG</BaseCardTitle>
        </BaseCardHeader>
        <BaseCardContent>
          <view class="w-full flex flex-row flex-wrap gap-2">
            <BaseIcon :name="PhoneCall" />
            <BaseIcon :name="Crown" />
            <BaseIcon :name="Eraser" />
            <BaseIcon :name="Download" />
            <BaseIcon :name="User" />
            <BaseIcon :name="Bell" :size="32" />
            <BaseIcon
              :name="Airplay"
              :size="32"
              color="#ff6467"
              :auto="false"
            />
          </view>
        </BaseCardContent>
      </BaseCard>
      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>Icons Qursar Extra</BaseCardTitle>
        </BaseCardHeader>
        <BaseCardContent>
          <view class="w-full flex flex-row flex-wrap gap-2">
            <BaseIcon :name="biCamera" icon-set="quasar-bootstrap-icons"/>
            <BaseIcon :name="biArchiveFill" icon-set="quasar-bootstrap-icons"/>
            <BaseIcon :name="mdiAbugidaThai" icon-set="quasar-mdi"/>
            <BaseIcon :name="laDocker" icon-set="quasar-line-awesome"/>
            <BaseIcon :name="mdiAirplaneTakeoff" icon-set="quasar-mdi"/>
          </view>
        </BaseCardContent>
      </BaseCard>
    </scroll-view>
  </view>
</template>
<style scoped></style>
