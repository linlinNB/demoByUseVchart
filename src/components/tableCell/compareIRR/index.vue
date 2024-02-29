<template>
  <view :class="styles.compareIRRTableCellContainer">
    <view
      :class="props.record.isWarning && styles.warning"
    >
      {{ props.record?.irr || '- -' }}
    </view>
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
