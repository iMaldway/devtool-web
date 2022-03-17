<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import router from './router'
export default defineComponent({
  setup() {
    console.log('--应用启动--')
    const route = useRoute()
    const routes = router.options.routes
    if (route.path === '' || route.path === '/') {
      router.push({ path: routes[0].path })
    }
    return {}
  }
})
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
