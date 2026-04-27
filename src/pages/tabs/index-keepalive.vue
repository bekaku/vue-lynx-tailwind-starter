<script setup lang="ts">
import TabBar from '@/components/ui/TabBar.vue';
import TabButton from '@/components/ui/TabButton.vue';
import { useBase } from '@/composables/useBase';
import TabsChat from '@/pages/tabs/chat.vue';
import TabsHome from '@/pages/tabs/home.vue';
import { reactive, ref } from 'vue-lynx';
const { onNavigateTo, isPathActive } = useBase();

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
  <view
    class="w-full h-full flex flex-col bg-background"
  >
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

    <!-- 2. ส่วนของ Tab Bar (เทียบเท่า <ion-tab-bar>) -->
    <TabBar class="pb-[env(safe-area-inset-bottom)]">
      <TabButton
        label="Home"
        :active="activeTab === 'home'"
        @tab="switchTab('home')"
      >
        <!-- @tab="switchTab2(0)" -->
        <!-- @tab="switchTab('home')" -->
        <template #icon>
          <text :class="activeTab === 'home' ? 'text-primary' : 'text-zinc-500'"
            >🏠</text
          >
        </template>
      </TabButton>

      <TabButton
        label="Chat"
        :active="activeTab === 'chat'"
        @tab="switchTab('chat')"
      >
        <!-- @tab="switchTab('chat')" -->
        <!-- @tab="switchTab2(1)" -->
        <template #icon>
          <text :class="activeTab === 'chat' ? 'text-primary' : 'text-zinc-500'"
            >🔍</text
          >
        </template>
      </TabButton>

      <TabButton
        label="Settings"
        :active="activeTab === 'settings'"
        @tab="switchTab('settings')"
      >
        <template #icon>
          <text
            :class="activeTab === 'settings' ? 'text-primary' : 'text-zinc-500'"
            >⚙️</text
          >
        </template>
      </TabButton>
    </TabBar>
  </view>
</template>
