<script setup lang="ts">
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Page from '@/components/ui/Page.vue';
import Toolbar from '@/components/ui/Toolbar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <Page>
    <Toolbar title="About page" />

    <Card>
      <CardContent>
        <text
          :style="{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#111',
            marginBottom: '8px',
          }"
        >
          About
        </text>
        <text :style="{ fontSize: '14px', color: '#555', lineHeight: '20px' }">
          Vue Router works in Lynx by using createMemoryHistory() instead of
          createWebHistory(). This avoids any dependency on window.location or
          the History API.
        </text>
        <text :style="{ fontSize: '12px', color: '#999', marginTop: '12px' }">
          Current path: {{ route.fullPath }}
        </text>
      </CardContent>
    </Card>
  </Page>
</template>
