<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BasePage from '@/components/base/BasePage.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useStorage } from '@/composables/useStorage';
import { onMounted, ref } from 'vue-lynx';
import { useRoute } from 'vue-router';

const route = useRoute();
const { setItem, getItem, removeItem, clear } = useStorage();
const username = ref('Chanavee Bekaku');
const savedUsername = ref('');
const handleSave = () => {
  setItem('USER_NAME', username.value);
  console.log('Saved:', username.value);
};
const handleLoad = async () => {
  const result = await getItem('USER_NAME');
  if (result) {
    savedUsername.value = result;
    console.log('Loaded:', result);
  } else {
    console.log('No data found');
  }
};
const handleDelete = async () => {
  console.log('Deleting...');
  const isDeleted = await removeItem('USER_NAME');
  if (isDeleted) {
    savedUsername.value = '';
    console.log('Deleted!');
  } else {
    console.log('Failed to delete!');
  }
};
const handleClear = () => {
  clear();
  savedUsername.value = '';
};
onMounted(async () => {
  await handleLoad();
});
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Native Local Storage Module" />

    <BaseCard>
      <BaseCardContent>
        <view class="flex flex-col p-4 gap-4">
          <text>ชื่อที่บันทึกไว้: {{ savedUsername }}</text>

          <!-- สมมติว่านี่คือ Input -->
          <!-- <input v-model="username" placeholder="พิมพ์ชื่อ..." /> -->

          <view class="flex flex-row gap-2">
            <BaseButton label="Save" @tab="handleSave" />
            <BaseButton label="Load" @tab="handleLoad" />
            <BaseButton label="Delete" variant="destructive" @tab="handleDelete" />
            <BaseButton label="Clear" @tab="handleClear" />
          </view>
        </view>
      </BaseCardContent>
    </BaseCard>
  </view>
</template>
