<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { useTheme } from '@/composables/useTheme';
import { cn } from '@/utils/appUtil';

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    visible: boolean;
    class?: any;
  }>(),
  {
    visible: false,
  },
);

const emit = defineEmits<{
  'update:visible': [value: boolean];
  'update:modelValue': [value: string];
}>();
const { isDark } = useTheme();
const { isAndroid } = useBase();

/*<BaseDialog v-model:visible="isOpen"> */
const handleModelName = (e: any) => {
  emit('update:visible', false);
};

/*<BaseInput v-model="inputNumber"/>*/
const handleModelValue = (e: any) => {
  const currentValue = e.detail.value.trim();
  emit('update:modelValue', currentValue);
};
const handleTap = (e: any) => {};
const handleCatchTap = (e: any) => {};


/*
How to access to a child method from the parent

//call from parent
const childComponentRef = ref()
const childComponentRef = useTemplateRef<InstanceType<typeof ChildComponent>>('childComponentRef')
 childComponentRef.value.onTestClickFromParent()
<template>
    <ChildComponent ref="childComponentRef" />
</template>
 */
defineExpose({
  handleTap
});
</script>
<template>
  <view
    :class="
      cn(
        'flex flex-col items-center w-full border border-border bg-card',
        !isDark ? 'bg-zinc-100' : 'bg-zinc-800',
        props.class,
      )
    "
    @tap="handleTap"
  >
    <slot v-if="$slots.start" name="start" />
    <view :catchtap="handleCatchTap" :class="$style.card"></view>
    <view :class="[$style.card, isAndroid ? 'android-padding-fix' : '']"></view>
  </view>
</template>

<style module>
.card {
  background: #fff;
}
</style>
