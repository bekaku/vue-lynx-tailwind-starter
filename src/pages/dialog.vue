<script setup lang="ts">
import IconLucide from '@/components/IconLucide.vue';
import BaseActionSheet from '@/components/base/BaseActionSheet.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseDialog from '@/components/base/BaseDialog.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useTheme } from '@/composables/useTheme';
import { ref } from 'vue-lynx';
const { isDark } = useTheme();
const isOpen = ref(false);
const eventItems = ref<string[]>([]);
const inputValue = ref();
const handleAction = (e: any, actionName: string) => {
  console.log('User clicked:', actionName);
  isOpen.value = false; // สั่งปิด Action Sheet
};

const handleClose = (e: any) => {
  console.log('dialog.vue > handleClose', e);
  isOpen.value = false;
};
const handleCatchTapClose = (e: any) => {
  console.log('handleCatchTapClose', e);
  isOpen.value = false;
};
const handleDismiss = (e: any) => {
  console.log('dialog.vue > handleDismiss');
  eventItems.value.push('dismiss');
};
const handleRequestclose = (e: any) => {
  console.log('dialog.vue > handleRequestclose');
  isOpen.value = false;
  eventItems.value.push('requestclose');
};
const handleShow = (e: any) => {
  console.log('dialog.vue > handleShow');
  eventItems.value.push('handleShow');
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Dialog" />
    <view class="m-4 p-4 bg-primary rounded-lg" @tap="isOpen = true">
      <text class="text-primary-foreground font-semibold">
        Open Dialog isOpen : {{ isOpen }}
      </text>
    </view>

     <text class="p-2"> eventItems {{ eventItems }}</text>

    <BaseDialog
      v-model:visible="isOpen"
      title="Add new product"
      @close="handleClose"
      @dismiss="handleDismiss"
      @requestclose="handleRequestclose"
      @showoverlay="handleShow"
    >
      <template #end>
        <text class="text-primary font-semibold text-base">Save</text>
      </template>

      <BaseInput v-model="inputValue" label="Name" placeholder="Name">
      </BaseInput>
      <BaseInput
        class="mt-2"
        v-model="inputValue"
        label="Basic Input"
        placeholder="Basic Input"
      >
      </BaseInput>

      <BaseTextarea
        class="mt-2"
        label="More details (Bio)"
        placeholder="Write something about yourself...."
        v-model="inputValue"
        :maxlength="200"
      >
      </BaseTextarea>
    </BaseDialog>
  </view>
</template>