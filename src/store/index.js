import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    taskForm: {
      id: null,
      status: null,
      text: null,
      isDeleted: false,
      date: null,
    }
  },
  mutations: {
    setTaskFormFieldValue (state, payload) {
      state.taskForm[payload.field] = payload.newValue
    },

    clearTaskFormFieldValues (state) {
      state.taskForm = {
        id: null,
        status: null,
        text: null,
        isDeleted: false,
        date: null,
      }
    },

    saveTask (state, payload) {
      state.list.splice(payload.index, 1, payload.newTask)
    },

    removeTask (state, payload) {
      state.list.splice(payload.index, 1, {...payload.task, isDeleted: true})
    },

    createTask (state, payload) {
      state.list.push(payload)
    }
  },
})
