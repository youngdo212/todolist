<template>
  <div id="app">
    <div class="app__flag">
      <BaseButtonFlag
        v-for="(flag, index) in flags"
        :key="index"
        :name="flag"
        :active="flag === selectedFlag ? true : false"
        @button-clicked="setFlag"
      />
    </div>
    <div class="app__body">
      <Todolist
        :todos="todos"
        :flag="selectedFlag"
        @todo-removed="removeTodo"
        @todo-moved="moveTodo"
      />
      <div
        v-if="!formActive"
        class="create-button"
        @click="formActive = true;"
      >
        + Add Todo
      </div>
      <BaseForm
        v-if="formActive"
        class="create-form"
        @form-submitted="addTodo"
        @form-closed="formActive = false"
      />
    </div>
  </div>
</template>

<script>
import Todolist from './components/Todolist.vue';

export default {
  name: 'app',
  
  components: {
    Todolist,
  },

  data() {
    return {
      id: 0,
      todos: [],
      flags: ['all', 'uncompleted', 'completed'],
      selectedFlag: 'all',
      formActive: false,
    }
  },

  methods: {
    addTodo(form) {
      const todo = {
        id: this.id++,
        done: false,
      }

      Object.assign(todo, form);
      this.todos.push(todo);
      this.formActive = false;
    },

    removeTodo({id}) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      })
    },

    setFlag(flag) {
      this.selectedFlag = flag;
    },

    moveTodo({sourceId, destinationId, position}) {
      let sourceTodo = null;

      this.todos = this.todos.filter((todo) => {
        if(todo.id !== sourceId) return true;
        sourceTodo = todo;
        return false;
      })

      this.todos = this.todos.reduce((todos, todo) => {
        if(todo.id !== destinationId) return todos.concat(todo);

        return position === 'before' ? todos.concat(sourceTodo, todo) : todos.concat(todo, sourceTodo);
      }, []);
    }
  }
}
</script>

<style scoped>
#app {
  display: block;
  margin: auto;
  margin-top: 10vh;
  margin-bottom: 10vh;
  width: 350px;
}

.app__body {
  width: 100%;
  background: rgb(84, 233, 158);
  padding: 10px;
}

.create-button {
  width: 100%; line-height: 40px;
  border-radius: 5px;
  background: rgb(72, 199, 135);
  color: #fff;
  font-size: 1.2rem;
  cursor: default;
  text-align: center;
  margin-top: 5px;
}

.create-button:hover {
  background: rgb(62, 172, 117);
}

.create-form {
  margin-top: 5px;
}
</style>
