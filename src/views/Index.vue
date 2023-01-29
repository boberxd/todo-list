<template>
  <div class="main">
    <div class="main__container">
      <sidebar />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

import Sidebar from '@/views/Sidebar/Sidebar.vue'

export default {
  name: 'Index',
  components: {
    Sidebar
  },
}
</script>

<style>
.content {
  width: 75%;
  background-color: #e1e1e1;
  padding: 15px;
  max-height: 100vh;
}
.main__container {
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
}
</style>
