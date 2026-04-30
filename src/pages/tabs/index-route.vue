<script setup lang="ts">
import TabBar from '@/components/ui/TabBar.vue';
import TabButton from '@/components/ui/TabButton.vue';
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

    <TabBar class="py-2">
      <!-- <TabBar :style="{ paddingBottom: bottom + 'px' }"> -->
      <TabButton
        label="Home"
        :active="isPathActive('/tabs-route')"
        @tab="onNavigateTo('/tabs-route', true)"
      >
        <template #icon>
          <IconLucide icon="house" />
        </template>
      </TabButton>

      <TabButton
        label="Chat"
        :active="isPathActive('/tabs-route/chat')"
        @tab="onNavigateTo('/tabs-route/chat', true)"
      >
        <template #icon>
           <IconLucide icon="messageCircle" />
        </template>
      </TabButton>

      <TabButton
        label="Settings"
        :active="isPathActive('/tabs-route/settings')"
        @tab="onNavigateTo('/tabs-route/settings', true)"
      >
        <template #icon>
          <IconLucide icon="settings" />
        </template>
      </TabButton>
    </TabBar>
  </view>
</template>
