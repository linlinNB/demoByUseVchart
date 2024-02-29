<template>
  <view :class="styles.basicBlockContainer">
    <!--  title可以传递名字，或者直接使用插槽  -->
    <view v-if="props?.title" :class="styles.title">
      {{ props.title }}
    </view>
    <view v-else>
      <slot name="title"></slot>
    </view>

    <view :class="styles.blockContent">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import styles from "./index.module.scss"
import {
  defineProps,
} from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
})
</script>
