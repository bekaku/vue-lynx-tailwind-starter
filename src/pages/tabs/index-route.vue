<script setup lang="ts">
import TabBar from '@/components/ui/TabBar.vue';
import TabButton from '@/components/ui/TabButton.vue';
import { useBase } from '@/composables/useBase';
import { useSafeArea } from '@/composables/useSafeArea';
import { RouterView } from 'vue-router';
const { bottom } = useSafeArea();
const { onNavigateTo, isPathActive } = useBase();
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <!-- 
      1. ส่วนของเนื้อหา (เทียบเท่า <ion-router-outlet>) 
      ใส่ flex-1 เพื่อให้ดัน Tab Bar ไปอยู่ล่างสุดเสมอ 
    -->
    <view class="flex-1 overflow-hidden">
      <RouterView />
      <!-- <text>Router view</text> -->
    </view>

    <!-- 2. ส่วนของ Tab Bar (เทียบเท่า <ion-tab-bar>) -->
    <TabBar :style="{ paddingBottom: bottom + 'px' }">
      <TabButton
        label="Home"
        :active="isPathActive('/tabs-route')"
        @tab="onNavigateTo('/tabs-route', true)"
      >
        <template #icon>
          <text
            :class="
              isPathActive('/tabs-route') ? 'text-primary' : 'text-zinc-500'
            "
            >🏠</text
          >
        </template>
      </TabButton>

      <TabButton
        label="Chat"
        :active="isPathActive('/tabs-route/chat')"
        @tab="onNavigateTo('/tabs-route/chat', true)"
      >
        <template #icon>
          <text
            :class="
              isPathActive('/tabs-route/chat')
                ? 'text-primary'
                : 'text-zinc-500'
            "
            >🔍</text
          >
        </template>
      </TabButton>

      <TabButton
        label="Settings"
        :active="isPathActive('/tabs-route/settings')"
        @tab="onNavigateTo('/tabs-route/settings', true)"
      >
        <template #icon>
          <text
            :class="
              isPathActive('/tabs-route/settings')
                ? 'text-primary'
                : 'text-zinc-500'
            "
            >⚙️</text
          >
        </template>
      </TabButton>
    </TabBar>
  </view>
</template>
