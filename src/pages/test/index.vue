<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useTheme } from '@/composables/useTheme';
import { biCamera } from '@quasar/extras/bootstrap-icons';
import { Airplay, PhoneCall } from 'lucide-static';
import { ref } from 'vue';
const { isDark } = useTheme();

const logoContent =
  ref<string>(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="13" r="8"/><path fill= "#ccc" d="M12 9v4l2 2M5 3L2 6m20 0l-3-3M6.38 18.7L4 21m13.64-2.33L20 21"/></g></svg>
`);
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Test" />

    <view
    class="flex flex-row gap-2 flex-wrap p-2"
      :style="{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px',
      }"
    >
      <!-- <svg
        :content="logoContent"
        class="cls-1"
        :style="{
          width: '320px',
          height: '320px',
          fill: 'red',
          borderColor: 'red',
        }"
      /> -->
      <!-- <svg
        :content="Airplay"
        :style="{
          width: '32px',
          height: '32px',
          fill: 'red',
          borderColor: 'red',
        }"
      /> -->
      <BaseIcon :name="PhoneCall" :size="32" auto />
      <BaseIcon :name="Airplay" :size="32" icon-set="svg" color="#ff6467" />
      <BaseIcon :name="biCamera" :size="32" icon-set="quasar-bootstrap-icons" auto />
    </view>
  </view>
</template>
<style>
.cls-1 {
  fill: red;
}
</style>
