<script setup lang="ts">
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseToast from '@/components/base/BaseToast.vue';
import { useSafeArea } from '@/composables/useSafeArea';
import { computed, onMounted, ref } from 'vue';
import { useAxios } from '@/composables/useAxios';

interface FeedItem {
  id: number;
  title: string;
  url: string;
  user: string;
  domain: string;
  points: number;
  time_ago: string;
  comments_count: number;
  type: string;
}
const { isLoading, error, execute } = useAxios<FeedItem[]>();
const data = ref<FeedItem[]>([]);
onMounted(async () => {
  console.log('feed.vue > onMounted');
  await onLoadData();
});
const onLoadData = async (): Promise<void> => {
  try {
    const response = await execute('/news?page=1', {
      method: 'GET',
      addResponseData: false,
    });
    console.log('response', response);
    data.value.push(...response);
    return new Promise((resolve) => resolve());
  } catch (err) {
    console.error('Error:', err);
    return new Promise((resolve) => resolve());
  }
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Fetch Axios" />

    <text class="p-4">
        {{ data }}
    </text>
  </view>
</template>
