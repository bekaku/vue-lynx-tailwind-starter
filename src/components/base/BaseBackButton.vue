<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import type { BackButtonProps } from '@/types/props';
import { ArrowLeft } from 'lucide-static';
import BaseButton from './BaseButton.vue';
import BaseIcon from './BaseIcon.vue';
import { useDevice } from '@/composables/useDevice';

const { onNavigateTo, onBack } = useBase();
const props = withDefaults(defineProps<BackButtonProps>(), {
  textClass: 'text-primary',
});
const { isIos } = useDevice();
const onTab = () => {
  if (props.defaultHref) {
    onNavigateTo('/');
  } else {
    onBack();
  }
};
</script>

<template>
  <BaseButton
    variant="ghost"
    size="icon"
    rounded
    :label="isIos ? 'Back' : undefined"
    :text-class="textClass"
    @tap="onTab"
  >
    <template v-if="!isIos" #start>
      <BaseIcon :name="ArrowLeft" />
    </template>
  </BaseButton>
</template>
