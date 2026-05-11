<template>
  <view class="flex flex-col w-full">
    <slot
      :is-expanded="isExpanded"
      :text-styles="textStyles"
      :text-maxline="!isExpanded ? Number(rows) : -1"
    >
      <text
        class="leading-normal"
        :style="textStyles"
        :text-maxline="!isExpanded ? Number(rows) : -1"
      >
        {{ content }}
      </text>
    </slot>

    <view
      v-if="showMore && isOverflowing"
      class="self-start active:opacity-70"
      :class="isAndroid ? 'mt-[-10px]' : 'mt-[4px]'"
      @tap="toggleExpand"
    >
      <text class="text-sm font-semibold text-primary">
        {{ isExpanded ? collapseText : expandText }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useDevice } from '@/composables/useDevice';
import type { TextEllipsisProps } from '@/types/props';
import { ref, computed } from 'vue';

const emit = defineEmits<{
  'on-change': [v: boolean];
}>();
const { isAndroid } = useDevice();
// Define props with default values to match your required usage
const props = withDefaults(defineProps<TextEllipsisProps>(), {
  rows: -1,
  expandText: 'Read more',
  collapseText: 'Show less',
  charsPerLine: 55,
  showMore: false,
});

const isExpanded = ref(false);

/**
 * Generates the CSS required for the native engine to truncate the text.
 * When expanded, we simply remove these constraints.
 */
const textStyles = computed(() => {
  if (isExpanded.value) return {};

  return {
    // Standard native text truncation
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    // Provide both standard and webkit versions for maximum compatibility
    // across different Lynx core versions, ensuring it stays as a string.
    lineClamp: String(props.rows),
    WebkitLineClamp: String(props.rows),
    lineHeight: '1.5em'
  };
});

/**
 * Determines whether to show the Expand/Collapse button.
 * Since native engines cannot easily measure text height synchronously without lagging,
 * we use a mathematical heuristic based on string length.
 */
const isOverflowing = computed(() => {
  if (!props.content) return false;
  const rowsNum = Number(props.rows);
  if (rowsNum <= 0) {
    return false;
  }
  // Assume an average of 40 characters can fit on one single line on a mobile screen.
  // You can adjust this '40' up or down depending on your specific font-size and padding.
  const maxAllowedChars = rowsNum * Number(props.charsPerLine);

  return props.content.length > maxAllowedChars;
});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
  emit('on-change', isExpanded.value);
};
</script>
