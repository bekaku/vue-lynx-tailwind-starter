<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { useTheme } from '@/composables/useTheme';
import IconLucide from '@/components/IconLucide.vue';
import BasePopover from '@/components/base/BasePopover.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { ref } from 'vue';
import type { LabelValue } from '@/types/common';
import BaseItem from '@/components/base/BaseItem.vue';

const menuItems = ref<LabelValue<any>[]>([
  {
    label: 'User account',
    value: 'user-account',
    lucideIcon: { name: 'messageCircle', size: 18 },
  },
  {
    label: 'Settings',
    value: 'settings',
    lucideIcon: { name: 'settings', size: 18 },
  },
]);

const handleMenuItemClick = (itemName: string) => {
  console.log(`You choose: ${itemName}`);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Popover" />

    <BaseCard>
      <BaseCardContent class="gap-2">
        <BasePopover position="bottom-left">
          <template #trigger="{ isOpen }">
            <BaseButton>
              <text class="text-white"> Options {{ isOpen ? '▲' : '▼' }} </text>
            </BaseButton>
          </template>

          <template #default="{ close }">
            <view class="flex flex-col w-full">
              <text class="ml-3 font-semibold"> Set up profile </text>

              <BaseItem
                v-for="(item, index) in menuItems"
                :key="index"
                :title="item.label || ''"
                button
                :title-bold="false"
                :whitespace-nowrap="true"
                :separator="false"
                @tap="
                  () => {
                    handleMenuItemClick(item.value);
                    close();
                  }
                "
              >
                <template #start>
                  <view class="flex items-center justify-center">
                    <IconLucide
                      v-if="item.lucideIcon"
                      v-bind="item.lucideIcon"
                    />
                  </view>
                </template>
              </BaseItem>

              <view class="h-[1px] border-t border-border w-full" />
              <BaseItem
                button
                :separator="false"
                @tap="
                  () => {
                    handleMenuItemClick('Logout');
                    close();
                  }
                "
              >
                <text class="text-destructive text-sm">Logout</text>
              </BaseItem>
            </view>
          </template>
        </BasePopover>

        <BasePopover position="bottom-left">
          <template #trigger="{ isOpen }">
            <BaseButton>
              <text class="text-white">
                bottom-left {{ isOpen ? '▲' : '▼' }}
              </text>
            </BaseButton>
          </template>

          <template #default="{ close }">
            <view class="flex flex-col w-full">
              <text class="font-semibold"> . </text>
            </view>
          </template>
        </BasePopover>
        <BasePopover position="bottom-right">
          <template #trigger="{ isOpen }">
            <BaseButton>
              <text class="text-white">
                bottom-right {{ isOpen ? '▲' : '▼' }}
              </text>
            </BaseButton>
          </template>

          <template #default="{ close }">
            <view class="flex flex-col w-full">
              <text class="font-semibold"> . </text>
            </view>
          </template>
        </BasePopover>
        <BasePopover position="top-left">
          <template #trigger="{ isOpen }">
            <BaseButton>
              <text class="text-white">
                top-left {{ isOpen ? '▲' : '▼' }}
              </text>
            </BaseButton>
          </template>

          <template #default="{ close }">
            <view class="flex flex-col w-full">
              <text class="font-semibold"> . </text>
            </view>
          </template>
        </BasePopover>
        <BasePopover position="top-right">
          <template #trigger="{ isOpen }">
            <BaseButton>
              <text class="text-white">
                top-right {{ isOpen ? '▲' : '▼' }}
              </text>
            </BaseButton>
          </template>

          <template #default="{ close }">
            <view class="flex flex-col w-full">
              <text class="font-semibold"> . </text>
            </view>
          </template>
        </BasePopover>
      </BaseCardContent>
    </BaseCard>
  </view>
</template>
