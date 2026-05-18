<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseConfirmDialog from '@/components/base/BaseConfirmDialog.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useTheme } from '@/composables/useTheme';
import { ref } from 'vue';
const { isDark } = useTheme();
const isOpen = ref(false);
const eventItems = ref<string[]>([]);
const inputValue = ref();
const showNormalDialog = ref(false);
const showDeleteDialog = ref(false);

const submitData = () => {
  console.log('✅ submitData');
};

const deleteProject = () => {
  console.log('🗑️ deleteProject');
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Confirm Dialog" />

    <view class="flex flex-row gap-2 p-2">
      <BaseButton
        class="flex-1"
        label="Open Default"
        @tap="showNormalDialog = true"
      />
      <BaseButton
        class="flex-1"
        variant="destructive"
        label="Open Destructive"
        @tap="showDeleteDialog = true"
      />
    </view>

    <text class="app-text p-2"> eventItems {{ eventItems }}</text>

    <!-- 1. แบบ Default -->
    <BaseConfirmDialog
      v-model:visible="showNormalDialog"
      title="Confirm the transaction."
      description="Have you checked all the information thoroughly??"
      cancelText="Go back and edit."
      confirmText="confirm"
      variant="default"
      @confirm="submitData"
    />

    <!-- 2. แบบ Destructive -->
    <BaseConfirmDialog
      v-model:visible="showDeleteDialog"
      title="Permanently delete the project.?"
      description="This action is irreversible. All data will be immediately deleted from the system."
      cancelText="cancle"
      confirmText="Delete"
      variant="destructive"
      @confirm="deleteProject"
    />
  </view>
</template>

<style module>
.badgeText {
  color: red;
}
</style>
