<template>
  <div class="form">
    <input
      id="form__title"
      placeholder="Title"
      v-model="title"
      @keyup.enter="submit"
    >
    <textarea
      id="form__decription"
      placeholder="Description"
      v-model="description"
    />
    <div class="form__time-checkbox-wrap">
      <label for="form__time-checkbox">Set Time</label>
      <input
        id="form__time-checkbox"
        type="checkbox"
        v-model="timeSettingMode"
      >
    </div>
    <BaseFormDate
      ref="dateFrom"
      v-if="timeSettingMode"
      :initialTime="initialTime"
      @date-form-submitted="submit"
    />
    <div
      class="form__submit-button"
      @click.stop="submit"
    >
      SUBMIT
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseForm',

  props: {
    initialTitle: {
      type: String,
      default: '',
    },
    initialDescription: {
      type: String,
      default: '',
    },
    initialTime: Number,
  },

  data() {
    return {
      title: this.initialTitle,
      description: this.initialDescription,
      timeSettingMode: this.initialTime ? true : false,
    }
  },

  created() {
    const closeForm = ({target}) => {
      if(target.closest('.form')) return;

      this.$emit('form-closed');
      window.removeEventListener('click', closeForm, true);
    }
    
    window.addEventListener('click', closeForm, true);
  },

  methods: {
    submit() {
      if(this.title === '') return;

      const form = {
        title: this.title,
        description: this.description,
        expireTime: this.timeSettingMode ? this.$refs.dateFrom.getTime() : undefined,
      };

      this.$emit('form-submitted', form);
      this.title = '';
      this.description= '';
      this.timeSettingMode = false;
    },
  },
}
</script>

<style scoped>
.form {
  box-sizing: border-box;
  width: 100%;
  padding: 7px;
  background: #f2f2f2;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #999;
}

.form__checkbox {
  margin-bottom: 5px;
}

#form__title, #form__decription {
  box-sizing: border-box;
  width: 100%;
  border: 0px; padding: 5px;
  outline: 0px;
  font-size: 1rem;
  margin-bottom: 7px;
  box-shadow: inset 1px 1px #aaa;
}

#form__decription {
  resize: none;
  line-height: 1.3rem;
}

.form__time-checkbox-wrap {
  margin-bottom: 10px;
}

.form__submit-button {
  width: 90px; line-height: 2rem;
  background: #555;
  border-radius: 5px;
  text-align: center;
  margin: auto;
  margin-top: 10px;
  font-size: 1rem;
  color: #fff;
  cursor: default;
}
</style>
