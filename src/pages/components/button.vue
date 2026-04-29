<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Page from '@/components/ui/Page.vue';
import ToolBar from '@/components/ui/ToolBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const handleTab = () => {
  console.log('Button tapped!');
};
</script>

<template>
   <view class="w-full h-full flex flex-col bg-background">
    <ToolBar title="Button" />

    <Card>
      <view class="flex flex-col gap-4 p-4">
        <Button label="Default Button" @tab="handleTab" />
        <Button variant="primary" label="Primary Button" />
        <Button variant="destructive" label="Delete" />
        <Button variant="outline" label="Outline Button" />
        <Button variant="ghost" label="Ghost Button" />
        <Button variant="link" label="Link Button" />
        <Button variant="secondary" size="sm" label="Small Secondary" />
      </view>
    </Card>
  </view>
</template>
