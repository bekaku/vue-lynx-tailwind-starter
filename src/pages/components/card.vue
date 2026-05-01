<script setup lang="ts">
import BasePage from '@/components/base/BasePage.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseCardDescription from '@/components/base/BaseCardDescription.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardFooter from '@/components/base/BaseCardFooter.vue';
import BaseButton from '@/components/base/BaseButton.vue'; // ปุ่มที่ทำไว้ตอนแรก
import { useRoute } from 'vue-router';

const route = useRoute();
const handleTab = () => {
  console.log('BaseButton tapped!');
};
</script>

<template>
   <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="BaseCard" />

    <BaseCard class="w-full">
      <BaseCardHeader>
        <BaseCardTitle>Create project</BaseCardTitle>
        <BaseCardDescription>Deploy your new project in one-click.</BaseCardDescription>
      </BaseCardHeader>

      <BaseCardContent>
        <view class="flex flex-col gap-4">
          <!-- จำลอง Form Input หรือเนื้อหาอื่นๆ -->
          <view class="flex flex-col gap-2">
            <text class="text-sm font-medium text-zinc-900">Name</text>
            <view
              class="h-10 px-3 border border-zinc-200 rounded-md bg-white flex flex-row items-center"
            >
              <text class="text-sm text-zinc-500">My Lynx App</text>
            </view>
          </view>
        </view>
      </BaseCardContent>

      <BaseCardFooter class="justify-between">
        <BaseButton variant="outline" label="Cancel" class="w-[48%]" />
        <BaseButton variant="default" label="Deploy" class="w-[48%]" />
      </BaseCardFooter>
    </BaseCard>
  </view>
</template>
