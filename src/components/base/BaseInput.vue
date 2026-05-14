<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import { cn } from '@/utils/appUtil';
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    disabled?: boolean;
    id?: string;
    class?: string;
    inputClass?: string;
    confirmType?: 'search' | 'send' | 'go' | 'done' | 'next';
    inputFilter?: string;
    iosAutoCorrect?: boolean;
    iosSpellCheck?: boolean;
    label?: string;
    maxlength?: number;
    placeholder?: string;
    readonly?: boolean;
    border?: boolean;
    transparent?: boolean;
    showSoftInputOnFocus?: boolean;
    type?: 'number' | 'text' | 'digit' | 'password' | 'tel' | 'email';
  }>(),
  {
    confirmType: 'send',
    modelValue: '',
    disabled: false,
    iosAutoCorrect: true,
    iosSpellCheck: true,
    readonly: false,
    maxlength: 140,
    showSoftInputOnFocus: true,
    type: 'text',
    border: false,
    transparent: false,
  },
);
const emit = defineEmits<{
  'update:modelValue': [value: string];
  tap: [value: boolean, event: any];
  blur: [event: any];
  confirm: [event: any];
  focus: [event: any];
  input: [event: any];
  selection: [event: any];
}>();
const { isDark } = useTheme();
const isFocused = ref(false);

const appInputRef = useTemplateRef<any>('appInputRef');
// onMounted(() => {
//   console.log('appInputRef', appInputRef.value);
//  if (appInputRef.value && props.modelValue) {
//     console.log('setValue', props.modelValue);
//   }
// });
const handleInput = (e: any) => {
  const currentValue = e.detail.value.trim();
  emit('update:modelValue', currentValue);
  emit('input', e);
};
const handleFocus = (e: any) => {
  console.log('handleFocus', e);
  isFocused.value = true;
  emit('focus', e);
};

const handleBlur = (e: any) => {
  isFocused.value = false;
  emit('blur', e);
};

const blur = async () => {
  console.log('BaseInput.vue > blur');
  await nextTick();
  if (appInputRef.value) {
    appInputRef.value
      .invoke({
        method: 'blur',
      })
      .exec();
  }
};
const focus = async () => {
  console.log('BaseInput.vue > focus');
  await nextTick();
  if (appInputRef.value) {
    appInputRef.value
      .invoke({
        method: 'focus',
      })
      .exec();
  }
};
defineExpose({
  blur,
  focus,
});
</script>
<template>
  <view :class="cn('flex flex-col w-full gap-1.5', props.class)">
    <text
      v-if="label"
      :class="
        cn(
          'text-sm font-medium leading-none',
          props.disabled ? 'opacity-70' : '',
        )
      "
    >
      {{ label }}
    </text>

    <view
      :class="
        cn(
          'flex flex-row items-center w-full h-10 rounded-lg   px-2 py-2 gap-2 text-sm transition-all shadow-sm',
          !transparent ? 'bg-input' : 'bg-transparent',
          border ? 'border border-inputborder' : '',
          isFocused ? 'border-primary ring-1 ring-primary' : '',
          props.disabled ? 'opacity-50 cursor-not-allowed' : '',
        )
      "
    >
      <slot v-if="$slots.start" name="start" />

      <input
        ref="appInputRef"
        :class="
          cn(
            'flex-1 h-full bg-transparent border-none outline-none p-0 placeholder:text-muted',
            !isDark ? 'text-zinc-900' : 'text-zinc-200',
            props.inputClass,
          )
        "
        :disabled="disabled"
        :placeholder="placeholder"
        :value="modelValue"
        :type="type"
        :confirmType="confirmType"
        :maxlength="maxlength"
        :readonly="readonly"
        :showSoftInputOnFocus="showSoftInputOnFocus"
        :iosAutoCorrect="iosAutoCorrect"
        :iosSpellCheck="iosSpellCheck"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @confirm="emit('confirm', $event)"
      />

      <slot v-if="$slots.end" name="end" />
    </view>
    <view v-if="$slots.bottom" class="mt-0.5">
      <slot name="bottom" />
    </view>
  </view>
</template>
