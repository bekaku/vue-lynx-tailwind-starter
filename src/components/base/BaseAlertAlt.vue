<script setup lang="ts">
import { cn } from '@/utils/appUtil';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    message?: string;
    type?:
      | 'is-primary'
      | 'is-link'
      | 'is-info'
      | 'is-success'
      | 'is-warning'
      | 'is-danger'
      | 'is-light';
    dense?: boolean;
    radius?: boolean;
    closeable?: boolean;
    secondary?: boolean;
    class?: any;
  }>(),
  {
    type: 'is-light',
    dense: false,
    radius: true,
    closeable: true,
    secondary: false,
  },
);
const show = ref(true);
</script>
<template>
  <view
    v-show="show"
    :class="
      cn(
        'v-notification',
        `${props.type} ${props.secondary ? 'is-light' : ''}`,
        props.dense ? 'p-1' : 'p-2',
        props.radius ? 'rounded-lg' : '',
        props.class,
      )
    "
  >
    <view class="p-2 flex flex-row flex-wrap items-center gap-1">
      <slot name="start" />
      <slot>
        <text>
          {{ props.message ? props.message : '' }}
        </text>
      </slot>
      <slot name="end" />
    </view>
  </view>
</template>
