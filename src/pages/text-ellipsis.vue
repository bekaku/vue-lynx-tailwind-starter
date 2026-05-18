
<script setup lang="ts">
import BasePullToRefresh from '@/components/base/BasePullToRefresh.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useTheme } from '@/composables/useTheme';
import BaseTextEllipsis from '@/components/base/BaseTextEllipsis.vue';
import { ref } from 'vue';
const { isDark } = useTheme();

const isLoading = ref(false);
const longText =
  "If you actually start writing big stuff in assembly, esp a macro-assembler, you'd quickly realize it is more verbose, but not fundamentally that different from higher level programming. You basically need to get a hang of how to build abstractions with procedures and macros and you'd be good to go. Reading assembly effectively is often much harder than writing it.";
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Test" />
    <view class="flex flex-col gap-2 p-4">
      <BaseTextEllipsis
        rows="3"
        :content="longText"
        show-more
        text-class="app-text"
        expand-text="Read more"
        collapse-text="Show less"
      />

      <view class="mt-8">
        <BaseTextEllipsis
          rows="3"
          content="This is just a short text."
          expand-text="Expand"
          collapse-text="Collapse"
        />
      </view>
    </view>
  </view>
</template>
<style>
.cls-1 {
  fill: red;
}
</style>
