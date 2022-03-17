<template>
  <div class="nav">
    <div class="nav_logo"
      :class="{'activation':!isCollapse,'close':isCollapse}">
      <img src="../../assets/logo.png">
      <span
        :class="{'span-activation':!isCollapse,'span-close':isCollapse}">开发控制台</span>
    </div>
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
  .activation {
    width: 200px;
    transition: width 0.375s;
  }
  .close {
    width: 64px;
    transition: width 0.375s;
  }
  &_logo {
    width: 200px;
    height: 100%;
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