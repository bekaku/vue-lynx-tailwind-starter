<script setup lang="ts">
import BaseTabBar from '@/components/base/BaseTabBar.vue';
import BaseTabButton from '@/components/base/BaseTabButton.vue';
import { useBase } from '@/composables/useBase';
import TabsChat from '@/pages/tabs/chat.vue';
import TabsHome from '@/pages/tabs/home.vue';
import TabsSetting from '@/pages/tabs/setting.vue';
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
      <view
        v-if="renderedTabs['settings']"
        class="absolute inset-0"
        :style="{
          opacity: activeTab === 'settings' ? 1 : 0,
          pointerEvents: activeTab === 'settings' ? 'auto' : 'none',
        }"
      >
        <TabsSetting />
      </view>
    </view>

    <BaseTabBar class="py-2">
      <BaseTabButton
        label="Home"
        :active="activeTab === 'home'"
        @tap="switchTab('home')"
      >
        <template #icon>
          <IconLucide :name="activeTab !== 'home' ? 'house' : 'houseBlue'" />
        </template>
      </BaseTabButton>

      <BaseTabButton
        label="Chat"
        :active="activeTab === 'chat'"
        @tap="switchTab('chat')"
      >
        <template #icon>
          <IconLucide
            :name="activeTab !== 'chat' ? 'messageCircle' : 'messageCircleBlue'"
          />
        </template>
      </BaseTabButton>

      <BaseTabButton
        label="Settings"
        :active="activeTab === 'settings'"
        @tap="switchTab('settings')"
      >
        <template #icon>
          <IconLucide
            :name="activeTab !== 'settings' ? 'settings' : 'settingsBlue'"
          />
        </template>
      </BaseTabButton>
    </BaseTabBar>
  </view>
</template>
