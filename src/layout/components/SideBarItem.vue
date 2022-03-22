<template>
  <el-sub-menu v-if="isShowChildren(item) && !item.hidden" :index="item.path">
    <template #title>
      <el-icon>
        <component :is="(item.meta && item.meta.icon) || 'folder'" />
      </el-icon>
      <span>{{ item.meta && item.meta.title}}</span>
    </template>
    <el-menu-item-group>
      <SideBarItem v-for="child in item.children" :item="child"
        :basePath="item.path" :key="child.path">
      </SideBarItem>
    </el-menu-item-group>
  </el-sub-menu>
  <el-menu-item v-if="!isShowChildren(item) && !item.hidden" :index="item.path">
    <el-icon>
      <component :is="(item.meta && item.meta.icon) || 'folder'" />
    </el-icon>
    <template #title>
      <span>{{ item.meta && item.meta.title}}</span>
    </template>
  </el-menu-item>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
export default defineComponent({
  name: 'SideBarItem',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String
    }
  },
  setup(props) {
    let propss = toRefs(props)
    const resolvePath = (routePath: string) => {
      if (propss.basePath) {
        return propss.basePath + '/' + routePath
      } else {
        return routePath
      }
    }

    const isShowChildren = (item: any) => {
      // 默认展示子级
      let is: boolean = true
      if (item.children && item.children.length > 0) {
        let children = item.children
        const showingChildren = children.filter((i: any) => {
          if (i.hidden) {
            return false
          } else {
            return true
          }
        })
        // 仅存在一个展示的子级时比对是否重定向
        if (showingChildren.length === 1 && item.redirect) {
          let topath = item.path + '/' + showingChildren[0].path
          if (
            item.redirect === topath ||
            item.redirect === showingChildren[0].path
          ) {
            is = false
          }
        }
        // 没有子集展示时
        if (showingChildren.length === 0) {
          is = false
        }
      } else {
        is = false
      }
      return is
    }

    return {
      isShowChildren,
      resolvePath
    }
  }
})
</script>
<style lang="scss" scoped></style>