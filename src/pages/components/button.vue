<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BasePage from '@/components/base/BasePage.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import IconLucide from '@/components/IconLucide.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const handleTab = () => {
  console.log('Button tapped!');
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

        <BaseButton class="bg-emerald-500" label="Custom color" />
        <BaseButton
          class="bg-pink-500 active:bg-red-900"
          label="Custom color and active"
        />

        <BaseButton variant="primary" label="Icon left">
          <template #start>
            <IconLucide name="messageCircle" dark class="mr-1" />
          </template>
        </BaseButton>

        <BaseButton variant="ghost" label="Icon left">
          <template #start>
            <IconLucide name="house" class="mr-1" />
          </template>
        </BaseButton>
        <BaseButton variant="ghost" label="Icon right">
          <template #end>
            <IconLucide name="settings" class="ml-1" />
          </template>
        </BaseButton>
        <BaseButton variant="ghost" label="Icon both">
          <template #start>
            <IconLucide name="house" class="mr-1" />
          </template>
          <template #end>
            <IconLucide name="messageCircle" class="ml-1" />
          </template>
        </BaseButton>
      </view>
    </BaseCard>
  </view>
</template>
