<template>
  <div class="nav">
    <el-icon class="nav_icon" @click="changeCollapse">
      <Expand v-if="isCollapse" />
      <Fold v-else />
    </el-icon>

    <el-breadcrumb separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path"
          :to="{ path: item.path }">{{item.meta.title}}</el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>

  </div>

</template>
<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

interface BreadcrumbItem {
  path: string
  name: any
  [propName: string]: any
}

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()

    let breadcrumb = ref<BreadcrumbItem[]>([])

    const getBreadcrumb = () => {
      let matched = route.matched.filter((item) => item.meta && item.meta.title)
      breadcrumb.value = matched
    }

    let isCollapse = computed(() => store.state.layout.isCollapse)
    const changeCollapse = () => {
      store.commit('layout/SET_IS_COLLAPSE', !isCollapse.value)
    }

    watch(
      () => route.path,
      (n, o) => {
        getBreadcrumb()
      }
    )
    getBreadcrumb()
    return {
      isCollapse,
      changeCollapse,
      breadcrumb
    }
  }
})
</script>
<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;
  &_icon {
    height: 100%;
    width: 4rem;
    color: #4b505f;
    font-size: 1.5rem;
    cursor: pointer;
    &:hover {
      background: #f8f8f8;
    }
  }
}
</style>