<template>
  <template v-if="!props.tree.children || props.tree.children.length<=0">
    <a-menu-item :key="props.tree.meta.title" @click="$router.push(props.tree.path)">
      <template #icon>
        <home-outlined/>
      </template>
      <span>{{ props.tree.meta.title }}</span>
    </a-menu-item>
  </template>
  <template v-else>
    <a-sub-menu :key="props.tree.meta.title">
      <template #icon>
        <menu-outlined/>
      </template>
      <template #title>{{ props.tree.meta.title }}</template>
      <menu-item v-for="(item,index) in props.tree.children" :key="index" :tree="item"></menu-item>
    </a-sub-menu>
  </template>

</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tree: {
    type: Object,
    default: () => ({})
  }
})
</script>
<style lang="scss" scoped>

</style>
