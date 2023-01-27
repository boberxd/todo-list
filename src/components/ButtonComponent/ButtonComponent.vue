<template>
  <div class="button" :class="{ 'disabled': disabled }" @click="clickHandler()">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    title: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  methods: {
    clickHandler () {
      if (!this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>


<style scoped>
  .button {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #c8c8c8;
    padding: 5px 10px;
    max-width: 100px;
    height: 50px;
    cursor: pointer;
    text-align: center;
    min-width: 75px;
  }

  .disabled {
    background-color: #9a9a9a;
    cursor: not-allowed;
  }

  .button:hover:not(.disabled) {
    background-color: #c0c0c0;
  }
</style>