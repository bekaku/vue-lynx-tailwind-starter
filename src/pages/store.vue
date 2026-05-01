<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BasePage from '@/components/base/BasePage.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import { useCounterStore } from '../stores/counterStore';

const counter = useCounterStore();
</script>

<template>
   <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="About page" />

    <BaseCard>
      <BaseCardContent>
        <text
          :style="{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '8px',
          }"
        >
          Counter Store
        </text>

        <text class="my-2 text-lg"> Count: {{ counter.count }} </text>
        <text class="mb-2 text-lg"> Double: {{ counter.doubleCount }} </text>

        <view :style="{ display: 'flex', flexDirection: 'row', gap: '8px' }">
          <text
            class="text-sm bg-destructive text-white py-2 px-4 rounded-md"
            @tap="counter.decrement"
          >
            −
          </text>
          <text
            class="text-sm bg-success text-white py-2 px-4 rounded-md"
            @tap="counter.increment"
          >
            +
          </text>
          <text
            class="text-sm bg-zinc-600 text-white py-2 px-4 rounded-md"
            @tap="counter.reset"
          >
            Reset
          </text>
        </view>
      </BaseCardContent>
    </BaseCard>
  </view>
</template>
