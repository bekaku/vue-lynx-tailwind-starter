<script setup lang="ts">
import Page from '@/components/ui/Page.vue';
import Toolbar from '@/components/ui/Toolbar.vue';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardDescription from '@/components/ui/CardDescription.vue';
import CardContent from '@/components/ui/CardContent.vue';
import CardFooter from '@/components/ui/CardFooter.vue';
import Button from '@/components/ui/Button.vue'; // ปุ่มที่ทำไว้ตอนแรก
import { useRoute } from 'vue-router';

const route = useRoute();
const handleTab = () => {
  console.log('Button tapped!');
};
</script>

<template>
  <Page>
    <Toolbar title="Card" />

    <Card class="w-full">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>

      <CardContent>
        <view class="flex flex-col gap-4">
          <!-- จำลอง Form Input หรือเนื้อหาอื่นๆ -->
          <view class="flex flex-col gap-2">
            <text class="text-sm font-medium text-zinc-900">Name</text>
            <view
              class="h-10 px-3 border border-zinc-200 rounded-md bg-white flex flex-row items-center"
            >
              <text class="text-sm text-zinc-500">My Lynx App</text>
            </view>
          </view>
        </view>
      </CardContent>

      <CardFooter class="justify-between">
        <Button variant="outline" label="Cancel" class="w-[48%]" />
        <Button variant="default" label="Deploy" class="w-[48%]" />
      </CardFooter>
    </Card>
  </Page>
</template>
