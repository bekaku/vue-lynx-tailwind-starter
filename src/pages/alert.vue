<script setup lang="ts">
import BaseAlert from '@/components/base/BaseAlert.vue';
import BaseAlertAlt from '@/components/base/BaseAlertAlt.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useTheme } from '@/composables/useTheme';
import { Trash } from 'lucide-static';
const { isDark } = useTheme();
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Alert" />
    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <BaseCard>
        <view class="flex flex-col gap-2 p-2 my-4">
          <BaseAlert
            title="Heads up!"
            description="You can add components to your app using the cli."
          />

          <BaseAlert
            variant="destructive"
            title="Error"
            description="Your session has expired. Please log in again."
          >
            <template #icon>
              <text class="text-xl leading-none text-destructive">⚠️</text>
            </template>
          </BaseAlert>

          <BaseAlert title="Success Update: Vue Lynx Starter Template" />
        </view>

        <view class="flex flex-col gap-2 p-2">
          <BaseAlertAlt type="is-primary" message="This is primary!!">
            <template #start>
              <BaseIcon :name="Trash" />
            </template>
            <template #end>
              <BaseButton
                variant="ghost"
                size="sm"
                text-class="text-white"
                label="x"
              />
            </template>
          </BaseAlertAlt>
          <BaseAlertAlt
            type="is-warning"
            :radius="false"
            message="This is warning!!"
          />
          <BaseAlertAlt type="is-danger" message="This is danger!!" />
          <BaseAlertAlt type="is-info" message="This is info!!" />
          <BaseAlertAlt type="is-light" message="This is light!!" />
          <BaseAlertAlt type="is-link" message="This is link!!" />
          <BaseAlertAlt type="is-success" message="This is success!!" />

          <BaseAlertAlt
            type="is-primary"
            message="This is primary!!"
            secondary
          />
          <BaseAlertAlt
            type="is-warning"
            message="This is warning!!"
            :radius="false"
            :closeable="false"
            secondary
          />
          <BaseAlertAlt
            type="is-danger"
            icon-set="bootstrap-icons"
            message="This is danger!!"
            secondary
          />
          <BaseAlertAlt type="is-info" message="This is info!!" secondary />
          <BaseAlertAlt type="is-light" message="This is light!!" secondary />
          <BaseAlertAlt type="is-link" message="This is link!!" secondary />
          <BaseAlertAlt
            type="is-success"
            message="This is success!!"
            secondary
          />
        </view>
      </BaseCard>
    </scroll-view>
  </view>
</template>

<style module>
.badgeText {
  color: red;
}
</style>
