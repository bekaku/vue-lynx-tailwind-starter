<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { useSafeArea } from '@/composables/useSafeArea';
import { cn } from '@/utils/appUtil';
import { computed } from 'vue';
import BaseButton from './BaseButton.vue';

const props = withDefaults(
  defineProps<{
    visible: boolean;
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    variant?: 'default' | 'destructive'; // 🌟 กำหนด Variant 2 แบบ
    class?: any;
    clickoverlayhide?: boolean;
  }>(),
  {
    visible: false,
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    variant: 'default',
    clickoverlayhide: false,
  },
);

const emit = defineEmits<{
  'update:visible': [value: boolean];
  cancel: [];
  confirm: [];
  close: [e: any];
  dismiss: [e: any];
  requestclose: [e: any];
  showoverlay: [e: any];
}>();
const { isWeb, isAndroid } = useDevice();
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
const handleCancel = () => {
  emit('update:visible', false);
  emit('cancel');
};

const handleConfirm = () => {
  emit('update:visible', false);
  emit('confirm');
};
const onDismiss = (e: any) => {
  console.log('BaseActionSheet.vue > onDismiss');
  emit('dismiss', e);
};
const onShow = (e: any) => {
  console.log('BaseActionSheet.vue > onShow');
  emit('showoverlay', e);
};
const overlayTap = (e: any) => {
  if (!props.clickoverlayhide) {
    return;
  }
  console.log('BaseActionSheet.vue > overlayTap');
  handleClose(e);
};
const handleClose = (e: any) => {
  console.log('BaseActionSheet.vue > handleClose');
  emit('update:visible', false);
  emit('close', e);
};
const onOverlayTouch = (e: any) => {
  console.log('BaseActionSheet.vue > onOverlayTouch');
};
const onRequestClose = (e: any) => {
  console.log('BaseActionSheet.vue > onRequestClose');
  emit('requestclose', e);
};
</script>

<template>
  <overlay
    v-if="props.visible"
    :visible="props.visible"
    :style="getOverlayStyle"
    @dismissoverlay="onDismiss"
    @showoverlay="onShow"
    @overlaytouch="onOverlayTouch"
    @requestclose="onRequestClose"
  >
    <view
      class="absolute top-0 left-0 w-full h-full flex justify-center items-center fade-in-animate px-6"
      :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
    >
      <view
        :class="
          cn(
            'w-full max-w-sm bg-card rounded-xl border border-border p-6 flex flex-col zoom-in-animate',
            props.class,
          )
        "
      >
        <text v-if="props.title" class="text-lg font-semibold mb-2">
          {{ props.title }}
        </text>
        <text v-if="props.description" class="text-sm text-muted mb-6">
          {{ props.description }}
        </text>
        <view :class="{ 'android-padding-fix': isAndroid }">
          <slot />
        </view>
        <view class="flex flex-row justify-end gap-3 mt-2 w-full">
          <BaseButton
            variant="secondary"
            :label="props.cancelText"
            @tap="handleCancel"
          />

          <BaseButton
            :variant="
              props.variant === 'destructive' ? 'destructive' : 'default'
            "
            :label="props.confirmText"
            @tap="handleCancel"
          />
        </view>
      </view>
    </view>
  </overlay>
</template>
