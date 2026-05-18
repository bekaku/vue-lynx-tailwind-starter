<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseTransitionWrapper from '@/components/base/BaseTransitionWrapper.vue';
import { ref } from 'vue';

const fade = ref(false);
const slideLeft = ref(false);
const slideRight = ref(false);
const slideUp = ref(false);
const slideDown = ref(false);
const zoom = ref(false);
const bounce = ref(false);
const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Test" />

    <view class="flex h-full flex-1 flex-col gap-4">
      <scroll-view :class="['flex-1 w-full pb-[100px]']" scroll-orientation="vertical">
        <BaseCard class="w-full">
          <text class="app-text p-4">Fade :{{ fade }}</text>

          <BaseButton
            variant="ghost"
            :label="fade ? 'Hide me' : ' Show me'"
            @tap="fade = !fade"
          />
          <BaseTransitionWrapper name="fade">
            <view
              v-if="fade"
              :style="{ padding: '12px', borderRadius: '4px' }"
            >
                  <text class="app-text" :style="{ fontSize: '13px' }">{{ text }}</text>
            </view>
          </BaseTransitionWrapper>
        </BaseCard>

        <BaseCard class="w-full">
          <text class="app-text p-4">Slide Left :{{ slideLeft }}</text>

          <BaseButton
            :label="slideLeft ? 'Hide me' : ' Show me'"
            variant="ghost"
            @tap="slideLeft = !slideLeft"
          />
          <BaseTransitionWrapper name="slide-left">
            <view
              v-if="slideLeft"
              :style="{ padding: '12px', borderRadius: '4px' }"
            >
              <text class="app-text" :style="{ fontSize: '13px' }">{{ text }}</text>
            </view>
          </BaseTransitionWrapper>
        </BaseCard>

        <BaseCard class="w-full">
          <text class="app-text p-4">Slide Right :{{ slideRight }}</text>

          <BaseButton
            :label="slideRight ? 'Hide me' : ' Show me'"
            @tap="slideRight = !slideRight"
            variant="ghost"
          />
          <BaseTransitionWrapper name="slide-right">
            <text v-if="slideRight" class="app-text p-4">{{
              text
            }}</text>
          </BaseTransitionWrapper>
        </BaseCard>
        <BaseCard class="w-full">
          <text class="app-text p-4">Slide Up :{{ slideUp }}</text>

          <BaseButton
            :label="slideUp ? 'Hide me' : ' Show me'"
            @tap="slideUp = !slideUp"
            variant="ghost"
          />
          <BaseTransitionWrapper name="slide-up">
            <text v-if="slideUp" class="app-text p-4">{{
              text
            }}</text>
          </BaseTransitionWrapper>
        </BaseCard>
        <BaseCard class="w-full">
          <text class="app-text p-4">Slide down :{{ slideDown }}</text>

          <BaseButton
            :label="slideDown ? 'Hide me' : ' Show me'"
            @tap="slideDown = !slideDown"
            variant="ghost"
          />
          <BaseTransitionWrapper name="slide-down">
            <text v-if="slideDown" class="app-text p-4">{{
              text
            }}</text>
          </BaseTransitionWrapper>
        </BaseCard>
        <BaseCard class="w-full">
          <text class="app-text p-4">Zoom :{{ zoom }}</text>

          <BaseButton
            :label="zoom ? 'Hide me' : ' Show me'"
            @tap="zoom = !zoom"
            variant="ghost"
          />
          <BaseTransitionWrapper name="zoom">
            <text v-if="zoom" class="app-text p-4">{{
              text
            }}</text>
          </BaseTransitionWrapper>
        </BaseCard>
        <BaseCard class="w-full">
          <text class="app-text p-4">Bounce :{{ bounce }}</text>
          <BaseButton
            :label="bounce ? 'Hide me' : ' Show me'"
            @tap="bounce = !bounce"
            variant="ghost"
          />
          <BaseTransitionWrapper name="bounce">
            <text v-if="bounce" class="app-text font-semibold p-4">{{ text }}</text>
          </BaseTransitionWrapper>
        </BaseCard>
      </scroll-view>
    </view>
  </view>
</template>
