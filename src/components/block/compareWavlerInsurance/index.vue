<template>
  <view :class="styles.compareWavlerInsuranceBlockContainer">
    <view>{{ productInfo.name }}</view>
    <view>{{ productInfo.condition }}</view>
    <view>{{ productInfo.timeRange }}</view>
  </view>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import styles from "./index.module.scss"

defineProps({
  productInfo: {
    type: Object,
    default: () => ({
      name: '爱心人寿守护终身寿',
        condition: '男30岁',
        timeRange: '5年缴'
    })
  }
})

</script>
