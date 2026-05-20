<script setup lang="ts">
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseToast from '@/components/base/BaseToast.vue';
import { useSafeArea } from '@/composables/useSafeArea';
import { computed, ref } from 'vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseItem from '@/components/base/BaseItem.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import { availableLocales, useLang } from '@/composables/useLang ';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import { CircleCheck } from 'lucide-static';
import type { AppLocale } from '@/types/common';

const { t, setLocale, locale } = useLang();
const onSwichLanguge = async (l: AppLocale) => {
  setLocale(l);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar :title="$t('base.language')" />
    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>{{ $t('base.chooseLanguge') }}</BaseCardTitle>
        </BaseCardHeader>

        <BaseCardContent>
          <BaseItem
            v-for="(lang, i) in availableLocales"
            :key="lang.iso"
            :title="lang.name"
            button
            :dense="false"
            :separator="i !== availableLocales.length - 1"
            @tap="onSwichLanguge(lang.iso)"
          >
            <template v-if="locale === lang.iso" #end>
              <BaseIcon
                :name="CircleCheck"
                color="#22c55e"
                :auto-dark="false"
              />
            </template>
          </BaseItem>
        </BaseCardContent>
      </BaseCard>
    </scroll-view>
  </view>
</template>
