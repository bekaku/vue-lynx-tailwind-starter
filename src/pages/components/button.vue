<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BasePage from '@/components/base/BasePage.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const handleTab = () => {
  console.log('BaseButton tapped!');
};
</script>

<template>
   <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="BaseButton" />

    <BaseCard>
      <view class="flex flex-col gap-4 p-4">
        <BaseButton label="Default BaseButton" @tab="handleTab" />
        <BaseButton variant="primary" label="Primary BaseButton" />
        <BaseButton variant="destructive" label="Delete" />
        <BaseButton variant="outline" label="Outline BaseButton" />
        <BaseButton variant="ghost" label="Ghost BaseButton" />
        <BaseButton variant="link" label="Link BaseButton" />
        <BaseButton variant="secondary" size="sm" label="Small Secondary" />
      </view>
    </BaseCard>
  </view>
</template>
