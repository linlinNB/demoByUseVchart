<template>
  <view :class="styles.selectAndCompareInsuranceContainer">
    <view
        :class="styles.listItem"
        v-for="insuranceInfoItem in state.insuranceInfoList"
    >
      <InsuranceProductCardByCompare
          :insurance-info="insuranceInfoItem.insuranceInfo"
          :is-empty="insuranceInfoItem.isEmpty"
      />
    </view>
  </view>
</template>

<script setup>
import styles from "./index.module.scss"
import {
  defineProps,
    reactive,
} from 'vue';
import InsuranceProductCardByCompare from '../../card/insuranceProductByCompare';

const state = reactive({
  insuranceInfoList: new Array(3).fill(1).reduce((preItem, currItem, index) => {
    const res = {
      isEmpty: false,
      insuranceInfo: {
        name: '我是谁？我是你爸爸'
      }
    }
    if (index === 2) {
      res.isEmpty = true;
    }
    preItem.push(res);
    return preItem;
  }, []),
})

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
