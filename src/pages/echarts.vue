<script setup lang="ts">
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { computed, onMounted, ref } from 'vue';
import BaseAlert from '@/components/base/BaseAlert.vue';
import * as echarts from 'echarts/core';
import { LineChart, BarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  VisualMapComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  SVGRenderer,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  VisualMapComponent,
]);

const svgWidth = 350;
const svgHeight = 200;
const timeLabels = ['10:00', '11:00', '12:00', '14:30', '15:30', '16:30'];
const priceData = [156.0, 157.5, 158.0, 159.5, 158.5, 159.0];
const chartSvgLine = computed(() => {
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: svgWidth,
    height: svgHeight,
  });

  chart.setOption({
    grid: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40,
    },
    xAxis: {
      type: 'category',
      data: timeLabels,
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#6b7280', fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      min: 'dataMin',
      splitLine: { show: true },
      axisLabel: { color: '#6b7280', fontSize: 10 },
    },
    series: [
      {
        data: priceData,
        type: 'line',
        smooth: false,
        lineStyle: { color: '#3b82f6', width: 2 },
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#3b82f6' },
      },
    ],
  });

  return chart.renderToSVGString();
});
// const chartSvgLineStack = computed(() => {
//   const chart = echarts.init(null, null, {
//     renderer: 'svg',
//     ssr: true,
//     width: svgWidth,
//     height: 300,
//   });

//   chart.setOption({
//     // title: {
//     //   text: 'Stacked Line',
//     // },
//     tooltip: {
//       trigger: 'axis',
//     },
//     legend: {
//       data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
//     },
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true,
//     },
//     toolbox: {
//       feature: {
//         saveAsImage: {},
//       },
//     },
//     xAxis: {
//       type: 'category',
//       boundaryGap: false,
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     },
//     yAxis: {
//       type: 'value',
//     },
//     series: [
//       {
//         name: 'Email',
//         type: 'line',
//         stack: 'Total',
//         areaStyle: {},
//         data: [120, 132, 101, 134, 90, 230, 210],
//       },
//       {
//         name: 'Union Ads',
//         type: 'line',
//         stack: 'Total',
//         areaStyle: {},
//         data: [220, 182, 191, 234, 290, 330, 310],
//       },
//       {
//         name: 'Video Ads',
//         type: 'line',
//         stack: 'Total',
//         areaStyle: {},
//         data: [150, 232, 201, 154, 190, 330, 410],
//       },
//       {
//         name: 'Direct',
//         type: 'line',
//         stack: 'Total',
//         areaStyle: {},
//         data: [320, 332, 301, 334, 390, 330, 320],
//       },
//       {
//         name: 'Search Engine',
//         type: 'line',
//         stack: 'Total',
//         areaStyle: {},
//         data: [820, 932, 901, 934, 1290, 1330, 1320],
//       },
//     ],
//   });

//   return chart.renderToSVGString();
// });

// const data = [
//   ['2000-06-05', 116],
//   ['2000-06-06', 129],
//   ['2000-06-07', 135],
//   ['2000-06-08', 86],
//   ['2000-06-09', 73],
//   ['2000-06-10', 85],
//   ['2000-06-11', 73],
//   ['2000-06-12', 68],
//   ['2000-06-13', 92],
//   ['2000-06-14', 130],
//   ['2000-06-15', 245],
//   ['2000-06-16', 139],
//   ['2000-06-17', 115],
//   ['2000-06-18', 111],
//   ['2000-06-19', 309],
//   ['2000-06-20', 206],
//   ['2000-06-21', 137],
//   ['2000-06-22', 128],
//   ['2000-06-23', 85],
//   ['2000-06-24', 94],
//   ['2000-06-25', 71],
//   ['2000-06-26', 106],
//   ['2000-06-27', 84],
//   ['2000-06-28', 93],
//   ['2000-06-29', 85],
//   ['2000-06-30', 73],
//   ['2000-07-01', 83],
//   ['2000-07-02', 125],
//   ['2000-07-03', 107],
//   ['2000-07-04', 82],
//   ['2000-07-05', 44],
//   ['2000-07-06', 72],
//   ['2000-07-07', 106],
//   ['2000-07-08', 107],
//   ['2000-07-09', 66],
//   ['2000-07-10', 91],
//   ['2000-07-11', 92],
//   ['2000-07-12', 113],
//   ['2000-07-13', 107],
//   ['2000-07-14', 131],
//   ['2000-07-15', 111],
//   ['2000-07-16', 64],
//   ['2000-07-17', 69],
//   ['2000-07-18', 88],
//   ['2000-07-19', 77],
//   ['2000-07-20', 83],
//   ['2000-07-21', 111],
//   ['2000-07-22', 57],
//   ['2000-07-23', 55],
//   ['2000-07-24', 60],
// ];
// const dateList = data.map(function (item) {
//   return item[0];
// });
// const valueList = data.map(function (item) {
//   return item[1];
// });
// const chartSvgLineGradient = computed(() => {
//   const chart = echarts.init(null, null, {
//     renderer: 'svg',
//     ssr: true,
//     width: svgWidth,
//     height: 400,
//   });

//   chart.setOption({
//     visualMap: [
//       {
//         show: false,
//         type: 'continuous',
//         seriesIndex: 0,
//         min: 0,
//         max: 400,
//       },
//       {
//         show: false,
//         type: 'continuous',
//         seriesIndex: 1,
//         dimension: 0,
//         min: 0,
//         max: dateList.length - 1,
//       },
//     ],
//     // title: [
//     //   {
//     //     left: 'center',
//     //     text: 'Gradient along the y axis',
//     //   },
//     //   {
//     //     top: '55%',
//     //     left: 'center',
//     //     text: 'Gradient along the x axis',
//     //   },
//     // ],
//     tooltip: {
//       trigger: 'axis',
//     },
//     xAxis: [
//       {
//         data: dateList,
//       },
//       {
//         data: dateList,
//         gridIndex: 1,
//       },
//     ],
//     yAxis: [
//       {},
//       {
//         gridIndex: 1,
//       },
//     ],
//     grid: [
//       {
//         bottom: '60%',
//       },
//       {
//         top: '60%',
//       },
//     ],
//     series: [
//       {
//         type: 'line',
//         showSymbol: false,
//         data: valueList,
//       },
//       {
//         type: 'line',
//         showSymbol: false,
//         data: valueList,
//         xAxisIndex: 1,
//         yAxisIndex: 1,
//       },
//     ],
//   });

//   return chart.renderToSVGString();
// });

// const chartSvgBar = computed(() => {
//   const chart = echarts.init(null, null, {
//     renderer: 'svg',
//     ssr: true,
//     width: svgWidth,
//     height: 450,
//   });

//   chart.setOption({
//     xAxis: {
//       type: 'category',
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     },
//     yAxis: {
//       type: 'value',
//     },
//     series: [
//       {
//         data: [120, 200, 150, 80, 70, 110, 130],
//         type: 'bar',
//         showBackground: true,
//         backgroundStyle: {
//           color: 'rgba(180, 180, 180, 0.2)',
//         },
//       },
//     ],
//   });

//   return chart.renderToSVGString();
// });
// const chartSvgBarStack = computed(() => {
//   const chart = echarts.init(null, null, {
//     renderer: 'svg',
//     ssr: true,
//     width: 450,
//     height: 450,
//   });

//   chart.setOption({
//     tooltip: {
//       trigger: 'axis',
//       axisPointer: {
//         type: 'shadow',
//       },
//     },
//     legend: {},
//     xAxis: [
//       {
//         type: 'category',
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//       },
//     ],
//     yAxis: [
//       {
//         type: 'value',
//       },
//     ],
//     series: [
//       {
//         name: 'Direct',
//         type: 'bar',
//         emphasis: {
//           focus: 'series',
//         },
//         data: [320, 332, 301, 334, 390, 330, 320],
//       },
//       {
//         name: 'Email',
//         type: 'bar',
//         stack: 'Ad',
//         emphasis: {
//           focus: 'series',
//         },
//         data: [120, 132, 101, 134, 90, 230, 210],
//       },
//       {
//         name: 'Union Ads',
//         type: 'bar',
//         stack: 'Ad',
//         emphasis: {
//           focus: 'series',
//         },
//         data: [220, 182, 191, 234, 290, 330, 310],
//       },
//       {
//         name: 'Video Ads',
//         type: 'bar',
//         stack: 'Ad',
//         emphasis: {
//           focus: 'series',
//         },
//         data: [150, 232, 201, 154, 190, 330, 410],
//       },
//       {
//         name: 'Search Engine',
//         type: 'bar',
//         data: [862, 1018, 964, 1026, 1679, 1600, 1570],
//         emphasis: {
//           focus: 'series',
//         },
//         markLine: {
//           lineStyle: {
//             type: 'dashed',
//           },
//           data: [[{ type: 'min' }, { type: 'max' }]],
//         },
//       },
//       {
//         name: 'Baidu',
//         type: 'bar',
//         barWidth: 5,
//         stack: 'Search Engine',
//         emphasis: {
//           focus: 'series',
//         },
//         data: [620, 732, 701, 734, 1090, 1130, 1120],
//       },
//       {
//         name: 'Google',
//         type: 'bar',
//         stack: 'Search Engine',
//         emphasis: {
//           focus: 'series',
//         },
//         data: [120, 132, 101, 134, 290, 230, 220],
//       },
//       {
//         name: 'Bing',
//         type: 'bar',
//         stack: 'Search Engine',
//         emphasis: {
//           focus: 'series',
//         },
//         data: [60, 72, 71, 74, 190, 130, 110],
//       },
//       {
//         name: 'Others',
//         type: 'bar',
//         stack: 'Search Engine',
//         emphasis: {
//           focus: 'series',
//         },
//         data: [62, 82, 91, 84, 109, 110, 120],
//       },
//     ],
//   });

//   return chart.renderToSVGString();
// });
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Echarts" />
    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <view class="p-4 flex flex-col gap-2 justify-center bg-card">
        <BaseAlert
          variant="destructive"
          title="Under Construction"
          description="This echart crash on mobile"
        >
        </BaseAlert>

        <!--  <text class="text-muted">Line</text>
        <svg
          :content="chartSvgLine"
          class="border border-border"
          :style="{ width: '100%', height: '250px' }"
        ></svg>

        <text class="text-muted mt-[14px]">Line stack</text>
        <svg
          :content="chartSvgLineStack"
          class="border border-border"
          :style="{ width: '100%', height: '300px' }"
        ></svg>

        <text class="text-muted mt-[14px]">Line gradient</text>
        <svg
          :content="chartSvgLineGradient"
          class="border border-border"
          :style="{ width: '100%', height: '400px' }"
        ></svg>

        <text class="text-muted mt-[14px]">Bar</text>
        <svg
          :content="chartSvgBar"
          class="border border-border"
          :style="{ width: '100%', height: '350px' }"
        ></svg>

        <text class="text-muted mt-[14px]">Bar stack</text>
        <svg
          :content="chartSvgBarStack"
          class="border border-border"
          :style="{ width: '100%', height: '350px' }"
        ></svg> -->
      </view>
    </scroll-view>
  </view>
</template>
