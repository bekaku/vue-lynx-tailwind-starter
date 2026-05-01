<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardDescription from '@/components/base/BaseCardDescription.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BasePage from '@/components/base/BasePage.vue';
import BaseTextHeader from '@/components/base/BaseTextHeader.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Flexbox & Grid" />

    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>Flex Row</BaseCardTitle>
        </BaseCardHeader>
        <view
          class="w-full border border-border rounded-md p-1 flex flex-row gap-2"
        >
          <view class="w-full bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="w-full bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="w-full bg-blue-500">
            <text class="text-white">03</text>
          </view>
        </view>

        <text class="text-muted pt-3">Flex Row Basis</text>

        <view
          class="w-full border border-border rounded-md p-1 flex flex-row gap-2"
        >
          <view class="w-full basis-64 bg-blue-500">
            <text class="text-white">basis-64</text>
          </view>
          <view class="w-full basis-64 bg-blue-500">
            <text class="text-white">basis-64</text>
          </view>
          <view class="w-full basis-128 bg-blue-500">
            <text class="text-white">basis-128</text>
          </view>
        </view>

        <view
          class="w-full border border-border rounded-md p-1 flex flex-row gap-2 mt-4"
        >
          <view class="w-full basis-1/3 bg-blue-500">
            <text class="text-white">basis-1/3</text>
          </view>
          <view class="w-full basis-2/3 bg-blue-500">
            <text class="text-white">basis-2/3</text>
          </view>
        </view>

        <view
          class="w-full border border-border rounded-md p-1 flex flex-row gap-2 mt-4"
        >
          <view class="w-full basis-[70vw] bg-blue-500">
            <text class="text-white">basis-[70vw]</text>
          </view>
          <view class="w-full basis-[30vw] bg-blue-500">
            <text class="text-white">basis-[30vw]</text>
          </view>
        </view>
        <text class="text-muted pt-3">Responsive design</text>
        <view
          class="w-full border border-border rounded-md p-1 flex flex-row gap-2"
        >
          <view class="w-full basis-1/4 md:basis-1/3 bg-blue-500">
            <text class="text-white">basis-1/4 md:basis-1/3</text>
          </view>
          <view class="w-full basis-1/4 md:basis-1/3 bg-blue-500">
            <text class="text-white">basis-1/4 md:basis-1/3</text>
          </view>
          <view class="w-full basis-1/2 md:basis-1/3 bg-blue-500">
            <text class="text-white">basis-1/2 md:basis-1/3</text>
          </view>
        </view>

        <text class="text-muted pt-3">flex-row-reverse</text>
        <view
          class="w-full border border-border rounded-md p-1 flex flex-row-reverse gap-2"
        >
          <view class="w-full bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="w-full bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="w-full bg-blue-500">
            <text class="text-white">03</text>
          </view>
        </view>
      </BaseCard>

      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>Flex Col</BaseCardTitle>
        </BaseCardHeader>
        <view
          class="w-full border border-border rounded-md p-1 flex flex-col gap-2"
        >
          <view class="bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="bg-blue-500">
            <text class="text-white">03</text>
          </view>
        </view>
        <text class="text-muted pt-3">flex-col-reverse</text>
        <view
          class="w-full border border-border rounded-md p-1 flex flex-col-reverse gap-2"
        >
          <view class="bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="bg-blue-500">
            <text class="text-white">03</text>
          </view>
        </view>
      </BaseCard>
      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>flex-wrap</BaseCardTitle>
          <BaseCardDescription>
            Utilities for controlling how flex items wrap.
          </BaseCardDescription>
        </BaseCardHeader>

        <text class="text-muted pt-3">flex-nowrap</text>
        <view
          class="w-full border border-border rounded-md p-1 flex flex-row flex-nowrap gap-2"
        >
          <view class="w-full basis-64 bg-blue-500">
            <text class="text-white">basis-64</text>
          </view>
          <view class="w-full basis-64 bg-blue-500">
            <text class="text-white">basis-64</text>
          </view>
          <view class="w-full basis-128 bg-blue-500">
            <text class="text-white">basis-128</text>
          </view>
        </view>

        <text class="text-muted pt-3">flex-wrap</text>
        <view
          class="w-full border border-border rounded-md p-1 flex flex-row flex-wrap gap-2"
        >
          <view class="w-full basis-24 bg-blue-500">
            <text class="text-white">basis-24</text>
          </view>
          <view class="w-full basis-24 bg-blue-500">
            <text class="text-white">basis-24</text>
          </view>
          <view class="w-full basis-128 bg-blue-500">
            <text class="text-white">basis-128</text>
          </view>
        </view>
      </BaseCard>

      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>flex</BaseCardTitle>
          <BaseCardDescription>
            Utilities for controlling how flex items both grow and shrink.
          </BaseCardDescription>
        </BaseCardHeader>
        <text class="text-muted pt-3">Basic example</text>

        <view class="w-full border border-border rounded-md p-1 flex gap-2">
          <view class="w-14 flex-none bg-blue-500">
            <text class="text-white">w-14 flex-none</text>
          </view>
          <view class="w-64 flex-1 bg-blue-500">
            <text class="text-white">w-64 flex-1</text>
          </view>
          <view class="w-32 flex-1 bg-blue-500">
            <text class="text-white">w-32 flex-1</text>
          </view>
        </view>

        <text class="text-muted pt-3">flex-auto</text>
        <view class="w-full border border-border rounded-md p-1 flex gap-2">
          <view class="w-14 flex-none bg-blue-500">
            <text class="text-white">w-14 flex-none</text>
          </view>
          <view class="w-64 flex-auto bg-blue-500">
            <text class="text-white">w-64 flex-auto</text>
          </view>
          <view class="w-32 flex-auto bg-blue-500">
            <text class="text-white">w-32 flex-auto</text>
          </view>
        </view>

        <text class="text-muted pt-3">flex-none</text>
        <view class="w-full border border-border rounded-md p-1 flex gap-2">
          <view class="w-14 flex-none bg-blue-500">
            <text class="text-white">w-14 flex-none</text>
          </view>
          <view class="w-32 flex-none bg-blue-500">
            <text class="text-white">w-32 flex-auto</text>
          </view>
          <view class="w-32 flex-1 bg-blue-500">
            <text class="text-white">w-32 flex-1</text>
          </view>
        </view>

        <text class="text-muted pt-3">grow</text>
        <view class="w-full border border-border rounded-md p-1 flex gap-2">
          <view class="size-14 flex-none bg-blue-500">
            <text class="text-white">size-14 flex-none</text>
          </view>
          <view class="size-14 grow bg-blue-500">
            <text class="text-white">size-14 grow</text>
          </view>
          <view class="size-14 flex-none bg-blue-500">
            <text class="text-white">size-14 flex-none</text>
          </view>
        </view>
      </BaseCard>

      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>grid-column</BaseCardTitle>
          <BaseCardDescription>
            Utilities for controlling how elements are sized and placed across
            grid columns.
          </BaseCardDescription>
        </BaseCardHeader>
        <text class="text-muted pt-3">Basic columns</text>
        <view
          class="w-full border border-border rounded-md p-1 grid grid-cols-3 gap-2"
        >
          <view class="w-full bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="w-full bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="w-full bg-blue-500">
            <text class="text-white">03</text>
          </view>
          <view class="w-full bg-blue-500">
            <text class="text-white">04</text>
          </view>
        </view>
        <text class="text-muted pt-3">Spanning columns</text>
        <view
          class="w-full border border-border rounded-md p-1 grid grid-cols-3 gap-2"
        >
          <view class="w-full bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="w-full bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="w-full bg-blue-500">
            <text class="text-white">03</text>
          </view>
          <view class="w-full col-span-2 bg-blue-500">
            <text class="text-white">col-span-2</text>
          </view>
          <view class="w-full bg-blue-500">
            <text class="text-white">05</text>
          </view>
        </view>
      </BaseCard>
      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>justify-content</BaseCardTitle>
          <BaseCardDescription>
            Utilities for controlling how flex and grid items are positioned
            along a container's main axis.
          </BaseCardDescription>
        </BaseCardHeader>
        <text class="text-muted pt-3">justify-start</text>
        <view
          class="w-full border border-border rounded-md p-1 flex justify-start gap-2"
        >
          <view class="p-4 bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">03</text>
          </view>
        </view>
        <text class="text-muted pt-3">justify-center</text>
        <view
          class="w-full border border-border rounded-md p-1 flex justify-center gap-2"
        >
          <view class="p-4 bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">03</text>
          </view>
        </view>

        <text class="text-muted pt-3">justify-end</text>
        <view
          class="w-full border border-border rounded-md p-1 flex justify-end gap-2"
        >
          <view class="p-4 bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">03</text>
          </view>
        </view>

        <text class="text-muted pt-3">justify-between</text>
        <view
          class="w-full border border-border rounded-md p-1 flex justify-between gap-2"
        >
          <view class="p-4 bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">03</text>
          </view>
        </view>

        <text class="text-muted pt-3">justify-around</text>
        <view
          class="w-full border border-border rounded-md p-1 flex justify-around gap-2"
        >
          <view class="p-4 bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">03</text>
          </view>
        </view>

        <text class="text-muted pt-3">justify-evenly</text>
        <view
          class="w-full border border-border rounded-md p-1 flex justify-evenly gap-2"
        >
          <view class="p-4 bg-blue-500">
            <text class="text-white">01</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">02</text>
          </view>
          <view class="p-4 bg-blue-500">
            <text class="text-white">03</text>
          </view>
        </view>
      </BaseCard>

      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>align-items</BaseCardTitle>
          <BaseCardDescription>
            Utilities for controlling how flex and grid items are positioned
            along a container's cross axis.
          </BaseCardDescription>
        </BaseCardHeader>

        <text class="text-muted pt-3">items-stretch</text>
        <view
          class="w-full bg-zinc-500 border border-border rounded-md p-1 flex items-stretch gap-2"
        >
          <view class="w-full bg-blue-500">
            <text class="text-white py-4">01</text>
          </view>
          <view class="w-full bg-blue-500 py-12">
            <text class="text-white">02</text>
          </view>
          <view class="w-full bg-blue-500 py-8">
            <text class="text-white">03</text>
          </view>
        </view>

        <text class="text-muted pt-3">items-start</text>
        <view
          class="w-full bg-zinc-500 border border-border rounded-md p-1 flex items-start gap-2"
        >
          <view class="w-full bg-blue-500">
            <text class="text-white py-4">01</text>
          </view>
          <view class="w-full bg-blue-500 py-12">
            <text class="text-white">02</text>
          </view>
          <view class="w-full bg-blue-500 py-8">
            <text class="text-white">03</text>
          </view>
        </view>
        <text class="text-muted pt-3">items-center</text>
        <view
          class="w-full bg-zinc-500 border border-border rounded-md p-1 flex items-center gap-2"
        >
          <view class="w-full bg-blue-500">
            <text class="text-white py-4">01</text>
          </view>
          <view class="w-full bg-blue-500 py-12">
            <text class="text-white">02</text>
          </view>
          <view class="w-full bg-blue-500 py-8">
            <text class="text-white">03</text>
          </view>
        </view>
         <view
          class="w-full border border-border rounded-md my-2 p-1 flex items-center"
        >
          <view class="flex items-center">
            <view
              class="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center"
            >
              <text class="text-zinc-900 text-xs">🌙</text>
            </view>
            <view class="pl-2">
              <text class="text-lg font-semibold">Spencer Sharp</text>
              <text class="text-sm text-muted">Working on the future of astronaut recruitment at Space
                Recruit.
              </text>
            </view>
          </view>
          <text class="text-muted">abc.com</text>
        </view>

        <text class="text-muted pt-3">items-end</text>
        <view
          class="w-full bg-zinc-500 border border-border rounded-md p-1 flex items-end gap-2"
        >
          <view class="w-full bg-blue-500">
            <text class="text-white py-4">01</text>
          </view>
          <view class="w-full bg-blue-500 py-12">
            <text class="text-white">02</text>
          </view>
          <view class="w-full bg-blue-500 py-8">
            <text class="text-white">03</text>
          </view>
        </view>

        <text class="text-muted pt-3">items-baseline</text>
        <view
          class="w-full bg-zinc-500 border border-border rounded-md p-1 flex items-baseline gap-2"
        >
          <view class="w-full bg-blue-500 pt-2 pb-6">
            <text class="text-white py-4">01</text>
          </view>
          <view class="w-full bg-blue-500 pt-8 pb-12">
            <text class="text-white">02</text>
          </view>
          <view class="w-full bg-blue-500 pt-12 pb-4">
            <text class="text-white">03</text>
          </view>
        </view>

        <text class="text-muted pt-3">items-baseline-last</text>
        <view
          class="w-full border border-border rounded-md p-1 grid grid-cols-[1fr_auto] items-baseline-last"
        >
          <view class="flex">
            <view
              class="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center"
            >
              <text class="text-zinc-900 text-xs">🌙</text>
            </view>
            <view class="pl-2">
              <text class="text-lg font-semibold">Spencer Sharp</text>
              <text class="text-sm text-muted">Working on the future of astronaut recruitment at Space
                Recruit.
              </text>
            </view>
          </view>
          <text class="text-muted">abc.com</text>
        </view>

       

      </BaseCard>
    </scroll-view>
  </view>
</template>
