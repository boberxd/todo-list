<template>
  <div class="todo">
    <div class="navigation">
      <div class="navigation__textfield">
        <text-field 
          v-model="filterField"
          placeholder="Фильтровать..."
          @input="filter()"
        />
      </div>
    
      <div class="navigation__button">
        <button-component 
          title="Create task" 
          @click="$router.push({ name: 'CreateTask' })"
        />
      </div>

    </div>
    
    <div class="filters">
      <drop-down-list-select 
        :value="sortBy"
        :items="[{id: 'ASC', text: 'По алфавиту (А-Я)'}, {id: 'DESC', text: 'По алфавиту (Я-А)'}, {id: 'BY_DATE', text: 'По дате'}]"
        placeholder="Сортировать по..."
        @selectItem="sortByStatus($event)"
      />
      <button-component 
        title="Clear" 
        @click="sortByStatus(null)"
      />
    </div>

    <div class="todo__list">
      <div 
        v-for="(item, index) in tempList" 
        :key="index" 
        class="todo__list-item"
        :class="{'completed': item.status?.id === 'COMPLETED', 'execute': item.status?.id === 'EXECUTE'}"
        @click="showTask(item)"
      >
        <div class="item__text">
          {{ item.text }}
        </div>
        <div class="item__date">
          {{ item.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TextField from '@/components/TextField/TextField.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import DropDownListSelect from '@/components/DropDownListSelect/DropDownListSelect.vue'

export default {
  name: 'TodoList',
  components: {
    TextField,
    ButtonComponent,
    DropDownListSelect
  },
  data () {
    return {
      tempList: [],
      filterField: null,
      sortBy: null,
    }
  },
  computed: {
    ...mapState({
      list: state => state.list.filter(item => !item.isDeleted)
    })
  },
  methods: {
    showTask (item) {
      this.$router.push({name: 'TaskInfo', params: {id: item.id}})
    },
    filter () {
      this.filterField ? this.tempList = this.list.filter(item => item.text?.toLowerCase().includes(this.filterField.toLowerCase())) : this.setInitialTempList();
    },
    sortByStatus (event) {
      this.sortBy = event
      this.filter()
      
      if (event) {
        switch (event.id) {
          case 'ASC':
            this.tempList = this.tempList.sort((a, b) => {
              if (a.text < b.text) {
                return -1;
              }
              if (a.text > b.text) {
                return 1;
              }
              return 0;
            })

            break;
          case 'DESC':
            this.tempList = this.tempList.sort((a, b) => {
              if (a.text > b.text) {
                return -1;
              }
              if (a.text < b.text) {
                return 1;
              }
              return 0;
            })
          break;

          case 'BY_DATE':
            this.tempList = this.tempList.sort((a, b) => { 
              return new Date(b.date.split('.').reverse().join('.')) - new Date(a.date.split('.').reverse().join('.'))
            })
          }
      }
    },
    setInitialTempList () {
      this.tempList = JSON.parse(JSON.stringify(this.list)).filter(item => !item.isDeleted)
    }
  },
  created () {
    this.setInitialTempList()
  }
}
</script>


<style>
  .todo {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .navigation {
    display: flex;
    justify-content: space-between;
  }

  .navigation__textfield {
    width: 90%;
    margin-right: 15px;
  }

  .todo__list {
    max-height: calc(100% - 20px);
    margin: 15px 0;
    overflow-y: scroll;
  }
  .todo__list-item {
    height: 50px;
    width: 100%;
    border-left: 5px solid #cdcdcd;
    background-color: #d7d7d7;

    display: flex;
    align-items: center;
    position: relative;
    opacity: 0.9;
  }
  .todo__list-item:hover {
    opacity: 1;
    cursor: pointer;
  }
  .completed {
    border-left: 5px solid #628e42;
    background-color: #c8d3bf;
  }
  .deleted {
    border-left: 5px solid #8c3737;
    background-color: #d9bdbd;
  }
  .execute {
    border-left: 5px solid #ff9a4f;
    background-color: #ffd0ad;
  }
  .item__text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 90%;
    padding-left: 15px;
  }
  .item__date {
    position: absolute;
    right: 0;
    padding: 0 15px;
  }
  .todo__selected {
    width: 50px;
    background-color: red;
  }

  .filters {
    margin-top: 15px;
    display: flex;
  }

  .filters .button {
    height: 33px;
    margin-left: 10px;
  }

</style>