<template>
  <div class="todolist">
    <TodolistItem
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @remove-button-clicked="removeTodo"
      @todo-dropped="moveTodo"
    />
  </div>
</template>

<script>
import TodolistItem from './TodolistItem.vue';

export default {
  name: 'Todolist',

  components: {
    TodolistItem,
  },

  props: {
    todos: {
      type: Array,
      default() {
        return [];
      }
    },

    flag: {
      validator(value) {
        return ['all', 'uncompleted', 'completed'].indexOf(value) !== -1;
      }
    }
  },

  methods: {
    removeTodo(todo) {
      this.$emit('todo-removed', todo)
    },

    moveTodo(e) {
      this.$emit('todo-moved', e);
    }
  },

  computed: {
    filteredTodos() {
      switch(this.flag) {
        case 'all': {
          return this.todos;
        }
        
        case 'uncompleted': {
          return this.todos.filter((todo) => {
            return todo.done === false;
          });
        }
        
        case 'completed': {
          return this.todos.filter((todo) => {
            return todo.done === true;
          });
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
