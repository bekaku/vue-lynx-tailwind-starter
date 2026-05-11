<script setup lang="ts">
import { iconMap } from '@/libs/lucideIcons';
import { cn } from '@/utils/appUtil';
import BaseImage from './base/BaseImage.vue';

import { useTheme } from '@/composables/useTheme';
import type { LucideIconProps } from '@/types/props';
import { computed } from 'vue';

const props = withDefaults(defineProps<LucideIconProps>(), {
  size: 24,
  autoTheme: true,
});
const { isDark } = useTheme();
const currentIconKey = computed(() => {
  const darkKey = `${props.name}Dark`;
  if (props.dark) {
    if (darkKey in iconMap) {
      return darkKey as keyof typeof iconMap;
    }
  }

  if (props.autoTheme && isDark.value) {
    if (darkKey in iconMap) {
      return darkKey as keyof typeof iconMap;
    }
  }

  return props.name;
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
