<script setup lang="ts">
import { ref, computed } from 'vue-lynx';
import { useBase } from '@/composables/useBase';
import ToolBar from '@/components/ui/ToolBar.vue';
import Button from '@/components/ui/Button.vue';
import { useThemeStore } from '@/stores/themeStore';
import Toggle from '@/components/ui/Toggle.vue';
import Card from '@/components/ui/Card.vue';
const { onNavigateTo, getFullPath } = useBase();
const themeStore = useThemeStore();
const { setTheme, themeNames } = themeStore;

const name = ref('Hux');
const email = ref('hux@example.com');
const plan = ref<'free' | 'pro'>('pro');

const pushEnabled = ref(true);
const emailEnabled = ref(false);

function togglePush() {
  pushEnabled.value = !pushEnabled.value;
}

function toggleEmail() {
  emailEnabled.value = !emailEnabled.value;
}

function upgradePlan() {
  plan.value = plan.value === 'free' ? 'pro' : 'free';
}

const planBadgeClass = computed(() =>
  plan.value === 'pro'
    ? 'bg-primary text-primary-foreground'
    : 'bg-secondary text-secondary-foreground',
);
const onTab = () => {
  console.log('onTab');
  onNavigateTo('/');
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <ToolBar title="Tailwind CSS">
      <template #end>
        <Button variant="ghost" text-class="text-primary" label="Save" />
      </template>
    </ToolBar>
    <scroll-view
      :class="['w-full h-full bg-background']"
      scroll-orientation="vertical"
      :style="{ paddingBottom: '160px' }"
    >
      <view class="p-6 flex flex-col gap-6">
        <!-- Header -->
        <view class="flex flex-col gap-1">
          <text class="text-2xl font-bold">Settings Example</text>
          <text class="text-muted text-sm">
            Manage your account and preferences.
          </text>
        </view>

        <Card :margin="false">
          <view class="p-4 pb-0 flex flex-col gap-1">
            <text class="text-card-foreground text-lg font-semibold"
              >Theme</text
            >
            <text class="text-muted-foreground text-sm">
              Switch design tokens at runtime via CSS variables.
            </text>
          </view>
          <view class="p-4 flex flex-row gap-2">
            <Button
              v-for="t in themeNames"
              :key="t"
              :class="'flex-1 '"
              :label="t[0].toUpperCase() + t.slice(1)"
              variant="primary"
            />
          </view>
        </Card>

        <!-- Card: Theme Switcher -->
        <view class="bg-card rounded-lg border border-border flex flex-col">
          <view class="p-4 pb-0 flex flex-col gap-1">
            <text class="text-card-foreground text-lg font-semibold"
              >Theme</text
            >
            <text class="text-muted-foreground text-sm">
              Switch design tokens at runtime via CSS variables.
            </text>
          </view>

          <view class="p-4 flex flex-row gap-2">
            <view
              v-for="t in themeNames"
              :key="t"
              :class="[
                'flex-1 rounded-md py-2 items-center justify-center border',
                themeStore.currentTheme === t
                  ? 'bg-primary border-primary'
                  : 'bg-secondary border-border',
              ]"
              @tap="setTheme(t)"
            >
              <text
                :class="[
                  'text-sm font-medium',
                  themeStore.currentTheme === t
                    ? 'text-primary-foreground'
                    : 'text-secondary-foreground',
                ]"
              >
                {{ t[0].toUpperCase() + t.slice(1) }}
              </text>
            </view>
          </view>
        </view>

        <!-- Card: Profile -->
        <view class="bg-card rounded-lg border border-border flex flex-col">
          <view class="p-4 pb-0 flex flex-col gap-1">
            <text class="text-card-foreground text-lg font-semibold"
              >Profile</text
            >
            <text class="text-muted-foreground text-sm">
              Your public profile information.
            </text>
          </view>

          <view class="p-4 flex flex-col gap-4">
            <!-- Avatar + Name row -->
            <view class="flex flex-row items-center gap-3">
              <view
                class="w-10 h-10 rounded-full bg-primary items-center justify-center"
              >
                <text class="text-primary-foreground text-lg font-semibold"
                  >H</text
                >
              </view>
              <view class="flex flex-col">
                <text class="text-card-foreground text-base font-medium">
                  {{ name }}
                </text>
                <text class="text-muted-foreground text-sm">{{ email }}</text>
              </view>
              <view class="ml-auto">
                <view :class="['rounded-full px-2.5 py-0.5', planBadgeClass]">
                  <text
                    class="text-xs font-medium"
                    :class="{
                      'text-white': themeStore.currentTheme != 'light',
                    }"
                    >{{ plan.toUpperCase() }}</text
                  >
                </view>
              </view>
            </view>

            <view class="h-px bg-border" />

            <!-- Input: Name -->
            <view class="flex flex-col gap-1.5">
              <text class="text-card-foreground text-sm font-medium"
                >Display Name</text
              >
              <view
                class="bg-secondary rounded-md border border-border px-3 py-2"
              >
                <text class="text-secondary-foreground text-sm">{{
                  name
                }}</text>
              </view>
            </view>

            <!-- Input: Email -->
            <view class="flex flex-col gap-1.5">
              <text class="text-card-foreground text-sm font-medium"
                >Email</text
              >
              <view
                class="bg-secondary rounded-md border border-border px-3 py-2"
              >
                <text class="text-secondary-foreground text-sm">{{
                  email
                }}</text>
              </view>
            </view>
          </view>

          <view class="p-4 pt-0 flex flex-row gap-2">
            <view
              class="bg-primary rounded-md py-2 px-4 items-center justify-center"
              @tap="upgradePlan"
            >
              <text class="text-primary-foreground text-sm font-medium">
                {{ plan === 'pro' ? 'Downgrade' : 'Upgrade to Pro' }}
              </text>
            </view>
          </view>
        </view>

        <!-- Card: Notifications -->
        <view class="bg-card rounded-lg border border-border flex flex-col">
          <view class="p-4 pb-0 flex flex-col gap-1">
            <text class="text-card-foreground text-lg font-semibold">
              Notifications
            </text>
            <text class="text-muted-foreground text-sm">
              Choose how you want to be notified.
            </text>
          </view>

          <view class="p-4 flex flex-col gap-3">
            <!-- Switch row: Push -->
            <view
              class="flex flex-row items-center justify-between"
              @tap="togglePush"
            >
              <view class="flex flex-col">
                <text class="text-card-foreground text-sm font-medium">
                  Push Notifications
                </text>
                <text class="text-muted-foreground text-xs">
                  Receive push notifications on your device.
                </text>
              </view>
              <Toggle v-model="pushEnabled" class="bg-red-500" />
            </view>

            <view class="h-px bg-border" />

            <!-- Switch row: Email -->
            <view
              class="flex flex-row items-center justify-between"
              @tap="toggleEmail"
            >
              <view class="flex flex-col">
                <text class="text-card-foreground text-sm font-medium">
                  Email Notifications
                </text>
                <text class="text-muted-foreground text-xs">
                  Receive email digests and updates.
                </text>
              </view>
              <Toggle v-model="emailEnabled" />
            </view>
          </view>
        </view>

        <!-- Card: Danger Zone -->
        <view
          class="bg-card rounded-lg border border-destructive flex flex-col"
        >
          <view class="p-4 pb-0 flex flex-col gap-1">
            <text class="text-destructive text-lg font-semibold"
              >Danger Zone</text
            >
            <text class="text-muted-foreground text-sm">
              Irreversible and destructive actions.
            </text>
          </view>

          <view class="p-4 flex flex-row gap-2">
            <view
              class="bg-destructive rounded-md py-2 px-4 items-center justify-center"
            >
              <text class="text-destructive-foreground text-sm font-medium">
                Delete Account
              </text>
            </view>
            <view
              class="bg-secondary rounded-md py-2 px-4 items-center justify-center border border-border"
            >
              <text class="text-secondary-foreground text-sm font-medium">
                Cancel
              </text>
            </view>
          </view>
        </view>
        <text class="text-muted mt-12 text-xs">
          Current path: {{ getFullPath() }}
        </text>
      </view>
    </scroll-view>
  </view>
</template>
