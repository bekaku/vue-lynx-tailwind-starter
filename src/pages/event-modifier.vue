<script setup lang="ts">
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { reactive, ref } from 'vue-lynx';

const counterA = ref(0) // plain @tap — inner tap fires both inner and outer handlers (+2)
const counterB = ref(0) // @tap.stop — inner tap only fires inner handler (+1)
const active = reactive({
  outer: false,
  middle: false,
  inner: false,
});

const flash = (key: 'outer' | 'middle' | 'inner') => {
  active[key] = true;
  setTimeout(() => {
    active[key] = false;
  }, 500);
};

// 3. Event Handlers
const handleOuterTap = (e: any) => {
   if (e.target.id !== 'outer') return;
  console.log('outer',e);
  flash('outer');
};

const handleMiddleTap = (e: any) => {
  if (e.target.id !== 'middle') return;
  console.log('middle',e);
  flash('middle');
};

const handleInnerTap = (e: any) => {
  console.log('inner', e);
  flash('inner');
};
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="event-modifier" />

    <view
      @tap="handleOuterTap"
      :class="['box outer', active.outer ? 'active' : '']"
      id="outer"
    >
      <text>Outer {{ active.outer ? '(active)' : '(inactive)' }}</text>

      <view
        @tap="handleMiddleTap"
        :class="['box middle', active.middle ? 'active' : '']"
        id="middle"
      >
        <text>Middle {{ active.middle ? '(active)' : '(inactive)' }}</text>

        <view
          @tap.stop="handleInnerTap"
          :class="['box inner', active.inner ? 'active' : '']"
          id="inner"
        >
          <text
            >Inner (click me, stops propagation)
            {{ active.inner ? '(active)' : '(inactive)' }}</text
          >
        </view>
      </view>
    </view>



    <view :style="{ margin: '12px 12px 0', backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden' }">
    <!-- Section header -->
    <view :style="{ padding: '10px 14px', backgroundColor: '#fde8d8' }">
      <text :style="{ fontSize: '14px', fontWeight: 'bold', color: '#cc5500' }">
        @tap  vs  @tap.stop
      </text>
      <text :style="{ fontSize: '11px', color: '#664', marginTop: '2px' }">
        Tap Inner — left counter jumps by 2 (propagates to outer), right by 1 (.stop blocks it)
      </text>
    </view>

    <!-- Side-by-side panels -->
    <view :style="{ display: 'flex', flexDirection: 'row' }">
      <!-- Without .stop -->
      <view :style="{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px', alignItems: 'center' }">
        <text :style="{ fontSize: '11px', color: '#888', marginBottom: '6px' }">@tap</text>

        <!-- Counter display -->
        <text :style="{ fontSize: '44px', fontWeight: 'bold', color: '#cc5500', lineHeight: '48px' }">{{ counterA }}</text>
        <text :style="{ fontSize: '10px', color: '#aaa', marginBottom: '10px' }">+2 per inner tap (inner + outer both fire)</text>

        <!-- Outer ring — tight padding so the tappable outer area is clearly just the border -->
        <view
          @tap="counterA++"
          :style="{ padding: '10px', backgroundColor: '#fff3e8', borderRadius: '8px', borderWidth: '2px', borderColor: '#cc5500', borderStyle: 'solid', alignItems: 'center' }"
        >
          <!-- Inner button -->
          <view
            @tap="counterA++"
            :style="{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '16px', paddingRight: '16px', backgroundColor: '#cc5500', borderRadius: '5px', alignItems: 'center' }"
          >
            <text :style="{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }">Tap me</text>
          </view>
        </view>
        <text :style="{ fontSize: '10px', color: '#cc5500', marginTop: '4px' }">← tap the border too</text>

        <view @tap="counterA = 0" :style="{ marginTop: '8px', padding: '4px 8px', backgroundColor: '#eee', borderRadius: '4px' }">
          <text :style="{ fontSize: '10px', color: '#666' }">Reset</text>
        </view>
      </view>

      <!-- Divider -->
      <view :style="{ width: '1px', backgroundColor: '#eee' }" />

      <!-- With .stop -->
      <view :style="{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px', alignItems: 'center' }">
        <text :style="{ fontSize: '11px', color: '#888', marginBottom: '6px' }">@tap.stop</text>

        <!-- Counter display -->
        <text :style="{ fontSize: '44px', fontWeight: 'bold', color: '#cc5500', lineHeight: '48px' }">{{ counterB }}</text>
        <text :style="{ fontSize: '10px', color: '#aaa', marginBottom: '10px' }">+1 per inner tap (outer is blocked)</text>

        <!-- Outer ring -->
        <view
          @tap="counterB++"
          :style="{ padding: '10px', backgroundColor: '#fff3e8', borderRadius: '8px', borderWidth: '2px', borderColor: '#cc5500', borderStyle: 'solid', alignItems: 'center' }"
        >
          <!-- Inner button with .stop -->
          <view
            @tap.stop="counterB++"
            :style="{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '16px', paddingRight: '16px', backgroundColor: '#cc5500', borderRadius: '5px', alignItems: 'center' }"
          >
            <text :style="{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }">Tap me (.stop)</text>
          </view>
        </view>
        <text :style="{ fontSize: '10px', color: '#cc5500', marginTop: '4px' }">← border tap still works</text>

        <view @tap="counterB = 0" :style="{ marginTop: '8px', padding: '4px 8px', backgroundColor: '#eee', borderRadius: '4px' }">
          <text :style="{ fontSize: '10px', color: '#666' }">Reset</text>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>
<style scoped></style>
