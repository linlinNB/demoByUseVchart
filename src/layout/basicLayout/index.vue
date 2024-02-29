<template>
  <view
      :class="[styles.basicLayoutContainer, props.class]"
      :style="{ minHeight: `${pageMinHeight}px`}"
  >
    <slot></slot>
  </view>
</template>

<script setup>
import styles from './index.module.scss'
import * as Utils from '../../utils';
import { useDidShow } from '@tarojs/taro';

const props = defineProps({
  class: {
    type: Object,
    default: () => {},
  }
})

useDidShow(() => {
})

const pageMinHeight = Utils.getPageMinHeight();
</script>
