<template>
  <div class="edit">
    <h1>Task Edit</h1>
    <drop-down-list-select 
      :value="taskForm.status"
      :items="[{id: 'IN_PROGRESS', text: 'Выполняется'}, {id: 'COMPLETED', text: 'Выполнена'}, {id: 'EXECUTE', text: 'Выполнить'}]"
      @selectItem="setTaskFormFieldValue({ field: 'status', newValue: $event })"
    />

    <div class="navigation">
      <div class="navigation__textfield">
        <text-field 
          :value="taskForm.text"
          @input="setTaskFormFieldValue({ field: 'text', newValue: $event })"
        />
      </div>
      
      <div class="navigation__button">
        <button-component 
          title="Save"
          @click="save()"
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
  name: 'TaskEdit',
  components: {
    DropDownListSelect,
    TextField,
    ButtonComponent,
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
      saveTask: 'saveTask',
    }),

    save () {
      const indexOfCurrentTask = this.list.findIndex(item => item.id === this.$route.params.id)
      this.saveTask({ index: indexOfCurrentTask, newTask: this.taskForm})
      this.$router.push({ name: 'TaskInfo', params: { id: this.$route.params.id }})
    }
  },

  created () {
    const currentTask = this.list.find(item => item.id === this.$route.params.id)

    for (const [key, value] of Object.entries(currentTask)) {
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
