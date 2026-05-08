<script setup lang="ts">
import { useAndroidBack } from '@/composables/useAndroidBack';
import { useSafeArea } from '@/composables/useSafeArea';
import { useTheme } from '@/composables/useTheme';
import { onMounted } from 'vue-lynx';
import { RouterView } from 'vue-router';
const { themeClass, onInit } = useTheme();
const { safeAreaBottom } = useSafeArea();
useAndroidBack();
onMounted(() => {
  onInit();
});
</script>

<template>
  <view
    class="w-full h-full bg-background"
    :class="themeClass"
    :style="{
      paddingBottom: safeAreaBottom + 'px',
    }"
  >
    <RouterView />

    <!-- <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in" :duration="200">
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView> -->
  </view>
</template>
