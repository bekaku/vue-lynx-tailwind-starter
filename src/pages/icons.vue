<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BasePage from '@/components/base/BasePage.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { reactive } from 'vue-lynx';
import { useRoute } from 'vue-router';
import IconLucide from '@/components/IconLucide.vue';

const route = useRoute();
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Icons" />

    <BaseCard>
      <BaseCardHeader>
        <BaseCardTitle>Icons</BaseCardTitle>
      </BaseCardHeader>
      <BaseCardContent>
        <view class="w-full flex flex-row gap-2">
          <!-- <image :src="iconHouse" class="w-8 h-8" /> -->
          <IconLucide :size="24" icon="house" />
          <IconLucide :size="24" icon="settings" />
          <IconLucide :size="24" icon="sunMoon" />
        </view>
      </BaseCardContent>
    </BaseCard>
  </view>
</template>
<style scoped></style>
