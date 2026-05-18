<script setup lang="ts">
import BaseAlert from '@/components/base/BaseAlert.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseImage from '@/components/base/BaseImage.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const users: Record<
  string,
  { name: string; role: string; bio: string; image: string }
> = {
  '1': {
    name: 'Alice',
    role: 'Engineer',
    bio: 'Builds cross-platform renderers with Vue and Lynx.',
    image: 'https://github.com/shadcn.png',
  },
  '2': {
    name: 'Bob',
    role: 'Designer',
    bio: 'Crafts pixel-perfect interfaces for mobile experiences.',
    image: 'https://github.com/leerob.png',
  },
  '3': {
    name: 'Charlie',
    role: 'PM',
    bio: 'Coordinates teams to ship features on time.',
    image: 'https://github.com/evilrabbit.png',
  },
};

const userId = computed(() => route.params.id as string);
const user = computed(() => users[userId.value]);
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="User Detail" />

    <BaseCard>
      <BaseCardContent>
        <view
          v-if="user"
          :style="{
            borderRadius: '8px',
            padding: '16px',
          }"
        >
          <view class="flex flex-col flex-wrap items-center gap-2 p-2">
            <BaseImage
              :src="user.image"
              class="w-full h-[10rem] bg-background rounded-lg"
              fit="aspectFit"
            />
          </view>
          <text
            class="app-text"
            :style="{ fontSize: '22px', fontWeight: 'bold' }"
          >
            {{ user.name }}
          </text>
          <text
            class="app-text"
            :style="{ fontSize: '13px', color: '#1a73e8', marginTop: '4px' }"
          >
            {{ user.role }}
          </text>
          <text
            class="app-text"
            :style="{
              fontSize: '14px',
              color: '#555',
              marginTop: '12px',
              lineHeight: '20px',
            }"
          >
            {{ user.bio }}
          </text>
          <text :style="{ fontSize: '11px', color: '#aaa', marginTop: '16px' }">
            Route param :id = {{ userId }}
          </text>
        </view>
        <BaseAlert
          v-else
          variant="destructive"
          title="Error"
          :description="` User not found (id: ${userId})`"
        >
        </BaseAlert>
      </BaseCardContent>
    </BaseCard>
  </view>
</template>
