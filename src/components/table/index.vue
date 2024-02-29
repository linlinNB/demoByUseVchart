<template>
  <view :class="styles.commonTableContainer">
    <nut-table
      :columns="columns"
      :data="props.data"
    ></nut-table>
  </view>
</template>

<script setup>
import { watch, defineProps, ref, h, createVNode, render, computed } from 'vue'
import styles from  './index.module.scss'

const columns = ref([]);


const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  }
})

watch((data, preData) => {
  // 读取自定义配置，比如首列要按照设计稿变成灰色
  // return [];
  const res =  (props?.columns || []).map(item => {
    if (item?.isShowStriped) {
      item.stylecolumn = 'background: #F2F2F2; color: #999999;'
      // const preRender = item?.render || null;
      // // 如果要变成灰色，直接覆盖render方法
      // item.render = (data) => {
      //   return createVNode(CustomTableCell, {
      //     column: item,
      //     data: data,
      //   }, preRender ? preRender.bind(this, data) : (data?.[item.key] || ''));
      // }
    }
    return item;
  })

  columns.value = [...res];

}, [props.columns], {
  deep: true,
  immediate: true,
})

</script>
