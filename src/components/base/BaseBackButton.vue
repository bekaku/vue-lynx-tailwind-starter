<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import type { BackButtonProps } from '@/types/props';
import { ArrowLeft } from 'lucide-static';
import BaseButton from './BaseButton.vue';
import BaseIcon from './BaseIcon.vue';

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
      <BaseIcon :name="ArrowLeft" />
    </template>
  </BaseButton>
</template>
