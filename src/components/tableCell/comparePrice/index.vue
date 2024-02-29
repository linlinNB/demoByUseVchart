<template>
  <view :class="styles.comparePriceTableCell">
    <view
      :class="props.record?.isWarning && styles.warning"
    >
      {{ props.record?.price }}
    </view>
    <!--  倍率标签  -->
    <nut-tag
      v-if="props?.record?.rate"
      color="#61C963"
      size="mini"
    >
      {{ props.record?.rate ? `x${props.record?.rate}` : `` }}
    </nut-tag>
    <!--      40岁等特殊标签-->
    <nut-tag
      v-if="props.record?.tagList?.length"
      v-for="tagItem in props?.record?.tagList"
      plain
      color="#DDDDDD"
      type="primary"
      size="mini"
    >
      {{ tagItem }}
    </nut-tag>
  </view>
</template>

<script setup>
import styles from "./index.module.scss"
import {
  defineProps,
} from 'vue';

const props = defineProps({
  record: {
    type: Object,
    default: () => {}
  }
})
</script>
