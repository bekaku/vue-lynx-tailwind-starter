<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseTextHeader from '@/components/base/BaseTextHeader.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { Camera, Cog, DatabaseSearch, House, MessageCircle, User } from 'lucide-static';
import { useRoute } from 'vue-router';

const route = useRoute();
const handleTab = () => {
  console.log('Button tapped!');
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Button" />
    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <BaseCard>
        <BaseTextHeader>Row</BaseTextHeader>
        <view class="flex flex-row gap-2 p-4">
          <BaseButton class="flex-1" label="flex-1" />
          <BaseButton class="flex-1" variant="destructive" label="flex-1" />
        </view>
        <text class="px-2 text-muted">justify-center</text>
        <view class="flex flex-row justify-center gap-2 p-4">
          <BaseButton class="flex-none" label="flex-none" />
          <BaseButton class="flex-none" label="flex-none" />
        </view>
        <text class="px-2 text-muted">justify-end</text>
        <view class="flex flex-row justify-end gap-2 p-4">
          <BaseButton class="flex-none" label="flex-none" />
          <BaseButton class="flex-none" label="flex-none" />
        </view>

        <text class="px-2 text-muted">Rounded</text>
        <view class="flex flex-row justify-start gap-2 p-4">
          <BaseButton class="flex-none" rounded label="Rounded" />
          <BaseButton rounded size="icon">
              <BaseIcon :name="MessageCircle" :auto="false" color="#fff" />
          </BaseButton>
          <BaseButton variant="ghost" rounded size="icon">
            <BaseIcon :name="Camera"/>
          </BaseButton>
        </view>

        <BaseTextHeader>Column</BaseTextHeader>
        <view class="flex flex-col gap-4 p-4">
          <BaseButton label="Default Button" @tap="handleTab" />
          <BaseButton variant="dark" label="Dark Button" />
          <BaseButton variant="destructive" label="Delete" />
          <BaseButton variant="outline" label="Outline Button" />
          <BaseButton variant="ghost" label="Ghost Button" />
          <BaseButton variant="link" label="Link Button" />
          <BaseButton variant="secondary" size="sm" label="Small Secondary" />

          <BaseButton class="bg-emerald-500" label="Custom color" />
          <BaseButton
            class="bg-pink-500 active:bg-red-900"
            label="Custom color and active"
          />

          <BaseButton label="Icon left">
            <template #start>
               <BaseIcon :name="MessageCircle" :auto="false" color="#fff" class="mr-1"/>
            </template>
          </BaseButton>

          <BaseButton variant="ghost" label="Icon left">
            <template #start>
              <BaseIcon :name="House" class="mr-1"/>
            </template>
          </BaseButton>
          <BaseButton variant="ghost" label="Icon right">
            <template #end>
               <BaseIcon :name="User" class="mr-1"/>
            </template>
          </BaseButton>
          <BaseButton variant="ghost" label="Icon both">
            <template #start>
                <BaseIcon :name="Cog" class="mr-1"/>
            </template>
            <template #end>
                 <BaseIcon :name="DatabaseSearch" class="ml-1"/>
            </template>
          </BaseButton>
        </view>
      </BaseCard>
    </scroll-view>
  </view>
</template>
