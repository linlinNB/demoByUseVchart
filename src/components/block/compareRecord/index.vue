<template>
  <view :class="styles.compareRecordBlockContainer">
    <view
      v-for="(item, index) in dataSource"
      :class="styles.name"
    >
      {{ item.name }}
    </view>
  </view>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import styles from "./index.module.scss"

defineProps({
  dataSource: {
    type: Array,
    default: () => [
      {
        name: '爱心人寿守护终身寿',
        timeRange: '20',
        price: '1万元'
      },
      {
        name: '财信人寿传家保险2023终身人寿',
        timeRange: '18',
        price: '1万元'
      },
      {
        name: '财信人寿传家保险2023终身人寿',
        timeRange: '18',
        price: '1万元'
      }
    ]
  }
})

</script>
