<template>
  <div class="info">
    <h1>Task Info</h1>
    <drop-down-list-select 
      :value="taskForm.status"
      :items="[{id: 'IN_PROGRESS', text: 'Выполняется'}, {id: 'COMPLETED', text: 'Выполнена'}, {id: 'EXECUTE', text: 'Выполнить'}]"
      :disabled="true"
    />

    <div class="navigation">
      <div class="navigation__textfield">
        <text-field 
          :disabled="true"
          :value="taskForm.text"
          @input="setTaskFormFieldValue({ field: 'text', newValue: $event })"
        />
      </div>
      
      <div v-if="!currentTask.isDeleted" class="navigation__button">
        <button-component 
          title="Remove"
          @click="confirmRemove()"
        />
      </div>

      <div v-if="!currentTask.isDeleted" class="navigation__button">
        <button-component 
          title="Edit"
          @click="$router.push({ name: 'TaskEdit', params: {id: $route.params.id} })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DropDownListSelect from '@/components/DropDownListSelect/DropDownListSelect.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import TextField from '@/components/TextField/TextField.vue'

export default {
  name: 'TaskInfo',
  components: {
    DropDownListSelect,
    TextField,
    ButtonComponent,
  },
  data () {
    return {
      currentTask: null
    }
  },
  computed: {
    ...mapState({
      list: state => state.list,
      taskForm: state => state.taskForm
    })
  },
  methods: {
    ...mapMutations({
      clearTaskFormFieldValues: 'clearTaskFormFieldValues',
      setTaskFormFieldValue: 'setTaskFormFieldValue',
      removeTask: 'removeTask'
    }),

    confirmRemove () {
      const currentTaskIndex = this.list.findIndex(item => item.id === this.$route.params.id)

      this.removeTask({ index: currentTaskIndex, task: this.taskForm })
      this.$router.push({ name: 'TodoList' })
    }
  },

  created () {
    this.currentTask = this.list.find(item => item.id === this.$route.params.id)

    for (const [key, value] of Object.entries(this.currentTask)) {
      this.setTaskFormFieldValue({field: key, newValue: value})
    }
  }
}
</script>


<style scoped>
  .navigation {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }

  .navigation__textfield {
    width: 90%;
    margin-right: 15px;
  }

  .navigation__button:last-child {
    margin-left: 15px;
  }

  .create {
    height: 100%;
  }

  .create__btn {
    margin-top: 15px;
    float: right;
  }

  .create__text {
    margin-top: 15px;
  }

</style>
