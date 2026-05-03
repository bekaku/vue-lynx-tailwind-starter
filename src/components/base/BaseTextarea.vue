<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import { cn } from '@/utils/appUtil';
import { nextTick, onMounted, ref, useTemplateRef } from 'vue-lynx';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    disabled?: boolean;
    id?: string;
    class?: string;
    textareaClass?: string;
    confirmType?: 'search' | 'send' | 'go' | 'done' | 'next';
    inputFilter?: string;
    iosAutoCorrect?: boolean;
    iosSpellCheck?: boolean;
    label?: string;
    maxlength?: number;
    placeholder?: string;
    readonly?: boolean;
    showSoftInputOnFocus?: boolean;
    type?: 'number' | 'text' | 'digit' | 'password' | 'tel' | 'email';
    bounces?: boolean;
    enableScrollBar?: boolean;
    lineSpacing?: number | any | any;
    maxlines?: number;
  }>(),
  {
    confirmType: 'send',
    modelValue: '',
    disabled: undefined,
    iosAutoCorrect: true,
    iosSpellCheck: true,
    readonly: undefined,
    maxlength: 140,
    showSoftInputOnFocus: true,
    type: 'text',
    bounces: true,
    enableScrollBar: false,
  },
);
const emit = defineEmits<{
  'update:modelValue': [value: string];
  tab: [value: boolean, event: any];
  blur: [event: any];
  confirm: [event: any];
  focus: [event: any];
  input: [event: any];
  selection: [event: any];
}>();
const { isDark } = useTheme();
const isFocused = ref(false);
const appTextareaRef = useTemplateRef<any>('appTextareaRef');
onMounted(async () => {
  await nextTick();
  // console.log('appTextareaRef', appTextareaRef.value);
  // if (appTextareaRef.value && props.modelValue) {
  //   console.log('setValue', props.modelValue);
  //   appTextareaRef.value.invoke('setValue', props.modelValue);
  // }
});
const handleInput = (e: any) => {
  console.log('handleInput', e);
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
          'flex flex-col w-full rounded-lg bg-input border text-sm transition-all p-2',
          'border-inputborder',
          isFocused ? 'border-primary ring-1 ring-primary' : '',
          props.disabled ? 'opacity-50 cursor-not-allowed' : '',
        )
      "
    >
      <textarea
        ref="appTextareaRef"
        :class="
          cn(
            'flex-1 min-h-[80px] bg-transparent border-0 border-none outline-none placeholder:text-muted-foreground text-sm',
            'focus:outline-none focus:ring-0 focus:border-transparent',
            !isDark ? 'text-zinc-900' : 'text-zinc-200',
            props.textareaClass,
          )
        "
        style="border: none; outline: none; box-shadow: none"
        :type="props.type"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        :maxlength="props.maxlength"
        :bounces="props.bounces"
        :enableScrollBar="props.enableScrollBar"
        :lineSpacing="props.lineSpacing"
        :maxlines="props.maxlines"
        :inputFilter="props.inputFilter"
        :iosAutoCorrect="props.iosAutoCorrect"
        :iosSpellCheck="props.iosSpellCheck"
        :showSoftInputOnFocus="props.showSoftInputOnFocus"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @confirm="emit('confirm', $event)"
      />
    </view>

    <view v-if="$slots.bottom" class="mt-0.5">
      <slot name="bottom" />
    </view>
  </view>
</template>
