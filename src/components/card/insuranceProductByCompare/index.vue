<template>
  <view :class="[styles.insuranceProductByCompareContainer, props?.isEmpty ? styles.emptyInsurance : '']">
    <view v-if="props.isEmpty">
      <view>图标</view>
      <view>
        最多添加三个
      </view>
    </view>

    <view v-else :class="styles.insuranceName">
      {{ props?.insuranceInfo?.name || '' }}
    </view>
  </view>
</template>

<script setup>
import styles from "./index.module.scss"
import {
  defineProps,
} from 'vue';

const props = defineProps({
  isEmpty: {
    type: Boolean,
    default: false,
  },
  insuranceInfo: {
    type: Object,
    default: () => ({
      name: '测试产品标题',
    })
  }
})
</script>
