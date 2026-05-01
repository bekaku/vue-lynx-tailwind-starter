<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseCardFooter from '@/components/base/BaseCardFooter.vue';
import { ref } from 'vue-lynx';
import { useRoute } from 'vue-router';
import BaseButton from '@/components/base/BaseButton.vue';

const route = useRoute();

const inputValue = ref('');
const handleInput = (e: any) => {
  // const currentValue = e.detail.value.trim();
  console.log('handleInput', e);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="About page" />

   <BaseCard>
        <BaseCardContent>
        
        <text class="font-bold">BaseCard URL</text>

        <view class="w-full">

       
        <explorer-input
          id="input-id"
          class="input-box"
          @input="handleInput"
          :value="inputValue"
          placeholder="Enter BaseCard URL"
        />
 </view>
        </BaseCardContent>

         <BaseCardFooter class="justify-between">
        <BaseButton variant="primary" label="Go" class="w-full" />
      </BaseCardFooter>
      </BaseCard>
  </view>
</template>
<style scoped></style>
