<template>
  <nut-tag
    :color="getTagBgColor"
  >
    {{text}}
  </nut-tag>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'add',
  },
  text: {
    type: String,
    default: '+1',
  }
})


const getTagBgColor = computed(() => {
  switch (props.type) {
    case 'add':
      return ' #61C963;';
      break;

    case 'substract':
      return '#FA685D';
      break;
  }
}, [props.type]);
</script>
