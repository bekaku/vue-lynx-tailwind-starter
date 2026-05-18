<script setup lang="ts">
import BasePage from '@/components/base/BasePage.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseCardDescription from '@/components/base/BaseCardDescription.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardFooter from '@/components/base/BaseCardFooter.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseImage from '@/components/base/BaseImage.vue';
import { useRoute } from 'vue-router';
import BaseContentText from '@/components/base/BaseContentText.vue';

const route = useRoute();
const contentText =
  'Tailwind CSS includes a vast, beautiful color palette out of the box, carefully crafted by expert designers and suitable for a wide range of different design styles. https://lucide.dev/icons/';
const handleTab = () => {
  console.log('BaseButton tapped!');
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="BaseCard" />
    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <BaseCard class="w-full" :flat="false">
        <BaseCardHeader>
          <BaseCardTitle>Basic Card</BaseCardTitle>
          <BaseCardDescription>
            Deploy your new project in one-click.
          </BaseCardDescription>
        </BaseCardHeader>

        <BaseCardContent class="pt-0">
          <BaseContentText text-class="app-text" :content="contentText" />
        </BaseCardContent>

        <view class="h-[0.5px] w-full border-b border-border my-2"></view>
        <BaseCardFooter class="justify-between gap-2">
          <BaseButton variant="outline" label="Cancel" class="flex-1" />
          <BaseButton variant="default" label="Deploy" class="flex-1" />
        </BaseCardFooter>
      </BaseCard>
      <BaseCard class="w-full" :flat="false">
        <BaseImage
          class="w-full h-[150px]"
          src="https://images.unsplash.com/photo-1734983234384-5a3edcec48ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fit="aspectFill"
        />
        <BaseCardHeader>
          <BaseCardTitle>Basic Card</BaseCardTitle>
          <BaseCardDescription> This is a description. </BaseCardDescription>
        </BaseCardHeader>

        <BaseCardContent class="pt-0">
          <BaseContentText text-class="app-text" :content="contentText" />
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
          <text class="app-text" :style="{ fontSize: '15px', lineHeight: '1.5em' }"
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
          <text class="app-text"
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
          <text class="app-text"
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
          <text class="app-text"
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
