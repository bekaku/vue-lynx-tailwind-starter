<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseItem from '@/components/base/BaseItem.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import IconLucide from '@/components/IconLucide.vue';
import { useScrollRestore } from '@/composables/useScrollRestore';
const { scrollTop, onScroll } = useScrollRestore();
const users = [
  {
    id: 1,
    name: 'Alice',
    role: 'Engineer',
    image: 'https://github.com/shadcn.png',
  },
  {
    id: 2,
    name: 'Bob',
    role: 'Designer',
    image: 'https://github.com/leerob.png',
  },
  {
    id: 3,
    name: 'Charlie',
    role: 'PM',
    image: 'https://github.com/evilrabbit.png',
  },
  {
    id: 4,
    name: 'Charlie',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 5,
    name: 'Charlie',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 6,
    name: 'Cody Fisher',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 7,
    name: 'Robert Fox',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
  },
  {
    id: 8,
    name: 'Esther Howard',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    id: 9,
    name: 'Darlene Robertson',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    id: 10,
    name: 'Ralph Edwards',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/men/81.jpg',
  },
  {
    id: 11,
    name: 'Darrell Steward',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/men/88.jpg',
  },
  {
    id: 12,
    name: 'Chanavee Steward',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/men/0.jpg',
  },
  {
    id: 13,
    name: 'Cody Fisher',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/men/30.jpg',
  },
  {
    id: 14,
    name: 'Kerean Fisher',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: 15,
    name: 'Robert Fox',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    id: 16,
    name: 'Darlene Robertson',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 17,
    name: 'Esther Howard',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/women/11.jpg',
  },
  {
    id: 18,
    name: 'Ralph Edwards',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/men/38.jpg',
  },
  {
    id: 19,
    name: 'Darrell Steward',
    role: 'PM',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
  },
  {
    id: 20,
    name: 'Meeyae Steward',
    role: 'MS',
    image: 'https://github.com/evilrabbit.png',
  },
];
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="User List" />
    <scroll-view
      :class="['flex-1 w-full']"
      scroll-orientation="vertical"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>Users</BaseCardTitle>
        </BaseCardHeader>
        <BaseItem
          v-for="(user, index) in users"
          :key="user.id"
          :title="user.name || ''"
          :description="user.role"
          button
          :to="`/users-detail/${user.id}`"
        >
          <template #start>
            <BaseAvatar :src="user.image" :fallback="index + ''" />
          </template>
          <template #end>
            <view class="w-8 h-8 flex items-center justify-center">
              <IconLucide :size="14" name="chevronRight" />
            </view>
          </template>
        </BaseItem>
      </BaseCard>
    </scroll-view>
  </view>
</template>
