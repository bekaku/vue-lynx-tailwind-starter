<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseImage from '@/components/base/BaseImage.vue';
import BaseItem from '@/components/base/BaseItem.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import { useDevice } from '@/composables/useDevice';
import { useScrollRestore } from '@/composables/useScrollRestore';
import { useTheme } from '@/composables/useTheme';
import type { LabelValue } from '@/types/common';
import {
  AppWindow,
  ArrowLeftRight,
  BadgeCheck,
  Bell,
  Brush,
  ChartArea,
  ChevronRight,
  Columns2,
  Columns3,
  CreditCard,
  Database,
  Earth,
  Form,
  GalleryHorizontal,
  Grid2X2,
  HandMetal,
  Image,
  ImagePlus,
  Inbox,
  Info,
  Languages,
  List,
  Loader,
  LogIn,
  MessageCircle,
  PictureInPicture2,
  Pointer,
  RefreshCcw,
  Rows3,
  Search,
  Server,
  Square,
  SquaresSubtract,
  SquaresUnite,
  SunMoon,
  TextCursor,
  Users,
} from 'lucide-static';
import logoBlack from '@/assets/logo-black.png';
import logoWhite from '@/assets/logo-white.png';
import {
  computed,
  onActivated,
  onDeactivated,
  onMounted,
  ref,
  useTemplateRef,
} from 'vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseCardDescription from '@/components/base/BaseCardDescription.vue';
import { useLang } from '@/composables/useLang ';
import BasePage from '@/components/base/BasePage.vue';
const { scrollTop, onScroll } = useScrollRestore();
const { isDark } = useTheme();
const { setLocale, locale, t, currenLocaleItem } = useLang();
const { platform } = useDevice();
const themeToggleRef = useTemplateRef<any>('themeToggleRef');
const longpress = ref(false);
const globalProps = lynx.__globalProps;
const menuItems = ref<LabelValue<any>[]>([
  {
    label: 'Action Sheet',
    to: '/action-sheet',
    icon: { name: Rows3, size: 18 },
    value: 'component',
  },
  {
    label: 'Alert',
    to: '/alert',
    icon: { name: Info, size: 18 },
    value: 'component',
  },
  {
    label: 'Badge',
    to: '/badge',
    icon: { name: Info, size: 18 },
    value: 'component',
  },
  {
    label: 'Button',
    to: '/button',
    icon: { name: Square, size: 18 },
    value: 'component',
  },
  {
    label: 'Chat',
    to: '/chat',
    icon: { name: MessageCircle, size: 18 },
    value: 'example',
  },
  {
    label: 'Card',
    to: '/card',
    icon: { name: CreditCard, size: 18 },
    value: 'component',
  },
  {
    label: 'Confirm dialog',
    to: '/confirm-dialog',
    icon: { name: SquaresUnite, size: 18 },
    value: 'component',
  },
  {
    label: 'Dialog',
    to: '/dialog',
    icon: { name: SquaresUnite, size: 18 },
    value: 'component',
  },
  {
    label: 'Echarts',
    to: '/echarts',
    icon: { name: ChartArea, size: 18 },
    value: 'example',
  },
  {
    label: 'Event modifier',
    to: '/event-modifier',
    icon: { name: Pointer, size: 18 },
    value: 'example',
  },
  {
    label: 'Fetch data',
    to: '/fetch-data',
    icon: { name: Server, size: 18 },
    value: 'example',
  },
  {
    label: 'Grid',
    to: '/grid',
    icon: { name: Grid2X2, size: 18 },
    value: 'component',
  },
  {
    label: 'Icons',
    to: '/icons',
    icon: { name: HandMetal, size: 18 },
    value: 'component',
  },
  {
    label: 'Image',
    to: '/image',
    icon: { name: Image, size: 18 },
    value: 'component',
  },
  {
    label: 'Image picker',
    to: '/image-picker',
    icon: { name: ImagePlus, size: 18 },
    value: 'component',
  },
  {
    label: 'Inifinite Load',
    to: '/inifinite-load',
    icon: { name: List, size: 18 },
    value: 'example',
  },
  {
    label: 'Input',
    to: '/input',
    icon: { name: TextCursor, size: 18 },
    value: 'component',
  },
  {
    label: 'Item',
    to: '/item',
    icon: { name: Form, size: 18 },
    value: 'component',
  },
  {
    label: 'Loading',
    to: '/loading',
    icon: { name: Loader, size: 18 },
    value: 'component',
  },
  {
    label: 'Login',
    to: '/auth',
    icon: { name: LogIn, size: 18 },
    value: 'example',
  },
  {
    label: 'List',
    to: '/list',
    icon: { name: List, size: 18 },
    value: 'example',
  },
  {
    label: 'List column',
    to: '/list-column',
    icon: { name: Columns2, size: 18 },
    value: 'example',
  },
  {
    label: 'List waterfall',
    to: '/list-waterfall',
    icon: { name: Columns3, size: 18 },
    value: 'example',
  },
  {
    label: 'Keep alive',
    to: '/keepalive',
    icon: { name: AppWindow, size: 18 },
    value: 'example',
  },
  {
    label: 'Native LocalStorage',
    to: '/native-local-storage',
    icon: { name: Database, size: 18 },
    value: 'example',
  },
  {
    label: 'Notfound',
    to: '/not-foudn',
    icon: { name: Inbox, size: 18 },
    value: 'example',
  },
  {
    label: 'Popover',
    to: '/popover',
    icon: { name: PictureInPicture2, size: 18 },
    value: 'component',
  },
  {
    label: 'Pull to refresh',
    to: '/pull-to-refresh',
    icon: { name: RefreshCcw, size: 18 },
    value: 'example',
  },
  {
    label: 'Users',
    to: '/user-list',
    icon: { name: Users, size: 18 },
    value: 'example',
  },
  {
    label: 'Skeleton',
    to: '/skeleton',
    icon: { name: Loader, size: 18 },
    value: 'component',
  },
  {
    label: 'Scroll view',
    to: '/scroll-view',
    icon: { name: GalleryHorizontal, size: 18 },
    value: 'example',
  },
  {
    label: 'Stores',
    to: '/store',
    icon: { name: Database, size: 18 },
    value: 'example',
  },
  {
    label: 'Tailwind CSS',
    to: '/tailwind',
    icon: { name: Brush, size: 18 },
    value: 'example',
  },
  {
    label: 'Tabs Route',
    to: '/tabs-route',
    icon: { name: AppWindow, size: 18 },
    value: 'example',
  },
  {
    label: 'Tabs Keepalive',
    to: '/tabs-keepalive',
    icon: { name: AppWindow, size: 18 },
    value: 'example',
  },
  {
    label: 'Text ellipsis',
    to: '/text-ellipsis',
    icon: { name: TextCursor, size: 18 },
    value: 'component',
  },
  {
    label: 'Toast',
    to: '/toast',
    icon: { name: SquaresSubtract, size: 18 },
    value: 'component',
  },
  {
    label: 'Transition',
    to: '/transition',
    icon: { name: ArrowLeftRight, size: 18 },
    value: 'component',
  },
]);

const getComponentItems = computed(() => {
  return menuItems.value.filter((item) => item.value === 'component');
});
const getExampletItems = computed(() => {
  return menuItems.value.filter((item) => item.value === 'example');
});
onMounted(() => {
  // const info = lynx.getSystemInfoSync();
  console.log('index.vue > onMounted', {globalProps, SystemInfo});
});
onActivated(() => {
  console.log('index.vue > onActivated');
});

onDeactivated(() => {
  console.log('index.vue > onDeactivated');
});
const handleTheme = (e: any) => {
  console.log('index.vue > handleTheme', e);
  if (themeToggleRef.value) {
    themeToggleRef.value.onToggleTheme(!isDark.value);
  }
};
const handleLongpress = (e: any) => {
  longpress.value = !longpress.value;
  console.log('index.vue > handleLongpress', e);
};

const toggleLanguage = () => {
  console.log('index.vue > toggleLanguage', locale.value);
  setLocale(locale.value === 'en' ? 'th' : 'en');
};
</script>

<template>
  <BasePage>
    <!-- <view class="w-full h-full flex flex-col bg-background"> -->
    <BaseToolBar
      :show-back-button="false"
      :title="$t('app.home')"
      title-left
      :border="false"
    >
      <template #start>
        <BaseImage
          :src="!isDark ? logoBlack : logoWhite"
          :style="{ width: '32px', height: '32px' }"
          fit="scaleToFill"
          class="mr-3"
        />
      </template>
      <template #end>
        <view class="flex flex-row gap-1.5 pr-2 items-center">
          <BaseButton variant="ghost" rounded size="icon" class="h-8 w-8">
            <BaseIcon :name="Search" :size="24" />
          </BaseButton>

          <view class="flex flex-col gap-2 items-center">
            <BaseIcon :name="Bell" :size="24" />
            <BaseBadge
              variant="destructive"
              class="absolute -top-1 -right-1 p-0"
              :style="{ width: '18px', height: '18px' }"
            >
              <text class="text-white text-xs"> 9 </text>
            </BaseBadge>
          </view>
        </view>
      </template>
    </BaseToolBar>
    <scroll-view
      :class="['flex-1 w-full']"
      scroll-orientation="vertical"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <view class="flex flex-col px-[24px] py-[24px]">
        <text class="app-text text-2xl font-bold tracking-tight"
          >Vue Lynx
        </text>
        <text class="text-sm text-muted">
          {{ $t('app.welcome', { platform: platform }) }}
        </text>
      </view>

      <BaseCard class="w-full px-2" flat>
        <BaseCardHeader>
          <BaseCardTitle>Example Page</BaseCardTitle>
          <BaseCardDescription class="text-sm">
            This is a description
          </BaseCardDescription>
        </BaseCardHeader>

        <BaseItem
        :title-bold="false"
          title="Dark"
          description="Swith theme Dark/Light"
          button
          @tap="handleTheme"
        >
          <template #start>
            <view class="flex items-center justify-center">
              <BaseIcon :name="SunMoon" :size="18" />
            </view>
          </template>
          <template #end>
            <ThemeToggle disabled ref="themeToggleRef" />
          </template>
        </BaseItem>
        <BaseItem
        :title-bold="false"
          :title="$t('base.language')"
          :description="$t('base.translations')"
          button
          to="/settings/languge"
        >
          <template #start>
            <view class="flex items-center justify-center">
              <BaseIcon :name="Languages" :size="18" />
            </view>
          </template>
          <template #end>
            <text class="text-sm text-muted">
              {{ currenLocaleItem?.name }}</text
            >
          </template>
        </BaseItem>
        <BaseItem
          v-for="(item, index) in getExampletItems"
          :key="item.to"
          :title="item.label || ''"
          button
          :title-bold="false"
          :to="item.to"
        >
          <template v-if="item.icon" #start>
            <BaseIcon v-bind="item.icon" />
          </template>
          <template #end>
            <view class="w-8 h-8 flex items-center justify-center">
              <BaseIcon :size="14" :name="ChevronRight" color="#71717b" />
            </view>
          </template>
        </BaseItem>
      </BaseCard>
      <BaseCard class="w-full px-2" flat>
        <BaseCardHeader>
          <BaseCardTitle>Component Page</BaseCardTitle>
          <BaseCardDescription class="text-sm">
            This is a description
          </BaseCardDescription>
        </BaseCardHeader>

        <BaseItem
          title="Longpress"
          description="Press and hold to show longpress"
          button
          :title-bold="false"
          @longpress="handleLongpress"
        >
          <template #end>
            <BaseIcon
              :name="BadgeCheck"
              :color="longpress ? '#00c950' : '#6a7282'"
              :auto-dark="false"
            />
          </template>
        </BaseItem>
        <BaseItem
          v-for="(item, index) in getComponentItems"
          :key="item.to"
          :title="item.label || ''"
          button
          :title-bold="false"
          :to="item.to"
        >
          <template v-if="item.icon" #start>
            <BaseIcon v-bind="item.icon" />
          </template>
          <template #end>
            <view class="w-8 h-8 flex items-center justify-center">
              <BaseIcon :size="14" :name="ChevronRight" color="#71717b" />
            </view>
          </template>
        </BaseItem>
      </BaseCard>
    </scroll-view>
    <!-- </view> -->
  </BasePage>
</template>
