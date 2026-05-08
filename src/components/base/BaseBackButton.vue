<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import BaseButton from './BaseButton.vue';
import type { BackButtonProps } from '@/types/props';
import IconLucide from '../IconLucide.vue';

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
  <BaseButton variant="ghost" size="icon" rounded :text-class="textClass" @tap="onTab">
    <template #start>
      <IconLucide name="arrowLeft" />
    </template>
  </BaseButton>
</template>
