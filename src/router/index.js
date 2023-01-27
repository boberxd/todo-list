import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/list',
        name: '',
        component: () => import('@/views/TodoList/index.vue'),
        children: [
          {
            path: '',
            name: 'TodoList',
            component: () => import('@/views/TodoList/TodoList.vue'),
          },
          {
            path: '/list/add',
            name: 'CreateTask',
            component: () => import('@/views/CreateTask.vue')
          },
          {
            path: '/list/:id',
            name: 'TaskInfo',
            component: () => import('@/views/TodoList/TaskInfo/TaskInfo.vue')
          },
          {
            path: '/list/:id/edit',
            name: 'TaskEdit',
            component: () => import('@/views/TodoList/TaskEdit/TaskEdit.vue')
          },
          {
            path: '/deleted-tasks',
            name: 'DeletedTasks',
            component: () => import('@/views/DeletedTasks/DeletedTasks.vue')
          }
        ]
      },
      
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
