<script setup lang="ts">
import Card from '@/components/ui/Card.vue';
import Page from '@/components/ui/Page.vue';
import Toolbar from '@/components/ui/Toolbar.vue';
import CardContent from '@/components/ui/CardContent.vue';
import { useCounterStore } from '../stores/counterStore';

const counter = useCounterStore();
</script>

<template>
  <Page>
    <Toolbar title="About page" />

    <Card>
      <CardContent>
        <text
          :style="{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '8px',
          }"
        >
          Counter Store
        </text>

        <text class="my-2 text-lg"> Count: {{ counter.count }} </text>
        <text class="mb-2 text-lg"> Double: {{ counter.doubleCount }} </text>

        <view :style="{ display: 'flex', flexDirection: 'row', gap: '8px' }">
          <text
            class="text-sm bg-destructive text-white py-2 px-4 rounded-md"
            @tap="counter.decrement"
          >
            −
          </text>
          <text
            class="text-sm bg-success text-white py-2 px-4 rounded-md"
            @tap="counter.increment"
          >
            +
          </text>
          <text
            class="text-sm bg-zinc-600 text-white py-2 px-4 rounded-md"
            @tap="counter.reset"
          >
            Reset
          </text>
        </view>
      </CardContent>
    </Card>
  </Page>
</template>
