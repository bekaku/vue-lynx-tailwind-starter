<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import BaseButton from './BaseButton.vue';
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
  <BaseButton variant="ghost" :text-class="textClass" label="Back" @tab="onTab" />
</template>
