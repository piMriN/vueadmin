<template>
  <template v-if="!props.data.children || props.data.children.length <= 0">
    <el-menu-item :index="props.data.path">
      <el-icon>
        <svg-icon :icon="props.data.meta.icon"></svg-icon>
      </el-icon>
      <span>{{ props.data.meta.title }}</span>
    </el-menu-item>
  </template>

  <template v-else>
    <el-sub-menu :index="props.data.path">
      <template #title>
        <el-icon>
          <el-icon>
            <svg-icon :icon="props.data.meta.icon"></svg-icon>
          </el-icon>

        </el-icon>
        <span>{{ props.data.meta.title }}</span>
      </template>
      <sidebarmenus v-for="(item, index) in props.data.children" :key="index" :data="item"></sidebarmenus>

    </el-sub-menu>
  </template>

</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {
    }
  }
})
console.log(props.data, 'data')
</script>

<style lang="scss" scoped>
.el-menu--vertical {
  height: 100%;
  width: 100%;
}
</style>
