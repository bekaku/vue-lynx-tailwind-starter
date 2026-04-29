<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Page from '@/components/ui/Page.vue';
import ToolBar from '@/components/ui/ToolBar.vue';
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
    <ToolBar title="Native Local Storage Module" />

    <Card>
      <CardContent>
        <view class="flex flex-col p-4 gap-4">
          <text>ชื่อที่บันทึกไว้: {{ savedUsername }}</text>

          <!-- สมมติว่านี่คือ Input -->
          <!-- <input v-model="username" placeholder="พิมพ์ชื่อ..." /> -->

          <view class="flex flex-row gap-2">
            <Button label="Save" @tab="handleSave" />
            <Button label="Load" @tab="handleLoad" />
            <Button label="Delete" variant="destructive" @tab="handleDelete" />
            <Button label="Clear" @tab="handleClear" />
          </view>
        </view>
      </CardContent>
    </Card>
  </view>
</template>
