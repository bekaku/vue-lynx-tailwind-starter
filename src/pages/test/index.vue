<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseContentText from '@/components/base/BaseContentText.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import IconLucide from '@/components/IconLucide.vue';
import { useTheme } from '@/composables/useTheme';
import { ref } from 'vue';
const { isDark } = useTheme();

const contentText = ref(
  'This is the link https://www.apple.com/ I want to go to this when link available. https://www.youtube.com/watch?v=m6aAl0jhUsI',
);
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Test" />

    <BaseCard>
      <view class="flex flex-row flex-wrap gap-2 p-4">
        <BaseContentText :content="contentText" />
      </view>
    </BaseCard>
  </view>
</template>

<style module>
.badgeText {
  color: red;
}
</style>
