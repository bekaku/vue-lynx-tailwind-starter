<script setup lang="ts">
import BaseActionSheet from '@/components/base/BaseActionSheet.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useTheme } from '@/composables/useTheme';
import { Trash } from 'lucide-static';
import { ref } from 'vue';
const { isDark } = useTheme();
const isOpen = ref(false);
const eventItems = ref<string[]>([]);
const handleAction = (e: any, actionName: string) => {
  console.log('User clicked:', actionName);
  isOpen.value = false; // สั่งปิด Action Sheet
};

const handleClose = (e: any) => {
  console.log('action-sheet.vue > handleClose', e);
  isOpen.value = false;
};
const handleCatchTapClose = (e: any) => {
  console.log('handleCatchTapClose', e);
  isOpen.value = false;
};
const handleDismiss = (e: any) => {
  console.log('action-sheet.vue > handleDismiss');
  eventItems.value.push('dismiss');
};
const handleRequestclose = (e: any) => {
  console.log('action-sheet.vue > handleRequestclose');
  isOpen.value = false;
  eventItems.value.push('requestclose');
};
const handleShow = (e: any) => {
  console.log('action-sheet.vue > handleShow');
  eventItems.value.push('handleShow');
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Action Sheet" />
    <view class="m-4 p-4 bg-primary rounded-lg" @tap="isOpen = true">
      <text class="text-primary-foreground font-semibold">
        Open Action Sheet isOpen : {{ isOpen }}
      </text>
    </view>
    <text class="p-2"> eventItems {{ eventItems }}</text>

    <BaseActionSheet
      v-model:visible="isOpen"
      title="Delete Project?"
      description="This action cannot be undone. This will permanently delete your project."
      @close="handleClose"
      @dismiss="handleDismiss"
      @requestclose="handleRequestclose"
      @showoverlay="handleShow"
    >
      <scroll-view
        :class="['flex-1 w-full gap-2 px-2']"
        scroll-orientation="vertical"
      >
        <BaseButton
          variant="destructive"
          label="Delete"
          :catchtap="(e: any) => handleAction(e, 'delete')"
        >
          <template #start>
            <BaseIcon :name="Trash" />
          </template>
        </BaseButton>
        <BaseButton
          variant="secondary"
          label="Archive"
          :catchtap="(e: any) => handleAction(e, 'archive')"
        />
        <BaseButton
          variant="outline"
          label="Cancel"
          :catchtap="(e: any) => handleCatchTapClose(e)"
        />
      </scroll-view>
    </BaseActionSheet>
  </view>
</template>

<style module>
.badgeText {
  color: red;
}
</style>
