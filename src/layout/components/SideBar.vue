<template>

  <div class="nav_logo" :class="{'activation':!isCollapse,'close':isCollapse}">
    <img src="../../assets/logo.png">
    <span
      :class="{'span-activation':!isCollapse,'span-close':isCollapse}">开发控制台</span>
  </div>
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
      defaultActive.value = routes[0].path
    } else {
      let matched = route.matched.filter((item) => item.meta && item.meta.title)
      defaultActive.value = matched[0].path
    }
    return { isCollapse, routes, defaultActive }
  }
})
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  height: calc(100% - 60px);
  border-right: 0px solid;
}
.el-menu-vertical-activation:not(.el-menu--collapse) {
  width: 200px;
  height: calc(100% - 60px);
}
.el-menu-vertical-close:not(.el-menu-vertical-activation) {
  height: calc(100% - 60px);
}
.nav_logo {
  width: 200px;
  height: 60px;
  background: #2d2d3e;
  text-align: center;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  img {
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }
  span {
    display: inline-block;
    margin: 0;
    color: #fff;
    line-height: 50px;
    font-size: 16px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
    padding-left: 6px;
    padding-right: 6px;
    overflow: hidden;
  }
  .span-activation {
    opacity: 1;
    transition: opacity 1.3s;
  }
  .span-close {
    opacity: 0;
    width: 0;
    padding: 0;
    transition: opacity 0.375s;
  }
}
.activation {
  width: 200px;
  transition: width 0.375s;
}
.close {
  width: 64px;
  transition: width 0.375s;
}
</style>
