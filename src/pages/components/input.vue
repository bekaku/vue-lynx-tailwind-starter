<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseCardFooter from '@/components/base/BaseCardFooter.vue';
import { ref } from 'vue-lynx';
import { useRoute } from 'vue-router';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import IconLucide from '@/components/IconLucide.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';

const route = useRoute();

const inputValue = ref('inputValue');
const inputValue2 = ref('inputValue2');
const inputValue3 = ref('inputValue3');
const inputNumber = ref(999);
const inputTextarea = ref('inputTextarea');
const handleInput = (e: any) => {
  // const currentValue = e.detail.value.trim();
  console.log('handleInput', e);
};
const handleInput2 = (e: any) => {
  const currentValue = e.detail.value.trim();
  inputValue2.value = currentValue;
  console.log('handleInput', e);
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
          <text class="font-bold">Custom Native Element</text>

          <view class="w-full">
            <explorer-input
              id="input-id"
              class="input-box"
              @input="handleInput"
              :value="inputValue"
              placeholder="Enter BaseCard URL"
            />
          </view>
        </BaseCardContent>

        <BaseCardFooter class="justify-between">
          <BaseButton variant="primary" label="Go" class="w-full" />
        </BaseCardFooter>
      </BaseCard>

      <BaseCard>
        <BaseCardContent>
          <text class="font-bold">Build in Element '{{ inputValue2 }}'</text>

          <view class="w-full p-3 m-2 border border-zinc-200 rounded-md">
            <input
              placeholder="search"
              :value="inputValue2"
              @input="handleInput2"
            />
          </view>
        </BaseCardContent>

        <BaseCardFooter class="justify-between">
          <BaseButton variant="primary" label="Go" class="w-full" />
        </BaseCardFooter>
      </BaseCard>
      <BaseCard>
        <BaseCardContent>
          <text class="font-bold">Component Input {{ inputValue3 }}</text>

          <BaseInput
            class="my-4"
            id="input-id"
            v-model="inputValue3"
            label="Basic Input"
            placeholder="Basic Input"
          >
            <template #start>
              <IconLucide name="messageCircle" />
            </template>
            <template #end>
              <IconLucide name="house" />
            </template>
            <template #bottom>
              <text class="text-[0.8rem] text-muted-foreground">
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
          <text class="font-bold">Component Textarea {{ inputTextarea }}</text>

          <!-- <textarea placeholder="Test textarea" v-model="inputTextarea" class="w-full border border-blue-500" @input="handleInput"/> -->

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
