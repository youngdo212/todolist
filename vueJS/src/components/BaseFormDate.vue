<template>
  <div class="date-form">
    <div class="date-form__date-wrap">
      <label class="date-form__label" for="date">Date</label>
      <input
        id="date-form__input"
        type="text"
        placeholder="0000/00/00"
        v-model="date"
        @keyup.enter="submit"
      >
    </div>
    <div class="date-form__time-wrap">
      <label class="date-form__label" for="time">Time</label>
      <input
        id="date-form__input"
        type="text"
        placeholder="00:00"
        v-model="time"
        @keyup.enter="submit"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseFormDate',

  props: {
    initialTime: {
      type: Number,
      default: new Date().getTime(),
    }
  },

  data() {
    return {
      date: `${new Date(this.initialTime).getFullYear()}/${new Date(this.initialTime).getMonth()+1}/${new Date(this.initialTime).getDate()}`,
      time: `${new Date(this.initialTime).getHours()}:${new Date(this.initialTime).getMinutes()}`,
    }
  },

  methods: {
    getTime() {
      const {year, month, date} = this.deformatDate(this.date);
      const {hour, minute} = this.deformatTime(this.time);

      return new Date(year, month-1, date, hour, minute).getTime();
    }, 

    deformatDate(formattedDate) {
      const [, year, month, date] = formattedDate.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);

      return {
        year: Number(year),
        month: Number(month),
        date: Number(date),
      }
    },

    deformatTime(formattedTime) {
      const [, hour, minute] = formattedTime.match(/^(\d{1,2}):(\d{1,2})$/);

      return {
        hour: Number(hour),
        minute: Number(minute),
      }
    },

    submit() {
      this.$emit('date-form-submitted');
    }
  }
}
</script>

<style scoped>
.date-form {
  width: 100%;
  overflow: hidden;
}

.date-form__date-wrap {
  float: left;
  width: 45%;
}

.date-form__time-wrap {
  float: right;
  width: 45%;
}

.date-form__label {
  font-size: 0.9rem;
}

#date-form__input {
  box-sizing: border-box;
  width: 100%;
  outline: 0px;
  border: 0px; padding: 5px;
  font-size: 1rem;
  margin-top: 2px;
  box-shadow: inset 1px 1px #aaa;
}
</style>
