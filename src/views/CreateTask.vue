<template>
  <div class="create">
    <h1>Create</h1>
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
          :disabled="Boolean(!taskForm.text)"
          title="Confirm create"
          @click="confirmAction()"
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
  name: 'CreateTask',
  components: {
    DropDownListSelect,
    TextField,
    ButtonComponent,
  },
  computed: {
    ...mapState({
      taskForm: state => state.taskForm
    })
  },
  methods: {
    ...mapMutations({
      clearTaskFormFieldValues: 'clearTaskFormFieldValues',
      setTaskFormFieldValue: 'setTaskFormFieldValue',
      createTask: 'createTask',
    }),

    confirmAction () {
      const payload = {
        id: this.$store.state.list.length ? this.$store.state.list[this.$store.state.list.length - 1].id + 1 : 0,
        status: this.taskForm.status,
        text: this.taskForm.text,
        isDeleted: false,
        date: new Date().toLocaleString('ru-RU').split(',')[0]
      }

      this.createTask(payload)
      this.clearTaskFormFieldValues()
      this.$router.push({ name: 'TodoList' })
    },
  },

  created () {
    this.clearTaskFormFieldValues()
    this.setTaskFormFieldValue({ field: 'status', newValue: {id: 'IN_PROGRESS', text: 'Выполняется'}})
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
