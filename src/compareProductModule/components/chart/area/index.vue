<script setup>
import { registerWXEnv, vglobal } from '@visactor/vchart';
import { VChart } from '@visactor/vchart/esm/core';
import { registerAreaChart } from '@visactor/vchart/esm/chart';

import {
  registerCartesianLinearAxis,
  registerCartesianBandAxis,
  registerTooltip,
  registerCartesianCrossHair
} from '@visactor/vchart/esm/component';

import Taro from '@tarojs/taro';
import { ref, defineProps } from 'vue';
import { useDidShow, useReady, useLoad  } from '@tarojs/taro';
import styles from './index.module.scss';
import mockData from './mockData';

registerWXEnv();

// 注册图表和组件
VChart.useRegisters([
  registerAreaChart,
  registerCartesianLinearAxis,
  registerCartesianBandAxis,
  registerTooltip,
  registerCartesianCrossHair
]);

const props = defineProps({
  canvasId: {
    type: String,
    default: 'chartId',
  }
})

const defaultVtChartConfig = {
  mode: 'wx',
  modeParams: {
    force: true, // 是否强制使用 canvas 绘制
    canvasIdLists: [props.canvasId, `${props.canvasId}Tooltip`, `${props.canvasId}Hidden`], // canvasId 列表
    tooltipCanvasId: `${props.canvasId}Tooltip`, // tooltip canvasId
    freeCanvasIdx: 2 // 自由 canvas 索引
  },
  renderCanvas: props.canvasId,
  dpr: Taro.getSystemInfoSync().pixelRatio,
}

const chartContainer = ref(null);
let vchart = null;
const handleEvent = (event) => {
  if (vchart) {
    Object.defineProperty(event, 'chart', {
      writable: false,
      value: vchart.getCanvas() // Tip: 必须设置
    });
    vchart.getStage().window.dispatchEvent(event);
  }
};


const getDomRef = async () => {
  return new Promise(resolve => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery()
          .select(`#${props.canvasId}`)
          .boundingClientRect(domref => {
            resolve(domref);
          })
          .exec();
    });
  });
};

const getChartSpec = () => {
  const spec = {
    type: 'area',
    data: mockData,
    title: {
      visible: false,
    },
    stack: false,
    xField: 'time',
    yField: 'value',
    seriesField: 'name',
    background: {
      fillOpacity: 0,
    },
    color: ['#1777FF', '#00DB8B'],
    line: {
      style: {
        curveType: 'monotone',
        lineWidth: 2,
      }
    },
    point: {
      style: {
        size: 0,
        fill: 'white',
        stroke: null,
      },
    },

    area: {
      style: {
        fillOpacity: 1,
        fill: {
          gradient: 'linear',
          x0: 0.5,
          y0: 0,
          x1: 0.5,
          y1: 1,
          stops: [
            {
              offset: 0,
              opacity: 0.6
            },
            {
              offset: 0.9,
              opacity: 0
            }
          ]
        },
      },
    },
    legends: [
      {
        visible: false,
        position: 'middle',
        orient: 'bottom',
      }
    ]
  };
  return spec;
}

useReady(() => {
  setTimeout(() => {
    Taro.nextTick(async () => {
      if (chartContainer?.value) {
        const spec = getChartSpec();
        const domRef = await getDomRef();
        domRef.id = props.canvasId;
        registerWXEnv();
        await vglobal.setEnv('wx', {
          domref: domRef,
          force: true,
          canvasIdLists: [props.canvasId, `${props.canvasId}Tooltip`, `${props.canvasId}Hidden`],
          freeCanvasIdx: 2,
          component: undefined
        })
        vchart = new VChart(spec,{
          ...defaultVtChartConfig,
          modeParams: {
            ...defaultVtChartConfig.modeParams,
            domref: domRef,
          },
          renderCanvas: props.canvasId,
        });
        vchart.renderAsync();
        console.log('----  setting chart ---- ', vchart);
      }
    });
  }, 1000);
})
</script>

<template>
  <view :class="styles.areaChartContainer">
    <canvas
        type="2d"
        :canvasId="`${props.canvasId}Tooltip`"
        :id="`${props.canvasId}Tooltip`"
        :class="styles.style_cs_tooltip_canvas"
    ></canvas>
    <canvas
        type="2d"
        ref="chartContainer"
        :canvasId="props.canvasId"
        :id="props.canvasId"
        height="400rpx"
        width="100%"
        @touchstart="handleEvent"
        @touchmove="handleEvent"
        @touchend="handleEvent"
    ></canvas>
    <canvas
        type="2d"
        :canvasId="`${props.canvasId}Hidden`"
        :id="`${props.canvasId}Hidden`"
        :class="[styles.style_cs_canvas, styles.style_cs_canvas_hidden]"
    ></canvas>
  </view>
</template>

<style scoped>

</style>
