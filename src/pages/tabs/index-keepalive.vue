<script setup lang="ts">
import BaseTabBar from '@/components/base/BaseTabBar.vue';
import BaseTabButton from '@/components/base/BaseTabButton.vue';
import { useBase } from '@/composables/useBase';
import TabsChat from '@/pages/tabs/chat.vue';
import TabsHome from '@/pages/tabs/home.vue';
import { reactive, ref } from 'vue-lynx';
const { onNavigateTo, isPathActive } = useBase();
import IconLucide from '@/components/IconLucide.vue';
const activeTab = ref('home');
const renderedTabs = reactive<Record<string, boolean>>({
  home: true,
  chat: false,
});
const switchTab = (tabName: string) => {
  activeTab.value = tabName;
  renderedTabs[tabName] = true;
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <view class="flex-1 w-full overflow-hidden">
      <view
        v-if="renderedTabs['home']"
        class="absolute inset-0"
        :style="{
          opacity: activeTab === 'home' ? 1 : 0,
          pointerEvents: activeTab === 'home' ? 'auto' : 'none',
        }"
      >
        <TabsHome />
      </view>

      <view
        v-if="renderedTabs['chat']"
        class="absolute inset-0"
        :style="{
          opacity: activeTab === 'chat' ? 1 : 0,
          pointerEvents: activeTab === 'chat' ? 'auto' : 'none',
        }"
      >
        <TabsChat />
      </view>
    </view>

    <BaseTabBar class="py-2">
      <BaseTabButton
        label="Home"
        :active="activeTab === 'home'"
        @tab="switchTab('home')"
      >
        <template #icon>
          <IconLucide name="house" />
        </template>
      </BaseTabButton>

      <BaseTabButton
        label="Chat"
        :active="activeTab === 'chat'"
        @tab="switchTab('chat')"
      >
        <template #icon>
           <IconLucide name="messageCircle" />
        </template>
      </BaseTabButton>

      <BaseTabButton
        label="Settings"
        :active="activeTab === 'settings'"
        @tab="switchTab('settings')"
      >
        <template #icon>
           <IconLucide name="settings" />
        </template>
      </BaseTabButton>
    </BaseTabBar>
  </view>
</template>
