<template>
  <div
    class="todo"
    :class="{'todo--complete': todo.done, 'todo--expired': expired}"
    @click.stop="expand"
  >
    <div class="todo__header">
      <TodolistItemViewCheckBox
        class="todo__checkbox"
        :initialChecked="todo.done"
        @checked="checkComplete"
      />
      <div class="todo__title">{{todo.title}}</div>
      <TodolistItemButtonDelete
        class="todo__delete-button"
        @button-clicked="clickRemove"
      />
    </div>
    <div
      v-show="state.expanded"
      class="todo__body"
    >
      <div
        v-if="todo.description"
        class="todo__description"
      >
        {{todo.description}}
      </div>
      <TodolistItemViewTimer
        v-if="todo.expireTime"
        ref="timer"
        class="todo__timer"
        :targetTime="todo.expireTime"
        @time-over="expire"
      />
      <div
        class="todo__edit-button"
        @click.stop="edit"
      >
        EDIT
      </div>
    </div>
  </div>
</template>

<script>
import TodolistItemViewCheckBox from './TodolistItemViewCheckBox.vue';
import TodolistItemViewTimer from './TodolistItemViewTimer.vue';
import TodolistItemButtonDelete from './TodolistItemButtonDelete.vue';

export default {
  name: 'TodolistItemView',

  components: {
    TodolistItemViewCheckBox,
    TodolistItemViewTimer,
    TodolistItemButtonDelete,
  },

  props: {
    todo: Object,
    initialState: {
      type: Object,
      dafault() {
        return {
          expanded: false,
        }
      }
    }
  },

  data() {
    return {
      expired: false,
      state: Object.assign({}, this.initialState),
    }
  },

  mounted() {
    if(!this.todo.done) return;

    this.$refs.timer && this.$refs.timer.end();
  },

  methods: {
    expand() {
      this.state.expanded = !this.state.expanded;
    },

    checkComplete(checked) {
      this.todo.done = checked;

      if(!this.$refs.timer) return;

      checked ? this.$refs.timer.end() : this.$refs.timer.start();
    },

    clickRemove() {
      this.$emit('remove-button-clicked');
    },

    edit() {
      this.$emit('todo-edited', this.state);
    },

    expire() {
      this.expired = true;
    },
  }
}
</script>

<style scoped>
.todo {
  box-sizing: border-box;
  width: 100%;
  padding: 7px;
  background: #f2f2f2;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #999;
}

.todo--complete .todo__title{
  text-decoration: line-through;
}

.todo--complete .todo__description, .todo--complete .todo__timer {
  color: rgba(0,0,0,0.3);
}

.todo--expired {
  background: rgb(250, 93, 93);
}

.todo__header {
  height: 27px;
  overflow: hidden;
}

.todo__checkbox {
  float: left;
}

.todo__title {
  float: left;
  line-height: 27px;
  box-sizing: border-box;
  font-size: 1rem;
  margin-left: 10px;
}

.todo__delete-button {
  width: 27px; height: 27px;
  float: right;
}

.todo__body {
  margin-top: 7px;
}

.todo__description {
  font-size: 1rem;
  padding: 5px;
  overflow: scroll;
}

.todo__edit-button {
  width: 60px; line-height: 2rem;
  margin: auto;
  border-radius: 5px;
  background: #555;
  text-align: center;
  color: #fff;
  cursor: default;
}
</style>
