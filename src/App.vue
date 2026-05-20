<script setup lang="ts">
import { useAndroidBack } from '@/composables/useAndroidBack';
import { useSafeArea } from '@/composables/useSafeArea';
import { useTheme } from '@/composables/useTheme';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import BaseToast from '@/components/base/BaseToast.vue';
import { useToast } from './composables/useToast';
import { useLang } from './composables/useLang ';
import { useDevice } from './composables/useDevice';
const { themeClass, onInitTheme } = useTheme();
const { isNative } = useDevice();
const { onInitLang } = useLang();
const { safeAreaBottom } = useSafeArea();
const toast = useToast();
useAndroidBack();
onMounted(() => {
  onInitTheme();
  onInitLang();
});
</script>

<template>
  <view
    class="w-full h-full bg-background"
    :class="[themeClass, !isNative ? 'font-sans' : '']"
    :style="{
      paddingBottom: safeAreaBottom + 'px',
    }"
  >
    <!-- <RouterView /> -->

    <!-- <RouterView v-slot="{ Component, route }">
      <KeepAlive v-if="route.meta.keepAlive === true" :max="5">
        <Component :is="Component" :key="route.fullPath" />
      </KeepAlive>
      <Component
        v-else-if="!route.meta.keepAlive === true"
        :is="Component"
        :key="route.fullPath"
      />
    </RouterView> -->

    <RouterView v-slot="{ Component, route }">
      <KeepAlive :max="5">
        <Component
          :is="Component"
          :key="route.fullPath"
          :class="themeClass"
          v-if="route.meta.keepAlive === true"
        />
      </KeepAlive>
      <Component
        :is="Component"
        :key="route.fullPath"
        :class="themeClass"
        v-if="!route.meta.keepAlive === true"
      />
    </RouterView>

    <BaseToast
      v-model:isOpen="toast.state.isOpen"
      :message="toast.state.message"
      :position="toast.state.position"
      :duration="toast.state.duration"
      :actionText="toast.state.actionText"
    />
  </view>
</template>
