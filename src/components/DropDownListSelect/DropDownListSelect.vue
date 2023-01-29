<template>
  <div class="custom-select">
    <input type="text" :disabled="disabled" :value="interalValue" :placeholder="placeholder" @focus="showItems()" >
    <transition name="fade">
      <div v-show="isShow" class="list">
        <div class="list__item" v-for="(item, index) in items" :key="index" @click="selectItem(item)">{{ item.text }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DropDownListSelect',
  props: {
    value: Object,
    items: Array,
    disabled: Boolean,
    placeholder: String,
  },
  data () {
    return {
      interalValue: this.setInteralValue(),
      isShow: false,
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('selectItem', item)
      this.isShow = false
    },
    setInteralValue () {
      return this.interalValue = this.value?.text || null
    },
    outsideClick (event) {
      if (!this.$el.contains(event.target)) {
        this.isShow = false
      }
    },
    showItems () {
      if (!this.disabled) {
        this.isShow = true
      }
    }
  },
  watch: {
    value () {
      this.setInteralValue()
    },
  },
  mounted () {
    document.addEventListener('click', this.outsideClick)
  },
  beforeDestroy () {
    document.addEventListener('click', this.outsideClick)
  }
}
</script>

<style scoped>
  input {
    outline:none;
    padding-left: 8px;
    width: 100%;
  }
  
  input:disabled {
   background-color: #a2c8d3;
  }

  .custom-select {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 166px;
  }

  .list {
    width: 100%;
    position: absolute;
    top: 97%;
    background: #fff;
    border: 1px solid #767676;
    border-radius: 0 0 4px 4px;
    max-height: 50vh;
    overflow: auto;
    transition: all .3s ease;
    z-index: 4;
  }

  .list__item {
    padding-left: 5px;
  }

  .list__item:not(:first-child) {
    border-top: 1px solid #767676;
  }

  .list__item:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    will-change: opacity;
  }
</style>