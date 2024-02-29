<template>
  <view :class="styles.wavlerinsuranceDetailContainer">
    <!--  每年限额  -->
    <view :class="styles.group">
      <view :class="styles.title">开始时间</view>
      <view>{{ props.wavlerInsuranceInfo.startDate }}</view>
    </view>

    <!--  每年限额  -->
    <view>
      <view :class="styles.title">每年限额</view>
      <view>{{ props.wavlerInsuranceInfo.limitedMoney }}</view>
    </view>

    <nut-button :class="styles.btnGroup" type="info" size="mini">减保</nut-button>
  </view>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import styles from "./index.module.scss"

const props = defineProps({
  wavlerInsuranceInfo: {
    type: Object,
    default: () => ({
      startDate: '第五年',
      otherCondition: '无限制',
      condition: '生效时保额（年度）20%',
    })
  }
})


</script>
