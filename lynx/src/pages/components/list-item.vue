<script setup lang="ts">
import ListItem from '@/components/ui/ListItem.vue';
import Toolbar from '@/components/ui/Toolbar.vue';

const handleItemClick = (item: string) => {
  console.log(`Tapped on: ${item}`);
};
</script>

<template>
  <view class="flex-1">
    <Toolbar class="mb-2">
      <text class="font-semibold text-lg">Vue Lynx</text>
    </Toolbar>
    <view
      class="flex flex-col mx-4 mt-4 bg-white rounded-lg border border-zinc-200 overflow-hidden"
    >
      <ListItem title="Profile" button @tab="handleItemClick('Profile')" />

      <ListItem
        title="Notifications"
        description="Manage your push notifications"
        button
        @tab="handleItemClick('Notifications')"
      />

      <ListItem
        title="Dark Mode"
        description="Toggle dark mode theme"
        button
        class="border-b-0"
      >
        <template #start>
          <view
            class="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center"
          >
            <!-- <image src="..." /> -->
            <text class="text-zinc-900 text-xs">🌙</text>
          </view>
        </template>

        <template #end>
          <text class="text-zinc-400 text-xs font-medium">Slot end</text>
        </template>
      </ListItem>
    </view>
  </view>
</template>
