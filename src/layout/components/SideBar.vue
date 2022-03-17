<template>
  <el-menu :default-active="defaultActive" class="el-menu-vertical"
    :class="{'el-menu-vertical-activation':!isCollapse,'el-menu-vertical-close':isCollapse}"
    :collapse="isCollapse" router>
    <SideBarItem v-for="item in routes" :item="item" :key="item.path">
    </SideBarItem>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import router from '../../router'
import { useRoute } from 'vue-router'
import SideBarItem from './SideBarItem.vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting
} from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    Location,
    Document,
    IconMenu,
    Setting,
    SideBarItem
  },
  setup() {
    let defaultActive = ref()
    const store = useStore()
    const routes = router.options.routes
    const isCollapse = computed(() => store.state.layout.isCollapse)
    const route = useRoute()
    if (route.path === '' || route.path === '/') {
      defaultActive.value = routes[0]?.path
    } else {
      defaultActive.value = route.path
    }
    return { isCollapse, routes, defaultActive }
  }
})
</script>

<style lang="scss" scoped>
.el-menu-vertical-activation:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.el-menu-vertical-close:not(.el-menu-vertical-activation) {
  height: 100%;
}
</style>
