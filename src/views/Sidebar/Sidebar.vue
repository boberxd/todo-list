<template>
  <nav class="sidebar">
    <div v-for="(item, index) in sidebarList" :key="index" class="sidebar__item" @click="goToRoute(item)">
      <div class="sidebar__item-title">
        {{ item.title }}
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      sidebarList: [
        {
          title: 'List',
          routeName: 'TodoList'
        },
        {
          title: 'Create Task',
          routeName: 'CreateTask'
        },
        {
          title: 'Deleted Tasks',
          routeName: 'DeletedTasks'
        }
      ]
    }
  },
  methods: {
    goToRoute (item) {
      this.$router.push({ name: item.routeName }).catch(()=>{});
    }
  }
}
</script>

<style>
.sidebar {
  height: 100vh;
  width: 25%;
  background-color: #e9e9e9;
  border-right: #ebebeb 1px solid;

  display: flex;
  justify-content: center;
  flex-direction: column;
}

.sidebar__item {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4c4c4c;
  font-weight: normal;
  font-size: 18px;
  transition: color .1s, font-size .1s, fill .5s;
  text-align: center;
}

.sidebar__item-title {
  padding-top: 5px;
  min-width: 100px;
}

.sidebar__item:hover {
  color: black;
  cursor: pointer;
}
</style>