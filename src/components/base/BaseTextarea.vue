<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import { cn } from '@/utils/appUtil';
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';

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
    maxlength?: number | undefined;
    placeholder?: string;
    readonly?: boolean;
    showSoftInputOnFocus?: boolean;
    type?: 'number' | 'text' | 'digit' | 'password' | 'tel' | 'email';
    bounces?: boolean;
    enableScrollBar?: boolean;
    lineSpacing?: number | any | any;
    maxlines?: number;
    transparent?: boolean;
    border?: boolean;
    autoGrow?: boolean;
    dense?: boolean;
  }>(),
  {
    confirmType: 'send',
    modelValue: '',
    disabled: undefined,
    iosAutoCorrect: true,
    iosSpellCheck: true,
    readonly: undefined,
    maxlength: 255,
    showSoftInputOnFocus: true,
    type: 'text',
    bounces: true,
    enableScrollBar: false,
    lineSpacing: undefined,
    maxlines: 20,
    transparent: false,
    border: false,
    autoGrow: false,
    dense: false,
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
const appTextareaRef = useTemplateRef<any>('appTextareaRef');

const val = ref(props.modelValue);
onMounted(async () => {
  await nextTick();
});
const onSetValue = async (val: string) => {
  await nextTick();
  if (appTextareaRef.value) {
    appTextareaRef.value
      .invoke({
        method: 'setValue',
        params: {
          value: val,
        },
        // success: (res: any) => {
        //   console.log('setValue success!');
        // },
        // fail: (err: any) => {
        //   console.error('setValue error:', err);
        // },
      })
      .exec();
  }
};
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

watch(
  val,
  (newValue, oldValue) => {
    if (newValue) {
      onSetValue(newValue);
    }
  },
  { once: true, immediate: true },
);

defineExpose({
  onSetValue,
});
</script>
<template>
  <view :class="cn('flex flex-col w-full gap-1.5', props.class)">
    <text
      v-if="label"
      :class="
        cn(
          'app-text text-sm font-medium leading-none',
          props.disabled ? 'opacity-70' : '',
        )
      "
    >
      {{ label }}
    </text>

    <view
      :class="
        cn(
          'flex flex-col w-full rounded-lg   text-sm transition-all',
          border ? 'border border-inputborder' : '',
          !dense ? 'p-2' : 'p-0',
          !transparent ? 'bg-input' : 'bg-transparent',
          isFocused ? 'border-primary ring-1 ring-primary' : '',
          props.disabled ? 'opacity-50 cursor-not-allowed' : '',
        )
      "
    >
      <textarea
        ref="appTextareaRef"
        :class="
          cn(
            'flex-1 bg-transparent border-0 border-none outline-none placeholder:text-muted-foreground text-sm',
            !autoGrow ? 'min-h-[80px]' : 'min-h-[20px]',
            'focus:outline-none focus:ring-0 focus:border-transparent',
            !isDark ? 'text-zinc-900' : 'text-zinc-200',
            props.textareaClass,
          )
        "
        style="border: none; outline: none; box-shadow: none"
        :value="props.modelValue"
        :type="props.type"
        :maxlength="props.maxlength"
        :placeholder="props.placeholder"
        :bounces="props.bounces"
        :enableScrollBar="props.enableScrollBar"
        :lineSpacing="props.lineSpacing"
        :maxlines="props.maxlines"
        :inputFilter="props.inputFilter"
        :iosAutoCorrect="props.iosAutoCorrect"
        :iosSpellCheck="props.iosSpellCheck"
        :showSoftInputOnFocus="props.showSoftInputOnFocus"
        :auto-height="props.autoGrow"
        :bindinput="handleInput"
      />
    </view>

    <view v-if="$slots.bottom" class="mt-0.5">
      <slot name="bottom" />
    </view>
  </view>
</template>
