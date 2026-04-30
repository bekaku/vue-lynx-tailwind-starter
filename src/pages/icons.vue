<script setup lang="ts">
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import Page from '@/components/ui/Page.vue';
import ToolBar from '@/components/ui/ToolBar.vue';
import { reactive } from 'vue-lynx';
import { useRoute } from 'vue-router';
import IconLucide from '@/components/IconLucide.vue';

const route = useRoute();
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <ToolBar title="Icons" />

    <Card>
      <CardHeader>
        <CardTitle>Icons</CardTitle>
      </CardHeader>
      <CardContent>
        <view class="w-full flex flex-row gap-2">
          <!-- <image :src="iconHouse" class="w-8 h-8" /> -->
          <IconLucide :size="24" icon="house" />
          <IconLucide :size="24" icon="settings" />
          <IconLucide :size="24" icon="sunMoon" />
        </view>
      </CardContent>
    </Card>
  </view>
</template>
<style scoped></style>
