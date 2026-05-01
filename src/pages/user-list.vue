<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseCard from '@/components/base/BaseCard.vue';
import BasePage from '@/components/base/BasePage.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
const router = useRouter();

const users = [
  { id: 1, name: 'Alice', role: 'Engineer' },
  { id: 2, name: 'Bob', role: 'Designer' },
  { id: 3, name: 'Charlie', role: 'PM' },
];

function goToUser(id: number) {
  router.push(`/users-detail/${id}`);
}
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="User List" />

    <BaseCard>
      <BaseCardContent>
        <text
          :style="{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#111',
            marginBottom: '12px',
          }"
        >
          Users
        </text>

        <view
          v-for="user in users"
          :key="user.id"
          @tap="goToUser(user.id)"
          :style="{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            marginBottom: '8px',
            backgroundColor: '#fff',
            borderRadius: '8px',
          }"
        >
          <view>
            <text
              :style="{ fontSize: '15px', fontWeight: 'bold', color: '#111' }"
            >
              {{ user.name }}
            </text>
            <text
              :style="{ fontSize: '12px', color: '#777', marginTop: '2px' }"
            >
              {{ user.role }}
            </text>
          </view>
          <text :style="{ fontSize: '14px', color: '#1a73e8' }">→</text>
        </view>
      </BaseCardContent>
    </BaseCard>
  </view>
</template>
