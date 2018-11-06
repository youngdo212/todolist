<template>
  <div
    class="button"
    :class="{'button--active': active}"
    @click="$emit('button-clicked', name)"
  >
    {{name}}
  </div>
</template>

<script>
export default {
  name: 'BaseButtonFlag',

  props: {
    name: String,
    active: Boolean,
  }
}
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 5px 15px;
  border-radius: 10px 10px 0 0;
  background: rgb(72, 201, 136);
  color: #fff;
  cursor: default;
}

.button--active {
  background: rgb(84, 233, 158);
}
</style>
