<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { cn } from '@/utils/appUtil';
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    src: string;
    fit?: 'scaleToFill' | 'aspectFill' | 'aspectFit' | 'center';
    class?: string;
  }>(),
  {
    fit: 'scaleToFill',
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
const haseError=ref(false)
/* 
cover : aspectFill
contain, scale-down : aspectFit
fill : scaleToFill
*/
const onError = (e: any) => {
  emit('error', e);
};
</script>

<template>
  <glide-image
    v-if="isAndroid"
    :src="props.src"
    :class="props.class"
    :fit="fit"
    @tap="emit('tap', $event)"
    @error="emit('error', $event)"
    @load="emit('load', $event)"
  />
  <image
    v-else
    :src="props.src"
    :class="cn(props.class)"
    :mode="fit"
    @tap="emit('tap', $event)"
    @currentloopcomplete="emit('currentloopcomplete', $event)"
    @error="onError"
    @finalloopcomplete="emit('finalloopcomplete', $event)"
    @load="emit('load', $event)"
    @startplay="emit('startplay', $event)"
  />



   <!-- <image
    :src="props.src"
    :class="props.class"
    :mode="fit"
    @tap="emit('tap', $event)"
    @currentloopcomplete="emit('currentloopcomplete', $event)"
    @error="emit('error', $event)"
    @finalloopcomplete="emit('finalloopcomplete', $event)"
    @load="emit('load', $event)"
    @startplay="emit('startplay', $event)"
  />  -->
</template>
