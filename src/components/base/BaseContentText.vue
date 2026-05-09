<script setup lang="ts">
import { computed } from 'vue';

import { cleanUrl, stripHtml } from '@/utils/appUtil';
import { useBase } from '@/composables/useBase';

const props = defineProps<{
  content: string;
  class?: any;
}>();
const { openExternalUri } = useBase();
const parsedContent = computed(() => {
  const rawHtml = props.content || '';

  const regex =
    /(<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>)|(https?:\/\/[^\s<]+[^.,;?!\s<])/gi;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(rawHtml)) !== null) {
    if (match.index > lastIndex) {
      const textBefore = rawHtml.slice(lastIndex, match.index);
      const cleanText = stripHtml(textBefore);
      if (cleanText) parts.push({ type: 'text', content: cleanText });
    }

    if (match[1]) {
      const rawUrl = match[2];
      const url = cleanUrl(rawUrl);
      const cleanLinkText = stripHtml(match[3]);
      parts.push({ type: 'link', url: url, content: cleanLinkText || url });
    } else {
      const rawUrl = match[0];
      const url = cleanUrl(rawUrl);
      parts.push({ type: 'link', url: url, content: url });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < rawHtml.length) {
    const textAfter = rawHtml.slice(lastIndex);
    const cleanText = stripHtml(textAfter);
    if (cleanText) parts.push({ type: 'text', content: cleanText });
  }

  return parts;
});

const handleLinkTap = (url: string | undefined) => {
  if (!url) {
    return;
  }
  if (typeof window !== 'undefined') {
    // รันบน Browser
    window.open(url, '_blank');
  } else {
    console.log('Open link Native:', url);
    openExternalUri(url);
  }
};
</script>

<template>
  <text class="flex-wrap" :class="props.class" :style="{ lineHeight: '1.5em' }">
    <template v-for="(part, index) in parsedContent" :key="index">
      <text
        v-if="part.type === 'link'"
        class="text-primary font-medium active:opacity-70"
        @tap.stop="handleLinkTap(part.url)"
      >
        {{ part.content }}
      </text>

      <text v-else>
        {{ part.content }}
      </text>
    </template>
  </text>
</template>
