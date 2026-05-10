<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseTabBar from '@/components/base/BaseTabBar.vue';
import BaseTabButton from '@/components/base/BaseTabButton.vue';
import { useBase } from '@/composables/useBase';
import { useSafeArea } from '@/composables/useSafeArea';
import { Cog, House, MessageCircle } from 'lucide-static';
import { RouterView } from 'vue-router';
const { bottom } = useSafeArea();
const { onNavigateTo, isPathActive } = useBase();
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <view class="flex-1 overflow-hidden">
      <RouterView />
    </view>

    <BaseTabBar class="py-1">
      <BaseTabButton
        label="Home"
        :active="isPathActive('/tabs-route')"
        @tap="onNavigateTo('/tabs-route', true)"
      >
        <template #icon>
          <BaseIcon
            :name="House"
            :color="!isPathActive('/tabs-route') ? '#18181b' : '#3b82f6'"
            :auto="!isPathActive('/tabs-route')"
          />
        </template>
      </BaseTabButton>

      <BaseTabButton
        label="Chat"
        :active="isPathActive('/tabs-route/chat')"
        @tap="onNavigateTo('/tabs-route/chat', true)"
      >
        <template #icon>
          <BaseIcon
            :name="MessageCircle"
            :color="!isPathActive('/tabs-route/chat') ? '#18181b' : '#3b82f6'"
            :auto="!isPathActive('/tabs-route/chat')"
          />
        </template>
      </BaseTabButton>

      <BaseTabButton
        label="Settings"
        :active="isPathActive('/tabs-route/settings')"
        @tap="onNavigateTo('/tabs-route/settings', true)"
      >
        <template #icon>
          <BaseIcon
            :name="Cog"
            :color="
              !isPathActive('/tabs-route/settings') ? '#18181b' : '#3b82f6'
            "
            :auto="!isPathActive('/tabs-route/settings')"
          />
        </template>
      </BaseTabButton>
    </BaseTabBar>
  </view>
</template>
