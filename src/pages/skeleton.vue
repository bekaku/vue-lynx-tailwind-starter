<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseLoading from '@/components/base/BaseLoading.vue';
import BaseSkeleton from '@/components/base/BaseSkeleton.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { ref } from 'vue-lynx';
const isLoading = ref(false);
const handleShow = (e: any) => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1000*5);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Skeleton" />
    <view class="m-4 p-4 bg-primary rounded-lg" @tap="handleShow">
      <text class="text-primary-foreground font-semibold">
        Open Loading : {{ isLoading }}
      </text>
    </view>

    <BaseCard>
      <BaseCardContent>
        <template v-if="isLoading">
          <view
            v-for="i in 5"
            :key="i"
            class="flex flex-row items-center gap-3 p-3 bg-card rounded-xl border border-border mb-[5px]"
          >
            <BaseSkeleton
              width="w-[50px]"
              height="h-[50px]"
              rounded="rounded-full"
            />

            <view class="flex flex-col flex-1 gap-2">
              <BaseSkeleton width="w-3/4" height="h-4" />
              <BaseSkeleton width="w-1/2" height="h-3" />
            </view>
          </view>
        </template>

        <template v-else>
          <text class="text-foreground">Data loading is complete.!</text>
        </template>
      </BaseCardContent>
    </BaseCard>
  </view>
</template>
