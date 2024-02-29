<template>
  <view :class="styles.compareInsuranceBlockContainer">
    <view
      :class="styles.rowGroup"
      v-for="columnConfigItem in props.columns"
    >
      <view :class="styles.columnItem">
        {{ columnConfigItem?.title || '-' }}
      </view>


      <view
        :class="styles.dataItem"
        v-for="dataItem in props.dataSource"
      >
        <view v-if="columnConfigItem?.isScope">
          <slot
            :name="columnConfigItem?.key"
            :record="dataItem[columnConfigItem?.key]"
          />
        </view>

        <view v-else>
          {{ dataItem[columnConfigItem?.key] }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, defineProps, createVNode, nextTick, render } from 'vue';
import styles from "./index.module.scss"

const props = defineProps({
  columns: {
    type: Array,
    default: () => ([])
  },
  dataSource: {
    type: Array,
    default: () => ([])
  }
})

const getColumnConfigByKey = (key) => {
  return props.columns.find(item => item.key === key);
}

</script>
