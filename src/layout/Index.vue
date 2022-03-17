<template>
  <el-container class="layout">
    <el-container>
      <el-aside :width="asideWidth">
        <SideBar></SideBar>
      </el-aside>
      <el-container>
        <el-header>
          <Navbar></Navbar>
        </el-header>
        <el-main>
          <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import SideBar from './components/SideBar.vue'
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'

export default defineComponent({
  components: {
    SideBar,
    Navbar,
    AppMain
  },
  setup() {
    const store = useStore()
    const title = computed(() => store.state.serviceName)
    const isCollapse = computed(() => store.state.layout.isCollapse)
    const asideWidth = computed(() =>
      store.state.layout.isCollapse ? '65px' : '201px'
    )
    console.log(title.value)
    return { title, asideWidth }
  }
})
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  :deep(.el-header) {
    padding: 0;
  }
  .el-aside {
    transition: all 0.3s;
    border-right: 1px solid #dcdfe6;
    overflow-x: hidden;
  }
}
</style>
