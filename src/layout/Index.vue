<template>
  <el-container class="layout">
    <el-header>
      <Navbar></Navbar>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideBar></SideBar>
      </el-aside>
      <el-main>
        <AppMain></AppMain>
      </el-main>
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
    console.log(title.value)
    return { title }
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
}
</style>
