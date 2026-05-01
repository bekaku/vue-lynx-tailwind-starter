<script setup lang="ts">
import { cn } from '@/utils/appUtil';
import BaseImage from './base/BaseImage.vue';
import { iconMap } from '@/libs/lucideIcons';
import type { BaseLucideIcon } from '@/libs/lucideIcons';

import { useTheme } from '@/composables/useTheme';
import { computed } from 'vue-lynx';


const props = withDefaults(
  defineProps<{
    icon: BaseLucideIcon;
    size?: number;
    class?: string;
    autoTheme?: boolean;
  }>(),
  {
    size: 24,
    autoTheme: true,
  },
);
const {isDark} = useTheme();
const currentIconKey = computed(() => {
  if (props.autoTheme && isDark.value) {
    const darkKey = `${props.icon}Dark`;
    
    if (darkKey in iconMap) {
      return darkKey as keyof typeof iconMap;
    }
  }
  
  return props.icon;
});
</script>
<template>
  <BaseImage
    v-if="iconMap[currentIconKey]"
    :src="iconMap[currentIconKey]"
    :class="cn(props.class)"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px',
    }"
  ></BaseImage>
</template>
