<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseItem from '@/components/base/BaseItem.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import type { LabelValue } from '@/types/common';
import { SunMoon, User } from 'lucide-static';
import { ref } from 'vue';

const menuItems = ref<LabelValue<any>[]>([
  { label: 'Tailwind CSS', value: '/tailwind' },
  { label: 'About', value: '/about' },
  { label: 'NativeLocalStorageModule', value: '/native-local-storage' },
  { label: 'Users', value: '/user-list' },
  { label: 'Stores', value: '/store' },
  { label: 'Tabs Route', value: '/tabs-route' },
  { label: 'Tabs Keepalive', value: '/tabs-keepalive' },
  { label: 'List BaseItem', value: '/components/list-item' },
  { label: 'BaseCard', value: '/components/card' },
  { label: 'BaseButton', value: '/components/button' },
  { label: 'BaseCard', value: '/components/card' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
  { label: 'Notfound', value: '/components/not-foudn' },
]);
const handleItemClick = (item: string) => {
  console.log(`Tapped on: ${item}`);
};
</script>

<template>
  <view class="w-full h-full bg-background">
    <BaseToolBar class="mb-2" title="Item"> </BaseToolBar>

    <BaseCard>
      <BaseCardContent>
        <BaseItem title="Profile" button @tap="handleItemClick('Profile')">
          <template #start>
            <BaseIcon :name="User" />
          </template>
        </BaseItem>
        <BaseItem
          title="Notifications"
          description="Manage your push notifications"
          button
          @tap="handleItemClick('Notifications')"
        />

        <BaseItem
          title="Dark Mode"
          description="BaseToggle dark mode theme"
          button
          class="border-b-0"
        >
          <template #start>
              <BaseIcon  :name="SunMoon" />
          </template>

          <template #end>
            <text class="text-zinc-400 text-xs font-medium">Slot end</text>
          </template>
        </BaseItem>
      </BaseCardContent>
    </BaseCard>
  </view>
</template>
