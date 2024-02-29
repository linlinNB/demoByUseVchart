<template>
  <BasicLayout :class="styles.compareInsuranceContainer">
    <BasicCard
        :class="styles.compareCardGroup"
    >
      <template #title>
        <view :class="styles.chartHeaderGroup">
          <view :class="styles.title">
          </view>

          <view :class="styles.legendGroup">
            <view :class="styles.legendList">
              <view>爱心人寿守护</view>
              <view>渤海人寿</view>
              <view>陆家嘴人寿</view>
            </view>
          </view>
        </view>
      </template>
      <view>
        <LineChart
            canvas-id="compareValue"
        />
      </view>
    </BasicCard>


    <BasicCard
        :class="styles.compareCardGroup"
    >
      <template #title>
        <view :class="styles.chartHeaderGroup">
          <view :class="styles.title">
          </view>

          <view :class="styles.legendGroup">
            <view :class="styles.legendList">
              <view>爱心人寿守护</view>
              <view>渤海人寿</view>
              <view>陆家嘴人寿</view>
            </view>
          </view>
        </view>
      </template>
      <view>
        <AreaAndLineChart
            canvas-id="compareIRR"
        />
      </view>
    </BasicCard>


    <BasicCard
        :class="styles.compareCardGroup"
    >
      <template #title>
        <view :class="styles.chartHeaderGroup">
          <view :class="styles.title">
          </view>

          <view :class="styles.legendGroup">
            <view :class="styles.legendList">
              <view>爱心人寿守护</view>
              <view>渤海人寿</view>
              <view>陆家嘴人寿</view>
            </view>
          </view>
        </view>
      </template>
      <view>
        <AreaAndLineChart
            canvas-id="compareMakeMoney"
        />
      </view>
    </BasicCard>
  </BasicLayout>
</template>

<script setup>
import BasicLayout from '../../layout/basicLayout/index.vue';
import styles from "./index.module.scss";
import BasicCard from "../../components/card/basicCard/index.vue";

import AreaAndLineChart from '../../components/chart/area/index.vue';
import LineChart from '../../components/chart/line/index.vue';

</script>
