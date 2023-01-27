<template>
  <input 
    :value="interalValue" 
    class="textfield" 
    type="text" 
    :placeholder="placeholder"
    @input="inputHandler($event)"
  >
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: String,
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      interalValue: this.value
    }
  },
  methods: {
    inputHandler (event) {
      this.interalValue = event.target.value
      this.$emit('input', this.interalValue)
    }
  }
}
</script>

<style>
  .textfield {
    width: 100%;
    height: 50px;
  }

  input {
    border: 2px dotted #dfdfdf;
    color: #4c4c4c;
    outline: none;
    padding-left: 10px;
    font-size: 18px;
  }

  input:disabled {
   background-color: #a2c8d3;
  }

</style>