<template>
  <transition name="fade-transform" mode="out-in">
    <router-view :key="key" />
  </transition>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const route = useRoute()
    const key = computed(() => route.path)
    return {
      key
    }
  }
})
</script>

