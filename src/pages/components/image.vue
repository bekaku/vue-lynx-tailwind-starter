<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseImage from '@/components/base/BaseImage.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { cn } from '@/utils/appUtil';
import { useRoute } from 'vue-router';

const route = useRoute();

const users = [
  { src: 'https://github.com/shadcn.png', fallback: 'CN' },
  { src: 'https://github.com/leerob.png', fallback: 'LR' },
  { src: 'https://github.com/evilrabbit.png', fallback: 'ER' },
];
const imageLoaded = (e: any) => {
  console.log('imageLoaded!', e);
};
const imageError = (e: any) => {
  console.warn('imageError!', e);
};
const onImgTap = (e: any) => {
  console.log('onImgTap!', e);
};
const onAvatarTap = (e: any) => {
  console.log('onAvatarTap!', e);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Image" />
    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <BaseCard class="w-full">
        <BaseCardHeader>
          <BaseCardTitle>Image</BaseCardTitle>
        </BaseCardHeader>
        <view class="flex flex-row flex-wrap items-center gap-4 p-2">
          <BaseImage
            src="https://github.com/shadcn.png"
            :style="{
              width: '72px',
              height: '72px',
            }"
            @load="imageLoaded"
            @tap="onImgTap"
          />
          <BaseImage
            src="https://github.com/notfound.png"
            :style="{
              width: '72px',
              height: '72px',
            }"
          />
          <BaseImage
            src="https://github.com/404.png"
            :style="{
              width: '72px',
              height: '72px',
            }"
            @error="imageError"
          />
        </view>

        <view class="flex justify-center mt-4">
          <text class="text-muted p-2 ">Fit Mode</text>
        </view>
        <view class="flex flex-col flex-wrap items-center gap-2 p-2">
          <text>cover</text>
          <BaseImage
            src="https://github.com/shadcn.png"
            class="w-full h-[10rem] bg-background"
            fit="cover"
          />
          <text>contain</text>
          <BaseImage
            src="https://github.com/shadcn.png"
             class="w-full h-[10rem] bg-background"
            fit="contain"
          />
          <text>fill</text>
          <BaseImage
            src="https://github.com/shadcn.png"
             class="w-full h-[10rem] bg-background"
            fit="fill"
          />
          <text>none</text>
          <BaseImage
            src="https://github.com/shadcn.png"
             class="w-full h-[10rem] bg-background"
            fit="none"
          />
          <text>scale-down</text>
          <BaseImage
            src="https://github.com/shadcn.png"
             class="w-full h-[10rem] bg-background"
            fit="scale-down"
          />
        </view>
      </BaseCard>

      <BaseCard class="w-full">
        <BaseCardHeader>
          <BaseCardTitle>Avatar</BaseCardTitle>
        </BaseCardHeader>

        <view class="flex flex-row flex-wrap items-center p-2 gap-4">
          <BaseAvatar src="https://github.com/shadcn.png" fallback="CN" @tap="onAvatarTap"/>

          <BaseAvatar src="https://github.com/image.jpg" fallback="JD" />

          <BaseAvatar
            src="https://github.com/shadcn.png"
            fallback="LG"
            class="h-16 w-16"
            fallbackClass="text-lg"
          />

          <BaseAvatar
            src="https://github.com/shadcn.png"
            fallback="SQ"
            class="h-12 w-12 rounded-lg"
          />
        </view>
      </BaseCard>
      <BaseCard class="w-full">
        <BaseCardHeader>
          <BaseCardTitle>Avatar Group</BaseCardTitle>
        </BaseCardHeader>

        <view class="flex flex-row items-center p-2">
          <BaseAvatar
            v-for="(user, index) in users"
            :key="index"
            :src="user.src"
            :fallback="user.fallback"
            :class="
              cn(
                'border-2 border-background', 
                index > 0 ? '-ml-3' : '',
              )
            "
          />
        </view>
      </BaseCard>
    </scroll-view>
  </view>
</template>
