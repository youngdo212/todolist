<template>
  <div
    class="button"
    @click.stop="$emit('button-clicked')"
  >
    <svg
      version="1.1"
      baseProfile="full"
      width="100%" height="100%" viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="30" y1="30" x2="70" y2="70" stroke="#888" stroke-width="5"/>
      <line x1="70" y1="30" x2="30" y2="70" stroke="#888" stroke-width="5"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'TodolistButtonDelete',
}
</script>

<style scoped>
.button {
  cursor: default;
}
</style>
