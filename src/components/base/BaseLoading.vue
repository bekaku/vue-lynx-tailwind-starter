<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import { useSafeArea } from '@/composables/useSafeArea';
import { cn } from '@/utils/appUtil';
import { computed } from 'vue-lynx';
import BaseSpinner from './BaseSpinner.vue';

const props = withDefaults(
  defineProps<{
    visible: boolean;
    title?: string;
    description?: string;
    class?: any;
    clickoverlayhide?: boolean;
  }>(),
  {
    visible: false,
    clickoverlayhide: false,
  },
);

const emit = defineEmits<{
  'update:visible': [value: boolean];
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
  handleClose(e);
};
const handleClose = (e: any) => {
  emit('update:visible', false);
  emit('close', e);
};
const onOverlayTouch = (e: any) => {};
const onRequestClose = (e: any) => {
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
            'w-full max-w-sm rounded-xl p-6 flex flex-col  zoom-in-animate',
            props.class,
          )
        "
      >
        <view class="w-full flex flex-col justify-center items-center">
          <view class="mb-2">
            <BaseSpinner show />
          </view>
          <text v-if="props.title" class="text-lg font-semibold text-white mb-2">
            {{ props.title }}
          </text>
          <text v-if="props.description" class="text-sm text-white">
            {{ props.description }}
          </text>
        </view>

        <view
          v-if="$slots.default"
          :class="{ 'android-padding-fix': isAndroid }"
        >
          <slot />
        </view>
      </view>
    </view>
  </overlay>
</template>
