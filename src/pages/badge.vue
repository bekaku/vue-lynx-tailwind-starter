<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { useTheme } from '@/composables/useTheme';
import IconLucide from '@/components/IconLucide.vue';
const { isDark } = useTheme();
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Badge" />

    <BaseCard>
      <view class="flex flex-row flex-wrap gap-2 p-4">
        <BaseBadge>
          <text class="text-white">Badge</text>
        </BaseBadge>

        <BaseBadge variant="secondary">
          <text :class="!isDark ? 'text-zinc-900' : 'text-zinc-100'"
            >Secondary</text
          >
        </BaseBadge>

        <BaseBadge variant="destructive">
          <text class="text-white">Destructive</text>
        </BaseBadge>

        <BaseBadge variant="outline">Outline</BaseBadge>

        <BaseBadge variant="destructive">
          <view class="flex flex-row gap-[2px] items-center">
            <IconLucide dark name="messageCircle" :size="18" />
            <text class="text-white"> 50 </text>
          </view>
        </BaseBadge>

        <BaseBadge class="bg-green-500" text-class="text-lg ">
          <text class="text-white"> Custom Size </text>
        </BaseBadge>
      </view>

      <view class="flex flex-row flex-wrap gap-2 p-4">
        <view class="relative flex">
          <BaseAvatar
            src="https://github.com/shadcn.png"
            fallback="CN"
            class="h-16 w-16"
          />
          <BaseBadge
            variant="destructive"
            class="absolute -top-1 -right-1 h-5 w-5 p-0"
          >
            <text class="text-white">1</text>
          </BaseBadge>
        </view>

        <view class="relative flex">
          <BaseAvatar
            src="https://github.com/shadcn.png"
            fallback="CN"
            class="h-16 w-16"
          >
          </BaseAvatar>
          <BaseBadge
            label="On"
            class="bg-green-500 absolute -bottom-1 -right-1 border-2 border-background"
          >
            <text class="text-white">On</text>
          </BaseBadge>
        </view>

        <view class="relative flex">
          <BaseAvatar
            src="https://github.com/shadcn.png"
            fallback="CN"
            class="h-16 w-16"
          />
          <BaseBadge label="New" class="absolute -top-2 -left-2" />
        </view>

        <view class="relative flex">
          <BaseAvatar
            src="https://github.com/shadcn.png"
            fallback="CN"
            class="h-16 w-16"
          />
          <BaseBadge
            label="Pro"
            variant="secondary"
            class="absolute -bottom-2 -left-2"
          />
        </view>
      </view>
    </BaseCard>
  </view>
</template>

<style module>
.badgeText {
  color: red;
}
</style>
