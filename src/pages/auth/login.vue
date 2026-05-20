<script setup>
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButtonGroup from '@/components/base/BaseButtonGroup.vue';
import BaseImage from '@/components/base/BaseImage.vue';
import { useTheme } from '@/composables/useTheme';
import { biApple, biGoogle } from '@quasar/extras/bootstrap-icons';
import {
  ArrowLeft,
  Eye,
  EyeClosed,
  EyeOff,
  Key,
  Mail,
  Phone,
} from 'lucide-static';
import { ref } from 'vue';
import logoBlack from '@/assets/logo-black.png';
import logoWhite from '@/assets/logo-white.png';
import { useBase } from '@/composables/useBase';
const activeTab = ref('email');
const email = ref('diyna.jones@gmail.com');
const password = ref('mypassword123');
const showPassword = ref(false);
const { isDark } = useTheme();
const { onBack } = useBase();
const onLogin = () => {
  console.log(`Login with ${email.value} and ${password.value}`);
};

const onForgotPassword = () => {
  console.log('Go to forgot password');
};

const loginWithGoogle = () => {
  console.log('Login with Google');
};

const loginWithApple = () => {
  console.log('Login with Apple');
};

const goToRegister = () => {
  console.log('Go to register page');
};
</script>

<template>
  <view
    class="w-full h-full flex flex-col justify-between px-6 py-8 holder"
    :style="{
      background: !isDark
        ? '-webkit-linear-gradient(to bottom,#eef2f3, #8e9eab)'
        : '-webkit-linear-gradient(to bottom, #000000, #434343)',
      background: !isDark
        ? 'linear-gradient(to bottom,#d2e4fc,#f7f9fc)'
        : 'linear-gradient(to bottom, #000000,#434343)',
    }"
  >
    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <view class="flex flex-col mt-12 mb-8">
        <view class="flex flex-row items-center gap-1 mb-2">
          <text class="text-2xl font-bold app-text">👋 Hello,</text>
        </view>
        <text class="text-sm text-muted">Welcome back to your account.</text>
      </view>

      <view class="w-full p-4 flex justify-center">
        <BaseImage
          :src="!isDark ? logoBlack : logoWhite"
          :style="{ width: '72px', height: '72px' }"
          fit="scaleToFill"
          class="mr-3"
        />
      </view>
      <view class="w-full flex-1 flex flex-col">
        <!-- <BaseButtonGroup
          v-model="activeTab"
          :items="[
            {
              label: 'Email',
              value: 'email',
              icon: { name: Mail, size: 18 },
            },
            {
              label: 'Phone',
              value: 'phone',
              icon: { name: Phone, size: 18 },
            },
          ]"
        /> -->

        <view class="flex flex-col mb-4">
          <BaseInput
            v-model="email"
            type="text"
            :dense="false"
            :shadow="false"
            bordered
            :input-holder-class="!isDark ? 'bg-white' : 'bg-zinc-800'"
            placeholder="Enter your email"
          >
            <template #label>
              <text class="text-muted font-semibold"> Email </text>
            </template>
            <template #start>
              <BaseIcon :name="Mail" />
            </template>
          </BaseInput>
        </view>

        <view class="flex flex-col mb-3">
          <BaseInput
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :dense="false"
            :shadow="false"
            bordered
            :input-holder-class="!isDark ? 'bg-white' : 'bg-zinc-800'"
            placeholder="Enter your password"
          >
            <template #label>
              <text class="text-muted font-semibold"> Password </text>
            </template>
            <template #start>
              <BaseIcon :name="Key" />
            </template>
            <template #end>
              <view @tap="showPassword = !showPassword" class="p-1">
                <BaseIcon :name="showPassword ? Eye : EyeClosed" />
              </view>
            </template>
          </BaseInput>
        </view>

        <view class="self-end mb-8" @tap="onForgotPassword">
          <text class="text-xs font-semibold app-text underline"
            >Forgot Password?</text
          >
        </view>

        <view
          class="w-full h-[54px] bg-primary rounded-xl flex items-center justify-center"
          @tap="onLogin"
        >
          <text class="text-base font-bold text-white">Continue</text>
        </view>

        <view class="flex flex-row items-center justify-center my-6 gap-3">
          <view class="flex-1 h-[1px] bg-border"></view>
          <text class="text-xs text-muted font-medium">OR</text>
          <view class="flex-1 h-[1px] bg-border"></view>
        </view>

        <view class="flex flex-col gap-3">
          <view
            class="w-full h-[50px] bg-card border border-border rounded-xl flex flex-row items-center justify-center gap-2"
            @tap="loginWithGoogle"
          >
            <BaseIcon :name="biGoogle" icon-set="quasar-bootstrap-icons" />
            <text class="text-sm font-semibold app-text">
              Sign up with Google
            </text>
          </view>
          <view
            class="w-full h-[50px] bg-card border border-border rounded-xl flex flex-row items-center justify-center gap-2"
            @tap="loginWithApple"
          >
            <BaseIcon :name="biApple" icon-set="quasar-bootstrap-icons" />
            <text class="text-sm font-semibold app-text">
              Sign up with Apple
            </text>
          </view>
          <view
            class="w-full h-[50px] bg-card border border-border rounded-xl flex flex-row items-center justify-center gap-2"
            @tap="onBack"
          >
            <BaseIcon :name="ArrowLeft" />
            <text class="text-sm font-semibold app-text"> Back </text>
          </view>
        </view>
      </view>

      <view class="flex flex-row items-center justify-center mt-6">
        <text class="text-xs text-[#8A8A8A]">Not registered yet? </text>
        <text
          class="text-xs font-bold text-primary underline ml-1"
          @tap="goToRegister"
          >Create an Account</text
        >
      </view>
    </scroll-view>
  </view>
</template>
<style scoped>
.theme-light {
  .holder {
    background: -webkit-linear-gradient(to bottom, #d2e4fc, #f7f9fc);
    background: linear-gradient(to bottom, #d2e4fc, #f7f9fc);
  }
}
.theme-dark {
  .holder {
    background: -webkit-linear-gradient(to bottom, #434343, #000000);
    background: linear-gradient(to bottom, #434343, #000000);
  }
}
</style>
