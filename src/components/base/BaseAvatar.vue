<script setup lang="ts">
import { ref, watch } from 'vue';
import { cn } from '@/utils/appUtil';
import BaseImage from '@/components/base/BaseImage.vue';
import { useTheme } from '@/composables/useTheme';

const props = withDefaults(
  defineProps<{
    src?: string;
    fallback?: string;
    class?: any;
    imageClass?: any;
    fallbackClass?: any;
  }>(),
  {
    src: '',
    fallback: '??',
  },
);
const emit = defineEmits<{
  tap: [event: any];
}>();
const { isDark } = useTheme();
const isError = ref(false);
const isLoaded = ref(false);

watch(
  () => props.src,
  () => {
    isError.value = false;
    isLoaded.value = false;
  },
);

const handleLoad = () => {
  isLoaded.value = true;
};

const handleError = () => {
  isError.value = true;
  isLoaded.value = false;
};
</script>

<template>
  <view
    :class="
      cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'h-10 w-10',
        !isDark ? 'bg-zinc-100' : 'bg-zinc-800',
        props.class,
      )
    "
  >
    <text
      :class="
        cn(
          'text-sm font-medium',
          !isDark ? 'text-zinc-900' : 'text-zinc-100',
          props.fallbackClass,
        )
      "
    >
      {{ props.fallback }}
    </text>

    <BaseImage
      v-if="props.src && !isError"
      :src="props.src"
      :class="
        cn(
          'absolute top-0 left-0 h-full w-full transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          props.imageClass,
        )
      "
      @tap="emit('tap', $event)"
      @load="handleLoad"
      @error="handleError"
    />
    <slot />
  </view>
</template>
