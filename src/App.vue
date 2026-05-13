<script setup lang="ts">
import { useAndroidBack } from '@/composables/useAndroidBack';
import { useSafeArea } from '@/composables/useSafeArea';
import { useTheme } from '@/composables/useTheme';
import { onMounted } from 'vue';
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
    <!-- <RouterView /> -->

    <RouterView v-slot="{ Component, route }">
      <KeepAlive v-if="route.meta.keepAlive === true" :max="5">
        <Component :is="Component" :key="route.fullPath" />
      </KeepAlive>
      <Component
        v-else-if="!route.meta.keepAlive === true"
        :is="Component"
        :key="route.fullPath"
      />
    </RouterView>

    <!-- <RouterView v-slot="{ Component, route }">
      <KeepAlive :max="5">
        <Component
          :is="Component"
          :key="route.fullPath"
          v-if="route.meta.keepAlive === true"
        />
      </KeepAlive>
      <Component
        :is="Component"
        :key="route.fullPath"
        v-if="!route.meta.keepAlive === true"
      />
    </RouterView> -->
  </view>
</template>
