<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import Button from './Button.vue';
import type { BackButtonProps } from '@/types/props';

const { onNavigateTo, onBack } = useBase();
const props = withDefaults(defineProps<BackButtonProps>(), {
  textClass: 'text-primary',
});

const onTab = () => {
  if (props.defaultHref) {
    onNavigateTo('/');
  } else {
    onBack();
  }
};
</script>

<template>
  <Button variant="ghost" :text-class="textClass" label="Back" @tab="onTab" />
</template>
