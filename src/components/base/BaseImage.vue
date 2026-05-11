<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    src: string;
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    class?: string;
  }>(),
  {
    fit: 'fill',
  },
);
const emit = defineEmits<{
  currentloopcomplete: [event: any];
  error: [event: any];
  finalloopcomplete: [event: any];
  load: [event: any];
  startplay: [event: any];
  tap: [event: any];
}>();
const { isAndroid } = useDevice();
const nativeMode = computed(() => {
  switch (props.fit) {
    case 'cover':
      return 'aspectFill';
    case 'contain':
    case 'scale-down':
      return 'aspectFit';
    case 'fill':
    default:
      return 'scaleToFill';
  }
});
</script>

<template>
  <glide-image
    v-if="isAndroid"
    :src="props.src"
    :class="props.class"
    :fit="nativeMode"
    @tap="emit('tap', $event)"
    @error="emit('error', $event)"
    @load="emit('load', $event)"
  />
  <image
    v-else
    :src="props.src"
    :class="props.class"
    :mode="nativeMode"
    @tap="emit('tap', $event)"
    @currentloopcomplete="emit('currentloopcomplete', $event)"
    @error="emit('error', $event)"
    @finalloopcomplete="emit('finalloopcomplete', $event)"
    @load="emit('load', $event)"
    @startplay="emit('startplay', $event)"
  />
</template>
