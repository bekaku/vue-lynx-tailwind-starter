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
    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <BaseCard class="w-full">
        <BaseCardHeader>
          <BaseCardTitle>Basic Card</BaseCardTitle>
          <BaseCardDescription>
            Deploy your new project in one-click.
          </BaseCardDescription>
        </BaseCardHeader>

        <BaseCardContent class="pt-0">
          <text
            >Tailwind CSS includes a vast, beautiful color palette out of the
            box, carefully crafted by expert designers and suitable for a wide
            range of different design styles.</text
          >
        </BaseCardContent>

        <view class="h-[0.5px] w-full border-b border-border my-2"></view>
        <BaseCardFooter class="justify-between gap-2">
          <BaseButton variant="outline" label="Cancel" class="flex-1" />
          <BaseButton variant="default" label="Deploy" class="flex-1" />
        </BaseCardFooter>
      </BaseCard>

      <BaseCard flat class="w-full">
        <BaseCardHeader>
          <BaseCardTitle>Flat</BaseCardTitle>
          <BaseCardDescription> This is a description </BaseCardDescription>
        </BaseCardHeader>

        <BaseCardContent class="pt-0">
          <text
            >Tailwind CSS includes a vast, beautiful color palette out of the
            box, carefully crafted by expert designers and suitable for a wide
            range of different design styles.</text
          >
        </BaseCardContent>

        <view class="h-[0.5px] w-full border-b border-border my-2"></view>
        <BaseCardFooter class="justify-between gap-2">
          <BaseButton variant="outline" label="Cancel" class="flex-1" />
          <BaseButton variant="default" label="Deploy" class="flex-1" />
        </BaseCardFooter>
      </BaseCard>

      <BaseCard square class="w-full">
        <BaseCardHeader>
          <BaseCardTitle>Square</BaseCardTitle>
          <BaseCardDescription> This is a description </BaseCardDescription>
        </BaseCardHeader>

        <BaseCardContent class="pt-0">
          <text
            >Tailwind CSS includes a vast, beautiful color palette out of the
            box, carefully crafted by expert designers and suitable for a wide
            range of different design styles.</text
          >
        </BaseCardContent>

        <view class="h-[0.5px] w-full border-b border-border my-2"></view>
        <BaseCardFooter class="justify-between gap-2">
          <BaseButton variant="outline" label="Cancel" class="flex-1" />
          <BaseButton variant="default" label="Deploy" class="flex-1" />
        </BaseCardFooter>
      </BaseCard>

      <BaseCard flat square class="w-full">
        <BaseCardHeader>
          <BaseCardTitle>Flat Square</BaseCardTitle>
          <BaseCardDescription> This is a description </BaseCardDescription>
        </BaseCardHeader>

        <BaseCardContent class="pt-0">
          <text
            >Tailwind CSS includes a vast, beautiful color palette out of the
            box, carefully crafted by expert designers and suitable for a wide
            range of different design styles.</text
          >
        </BaseCardContent>

        <view class="h-[0.5px] w-full border-b border-border my-2"></view>
        <BaseCardFooter class="justify-between gap-2">
          <BaseButton variant="outline" label="Cancel" class="flex-1" />
          <BaseButton variant="default" label="Deploy" class="flex-1" />
        </BaseCardFooter>
      </BaseCard>

      <BaseCard flat square :margin="false" class="w-full">
        <BaseCardHeader>
          <BaseCardTitle>No Margin</BaseCardTitle>
          <BaseCardDescription> This is a description </BaseCardDescription>
        </BaseCardHeader>

        <BaseCardContent class="pt-0">
          <text
            >Tailwind CSS includes a vast, beautiful color palette out of the
            box, carefully crafted by expert designers and suitable for a wide
            range of different design styles.</text
          >
        </BaseCardContent>

        <view class="h-[0.5px] w-full border-b border-border my-2"></view>
        <BaseCardFooter class="justify-between gap-2">
          <BaseButton variant="outline" label="Cancel" class="flex-1" />
          <BaseButton variant="default" label="Deploy" class="flex-1" />
        </BaseCardFooter>
      </BaseCard>
    </scroll-view>
  </view>
</template>
