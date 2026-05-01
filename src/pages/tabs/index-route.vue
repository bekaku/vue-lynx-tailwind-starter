<script setup lang="ts">
import BaseTabBar from '@/components/base/BaseTabBar.vue';
import BaseTabButton from '@/components/base/BaseTabButton.vue';
import { useBase } from '@/composables/useBase';
import { useSafeArea } from '@/composables/useSafeArea';
import { RouterView } from 'vue-router';
import IconLucide from '@/components/IconLucide.vue';
const { bottom } = useSafeArea();
const { onNavigateTo, isPathActive } = useBase();
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <view class="flex-1 overflow-hidden">
      <RouterView />
    </view>

    <BaseTabBar class="py-2">
      <!-- <BaseTabBar :style="{ paddingBottom: bottom + 'px' }"> -->
      <BaseTabButton
        label="Home"
        :active="isPathActive('/tabs-route')"
        @tab="onNavigateTo('/tabs-route', true)"
      >
        <template #icon>
          <IconLucide icon="house" />
        </template>
      </BaseTabButton>

      <BaseTabButton
        label="Chat"
        :active="isPathActive('/tabs-route/chat')"
        @tab="onNavigateTo('/tabs-route/chat', true)"
      >
        <template #icon>
           <IconLucide icon="messageCircle" />
        </template>
      </BaseTabButton>

      <BaseTabButton
        label="Settings"
        :active="isPathActive('/tabs-route/settings')"
        @tab="onNavigateTo('/tabs-route/settings', true)"
      >
        <template #icon>
          <IconLucide icon="settings" />
        </template>
      </BaseTabButton>
    </BaseTabBar>
  </view>
</template>
