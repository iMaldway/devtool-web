<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from './router'

import Address from './utils/Address'

export default defineComponent({
  setup() {
    console.log('--应用启动--')
    const routes = router.options.routes
    let hash = window.location.hash
    const address = new Address()
    if (hash === '' || hash === '#/') {
      router.push({ path: routes[0].path })
    } else {
      let nowHash = hash.replace('#', '')
      router.push({ path: nowHash, query: address.getURLParameter() })
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
