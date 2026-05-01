<script setup lang="ts">
import { useBase } from '@/composables/useBase';

const props = defineProps<{
  src: string;
  class?: string;
}>();

const { isAndroid } = useBase();
</script>

<template>
  <glide-image v-if="isAndroid" :src="props.src" :class="props.class" />
  <image v-else :src="props.src" :class="props.class" />
</template>
