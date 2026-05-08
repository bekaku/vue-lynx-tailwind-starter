<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { cn } from '@/utils/appUtil';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    class?: any;
    contentClass?: any;
  }>(),
  {
    position: 'bottom-left',
  },
);
const { isAndroid } = useDevice();
const isVisible = ref(false);

const toggle = () => {
  isVisible.value = !isVisible.value;
};

const close = () => {
  isVisible.value = false;
};

const preventClose = () => {};

const getPositionStyle = (pos: string) => {
  switch (pos) {
    case 'bottom-right':
      return { top: '100%', right: 0, marginTop:  !isAndroid ? '8px' : '-4px' };
    case 'top-left':
      return { bottom: '100%', left: 0, marginBottom:  !isAndroid ? '8px' : '-4px' };
    case 'top-right':
      return { bottom: '100%', right: 0, marginBottom:  !isAndroid ? '8px' : '-4px' };
    case 'bottom-left':
    default:
      return { top: '100%', left: 0, marginTop: !isAndroid ? '8px' : '-4px' };
  }
};
</script>

<template>
  <view :class="cn('relative flex flex-col self-start overflow-visible', props.class)">
    
    <view class="self-start" @tap="toggle" :class="isAndroid ? 'py-[-14px]' : ''">
      <slot name="trigger" :isOpen="isVisible" /> 
    </view>

    <view 
      v-if="isVisible" 
      class="fixed top-0 left-0 w-full h-full z-40" 
      :catchtap="close" 
    />
    
    <view 
      v-if="isVisible" 
      :class="cn(
        'absolute z-50 bg-card rounded-md border border-border shadow-lg px-2 flex flex-col w-max h-max min-h-[75px] shrink-0 zoom-in-animate', 
        isAndroid ? 'py-[-4px]' : 'py-2',
        props.contentClass
      )"
      :style="getPositionStyle(props.position)"
      style="max-width: 80vw;"
      :catchtap="preventClose"
    >
      <slot :close="close" />
    </view>

  </view>
</template>