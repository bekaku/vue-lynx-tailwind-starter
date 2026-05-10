<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { useSafeArea } from '@/composables/useSafeArea';
import { cn } from '@/utils/appUtil';
import { computed } from 'vue-lynx';
import BaseButton from './BaseButton.vue';
import BaseToolBar from './BaseToolBar.vue';

const props = withDefaults(
  defineProps<{
    visible: boolean;
    clickoverlayhide?: boolean;
    title?: string;
    description?: string;
    class?: any;
  }>(),
  {
    visible: false,
    clickoverlayhide: true,
  },
);
const { isWeb } = useDevice();
const { safeAreaBottom } = useSafeArea();
const getOverlayStyle = computed(() => {
  if (!isWeb) {
    return { position: 'fixed', paddingBottom: safeAreaBottom + 'px' };
  }
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    paddingBottom: safeAreaBottom + 'px',
    zIndex: 100,
  };
});
const emit = defineEmits<{
  'update:visible': [value: boolean];
  close: [e: any];
  dismiss: [e: any];
  requestclose: [e: any];
  showoverlay: [e: any];
}>();


const handleClose = (e: any) => {
  console.log('BaseActionSheet.vue > handleClose');
  emit('update:visible', false);
  emit('close', e);
};
const overlayTap = (e: any) => {
  if (!props.clickoverlayhide) {
    return;
  }
  console.log('BaseActionSheet.vue > overlayTap');
  handleClose(e);
};
const onDismiss = (e: any) => {
  console.log('BaseActionSheet.vue > onDismiss');
  emit('dismiss', e);
};
const onShow = (e: any) => {
  console.log('BaseActionSheet.vue > onShow');
  emit('showoverlay', e);
};
const onOverlayTouch = (e: any) => {
  console.log('BaseActionSheet.vue > onOverlayTouch');
};
const onRequestClose = (e: any) => {
  console.log('BaseActionSheet.vue > onRequestClose');
  emit('requestclose', e);
};
const handleCatchTap = (e: any) => {
  console.log('BaseActionSheet.vue > handleCatchTap');
};
</script>

<template>
  <overlay
    v-if="props.visible"
    :visible="props.visible"
    :class="!props.visible ? 'hidden' : ''"
    :style="getOverlayStyle"
    @dismissoverlay="onDismiss"
    @showoverlay="onShow"
    @overlaytouch="onOverlayTouch"
    @requestclose="onRequestClose"
  >
    <view
      :class="
        cn(
          'absolute top-0 left-0 w-full h-full bg-background flex flex-col slide-up-fullscreen-animate',
          props.class,
        )
      "
    >
      <BaseToolBar :title="props.title">
        <template #start>
          <slot name="start">
            <BaseButton variant="ghost" label="Close" @tap="handleClose"/>
          </slot>
        </template>
        <template #end>
          <slot name="end" />
        </template>
      </BaseToolBar>

      <scroll-view class="flex-1 w-full" scroll-y>
        <view class="p-4 flex flex-col gap-4 pb-10 bg-card">
          <slot />
        </view>
      </scroll-view>
    </view>
  </overlay>
</template>
