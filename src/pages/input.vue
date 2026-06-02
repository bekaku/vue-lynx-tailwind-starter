<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardFooter from '@/components/base/BaseCardFooter.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { Eraser, PencilLine } from 'lucide-static';
import { onMounted, ref } from 'vue';

const inputValue = ref('');
const inputValue2 = ref('inputValue2 initial value');
const inputValue3 = ref('intial value');
const inputNumber = ref(999);
const inputTextarea = ref('default textarea value');

const inputTextareaRef = ref<any>(null);
onMounted(async () => {
  // console.log('inputTextareaRef', inputTextareaRef.value);
  // if (inputTextareaRef.value) {
  //   inputTextareaRef.value
  //     .invoke({
  //       method: 'setValue',
  //       params: {
  //         value: 'Test inital textarea value',
  //       },
  //       success: (res: any) => {
  //         console.log('setValue success!');
  //       },
  //       fail: (err: any) => {
  //         console.error('setValue error:', err);
  //       },
  //     })
  //     .exec();
  // }
});
const handleInput = (e: any) => {
  // const currentValue = e.detail.value.trim();
  console.log('handleInput', e);
};
const handleInput2 = (e: any) => {
  const currentValue = e.detail.value.trim();
  inputValue2.value = currentValue;
  console.log('handleInput', e);
};
const handleTextarea = (e: any, from: string) => {
  const currentValue = e.detail.value.trim();
  inputTextarea.value = currentValue;
  console.log('handleTextarea', 'from', from, e);
};
const handleConfirm = (e: any) => {
  console.log('handleConfirm', e);
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="About page" />

    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <BaseCard>
        <BaseCardContent>
          <text class="app-text font-bold">Custom Native Element</text>
          <view
            class="flex flex-col justify-center items-center w-full"
            :style="{ height: '85px' }"
          >
            <explorer-input
              :style="{
                display: 'flex',
                alignItems: 'flex-start',
                margin: '0% 5% 5% 5%',
                background: 'transparent',
                borderWidth: '0px 0px 1px',
                borderColor: '#0000000a',
                height: '20%',
                width: '90%',
              }"
              @input="handleInput"
              :value="inputValue"
              placeholder="Enter BaseCard URL"
            />
          </view>
        </BaseCardContent>

        <BaseCardFooter class="justify-between">
          <BaseButton label="Go" class="w-full" />
        </BaseCardFooter>
      </BaseCard>

      <BaseCard>
        <BaseCardContent>
          <text class="app-text font-bold">Build in Element</text>
          <text class="text-sm text-muted">'{{ inputValue2 }}'</text>

          <view class="w-full p-3 m-2 border-inputborder bg-input rounded-md">
            <input
              v-model="inputValue2"
              type="text"
              placeholder="Type here"
              @input="handleInput2"
              
            />
          </view>
        </BaseCardContent>

        <BaseCardFooter class="justify-between">
          <BaseButton label="Go" class="w-full" />
        </BaseCardFooter>
      </BaseCard>
      <BaseCard>
        <BaseCardContent>
          <text class="app-text font-bold">Component Input</text>
          <text class="text-sm text-muted">'{{ inputValue3 }}'</text>

          <BaseInput
            class="my-4"
            id="input-id"
            v-model="inputValue3"
            label="Basic Input"
            placeholder="Basic Input"
          >
            <template #start>
              <BaseIcon :name="PencilLine" />
            </template>
            <template #end>
              <BaseIcon :name="Eraser" />
            </template>
            <template #bottom>
              <text class="app-text text-[0.8rem] text-muted-foreground">
                This name will be visible to other users.
              </text>
            </template>
          </BaseInput>

          <BaseInput
            class="my-4"
            id="input-id"
            v-model="inputNumber"
            type="number"
            label="Number Input"
            placeholder="Number Input"
            @confirm="handleConfirm"
          ></BaseInput>
        </BaseCardContent>
      </BaseCard>

      <BaseCard>
        <BaseCardContent>
          <text class="app-text font-bold">Component Textarea</text>
          <text class="text-sm text-muted">'{{ inputTextarea }}'</text>

          <BaseTextarea
            class="my-4"
            label="More details (Bio)"
            placeholder="Write something about yourself...."
            v-model="inputTextarea"
            :maxlength="200"
          >
            <template #bottom>
              <text class="text-[0.8rem] text-muted-foreground">
                Maximum length: 200 characters.
              </text>
            </template>
          </BaseTextarea>
        </BaseCardContent>
      </BaseCard>
    </scroll-view>
  </view>
</template>
<style scoped></style>
