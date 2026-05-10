<template>
  <svg
    v-if="name"
    :content="svgRawString"
    :class="props.class"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
  ></svg>
</template>
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import type { IconProps } from '@/types/props';
import { computed } from 'vue';
const { isDark } = useTheme();
const props = withDefaults(defineProps<IconProps>(), {
  additionalReplce: '',
  iconSet: 'svg',
  size: 24,
  color: '#18181b',
  auto: true,
});

const svgRawString = computed(() => {
  let rawName = props.name || '';
  if (props.iconSet === 'svg') {
    let modifiedSvg = rawName;

    modifiedSvg = modifiedSvg.split('currentColor').join(props.auto && isDark.value ? '#fff' : props.color);

    modifiedSvg = modifiedSvg.replace(/fill="([^"]+)"/gi, (match, val) => {
      return val === 'none' ? match : `fill="${props.auto && isDark.value ? '#fff' : props.color}"`;
    });
    modifiedSvg = modifiedSvg.replace(/stroke="([^"]+)"/gi, (match, val) => {
      return val === 'none' ? match : `stroke="${props.auto && isDark.value ? '#fff' : props.color}"`;
    });

    modifiedSvg = modifiedSvg.replace(
      /width="([^"]+)"/i,
      `width="${props.size}"`,
    );
    modifiedSvg = modifiedSvg.replace(
      /height="([^"]+)"/i,
      `height="${props.size}"`,
    );

    return modifiedSvg;
  }
  let p: string[] = [];

  if (props.iconSet == 'quasar-bootstrap-icons') {
    //https://icons.getbootstrap.com/icons
    p = rawName
      .split('&&')
      .filter((t) => t)
      .map((t: string) =>
        t
          .split('|0 0 16 16')
          .join('')
          .split('@@fill:currentColor;')
          .join('')
          .split('fill-rule:evenodd;')
          .join(''),
      );
  } else if (props.iconSet == 'quasar-line-awesome') {
    // https://icons8.com/line-awesome
    const laIcon = rawName
      .split('|0 0 32 32')
      .join('')
      .split(props.additionalReplce)
      .join('');
    if (laIcon) p.push(laIcon);
  } else if (props.iconSet == 'quasar-mdi') {
     // https://pictogrammers.com/library/mdi/
    if (rawName) p.push(rawName);
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${props.size}" height="${props.size}" fill="${props.auto && isDark.value ? '#fff' : props.color}" viewBox="${getViewBox.value}">`;

  if (p.length > 0) {
    for (const ic of p) {
      svg += `<path d="${ic}" />`;
    }
  }

  svg += `</svg>`;

  return svg;
});
const getViewBox = computed(() => {
  if (props.iconSet == 'quasar-bootstrap-icons') return '0 0 16 16';
  if (props.iconSet == 'quasar-line-awesome') return '0 0 32 32';
  if (props.iconSet == 'quasar-mdi') return '0 0 24 24';
  return '0 0 24 24';
});
</script>
