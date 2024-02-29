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
import { ref } from 'vue';
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

// 设置标记处理
const getMarkLineStyleConfig = (fill) => ({
  endSymbol: {
    style: {
      angle: 180,
      fill,
      dy: -5
    }
  },
  label: {
    dx: -4,
    // dy: -20,
    dy: -12,
    width: 28,
    labelBackground: {
      padding: 4,
      style: {
        fill,
        borderRadius: 5
      }
    },
    style: {
      fill: '#fff',
      fontSize: 8,
      fontWeight: 400,
    }
  }
})

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

const getMarkLineConfigListByDataSource = (dataSource = []) => {
  const rateConfig = [2, 3, 4, 5, 6];
  const recordRateByKeyMap = new Map();
  const res = dataSource.reduce((preItem, currItem, index) => {
    const currRate = Math.ceil(currItem.value / currItem.initValue);
    // 初始化record
    if (!recordRateByKeyMap.has(currItem.key)) {
      recordRateByKeyMap.set(currItem.key, []);
    }
    if (rateConfig.find(item => item === currRate)) {
      const fillColor = currItem.key === 1 ? '#1777FF' : '#00DB8B';
      const markLineStyleConfig = getMarkLineStyleConfig(fillColor)
      // 抽取当前标记区间
      const config = {
        ...markLineStyleConfig,
        label: {
          text: `x${currRate}`,
          ...markLineStyleConfig.label
        },
        coordinates: [
          {
            time: currItem.time,
            value: 0
          },
          {
            time: currItem.time,
            value: currItem.value,
          }
        ],
        line: {
          style: {
            opacity: 0,
          }
        }
      }
      // 判断当前是否重复
      if (!recordRateByKeyMap.get(currItem.key).includes(currRate)) {
        recordRateByKeyMap.set(currItem.key, [...recordRateByKeyMap.get(currItem.key), currRate])
        preItem.push(config);
      }
    }
    return preItem;
  }, []);
  return res;
}

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
    line: {
      style: {
        curveType: 'monotone',
        lineWidth: 2,
        stroke: datum => {
          if (datum.key === 1) {
            return '#1777FF';
          }
          if (datum.key === 2) {
            return '#00DB8B';
          }
        },
      }
    },
    point: {
      style: {
        size: 0,
        fill: 'white',
        stroke: null,
      },
      // state: {
      //   myCustomState: {
      //     size: 10
      //   }
      // }
    },
    area: {
      style: {
        fillOpacity: 0,
        shadowColor: 'rgba(0,0,0,.2)',
        shadowOpacity: 0.4,
        shadowBlur: 4,
        shadowOffsetY: 4,
        stroke: datum => {
          if (datum.key === 1) {
            return '#1777FF';
          }
          if (datum.key === 2) {
            return '#00DB8B';
          }
        },
      },
    },
    legends: [
      {
        visible: true,
        position: 'middle',
        orient: 'bottom',
        // item: { shape: { style: { symbolType: 'roundLine' } } }
      }
    ],
    // 设置倍率标注
    markLine: getMarkLineConfigListByDataSource(mockData.values),
    // 自定义tooltip
    tooltip: {
      mark: {
        content: [
          {
            key: datum => datum.name,
            value: datum => datum.value,
            // shapeLineWidth: 0.1,
            // shapeColor: 'white',
            shapeType: 'circle'
          }
        ]
      },
      style: {
        panel: {
          padding: [8, 10],
          backgroundColor: '#fff',
          shadow: {
            color: 'rgba(0,0,0,0.15)',
            x: 0,
            y: 0,
            blur: 10,
            spread: 5,
          }
        },
        titleLabel: {
          fontSize: 16,
          fontFamily: 'PingFangSC, PingFang SC',
          fill: '#1777FF',
          fontWeight: 500,
        },
        keyLabel: {
          fontSize: 16,
          fontFamily: 'Times New Roman',
          fill: '#333333',
          fontWeight: 400,
          spacing: 10
        },
        valueLabel: {
          fontSize: 16,
          fill: '#333333',
          fontWeight: 400,
          spacing: 10
        },
      }
    }
  };
  return spec;
}

useReady(() => {
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
        // dpr: 2,
      });
      vchart.renderAsync();
      // 自定义处理点击交互
      vchart.on('dimensionClick', {}, params => {
        vchart.updateState({
          myCustomState: {
            filter: datum => {
              return datum.type === params.dimensionInfo[0]?.value;
            }
          }
        });
      });
    }
  });
})
</script>

<template>
  <view :class="styles.lineChartContainer">
    <canvas
        type="2d"
        :canvasId="`${props.canvasId}Tooltip`"
        :id="`${props.canvasId}Tooltip`"
        :class="styles.style_cs_tooltip_canvas"
    ></canvas>
<!--    width="100%"-->
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
