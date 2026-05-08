<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { useSafeArea } from '@/composables/useSafeArea';
import { cn } from '@/utils/appUtil';
import { computed, ref } from 'vue-lynx';

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
const { isWeb } = useBase();
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

const sheetTranslateY = ref(0);
const startY = ref(0);
const isDragging = ref(false);

const onTouchStart = (e: any) => {
  // ดึงพิกัด Y ที่นิ้วแตะจอครั้งแรก
  startY.value = e.touches[0].clientY;
  isDragging.value = true;
};

const onTouchMove = (e: any) => {
  if (!isDragging.value) return;

  const currentY = e.touches[0].clientY;
  const deltaY = currentY - startY.value;

  if (deltaY > 0) {
    sheetTranslateY.value = deltaY;
  }
};

const onTouchEnd = () => {
  isDragging.value = false;

  if (sheetTranslateY.value > 100) {
    handleClose(undefined);

    setTimeout(() => {
      sheetTranslateY.value = 0;
    }, 300);
  } else {
    sheetTranslateY.value = 0;
  }
};

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
    @bindrequestclose="onRequestClose"
    :bindrequestclose="onRequestClose"
    :requestclose="onRequestClose"
  >
    <view
      class="w-full h-full flex flex-col justify-end fade-in-animate"
      :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
      @tap="(e: any) => overlayTap(e)"
    >
      <view
        :class="
          cn(
            'relative w-full bg-card rounded-t-2xl pb-8 pt-3 px-4 flex flex-col slide-up-animate',
            props.class,
          )
        "
        :style="{
          transform: `translateY(${sheetTranslateY}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
        }"
        :catchtap="(e: any) => handleCatchTap(e)"
      >
        <view
          class="w-full flex justify-center py-4 -mt-2 mb-1"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
          :catchtap="(e: any) => handleCatchTap(e)"
        >
          <view class="w-12 h-1.5 bg-muted rounded-full" />
        </view>

        <view
          v-if="props.title || props.description"
          class="flex flex-col items-center mb-4 gap-1 px-4"
          :catchtap="(e: any) => handleCatchTap(e)"
        >
          <text v-if="props.title" class="text-base font-semibold text-center">
            {{ props.title }}
          </text>
          <text v-if="props.description" class="text-sm text-muted text-center">
            {{ props.description }}
          </text>
        </view>

        <view
          class="flex flex-col w-full gap-2"
          :catchtap="(e: any) => handleCatchTap(e)"
        >
          <slot />
        </view>
      </view>
    </view>
  </overlay>
</template>
