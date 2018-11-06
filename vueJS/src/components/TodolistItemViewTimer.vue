<template>
  <div class="timer">{{formattedRestTime}}</div>
</template>

<script>
export default {
  name: 'TodolistItemViewTimer',

  props: {
    targetTime: Number,
  },

  data() {
    return {
      timeUnit: 1000,
      restTime: 0,
      intervalID: null,
    }
  },

  mounted() {
    this.start();
  },

  destroyed() {
    this.end();
  },

  methods: {
    start() {
      this.restTime = this.getRestTime();

      if(this.restTime <= 0) {
        this.$emit('time-over');
        return;
      }

      this.intervalID = setInterval(this.checkTime.bind(this), this.timeUnit);
    },

    end() {
      clearInterval(this.intervalID);
    },

    getRestTime() {
      const restTime = this.targetTime - new Date().getTime();
      return restTime;
    },

    checkTime() {
      /* eslint-disable no-console */
      console.log('timer is going on...');
      /* eslint-enable no-console */
      this.restTime = this.getRestTime();

      if(this.restTime > 0) return;

      this.$emit('time-over');
      this.end();
    },
  },

  computed: {
    formattedRestTime() {
      if(this.restTime <= 0) return `시간 초과`;

      const years = Math.floor(this.restTime / 31536000000);
      if(years) return `약 ${years}년`;

      const months = Math.floor(this.restTime / 2592000000);
      if(months) return `약 ${months}달`;
      
      const days = Math.floor(this.restTime / 86400000);
      if(days) return `약 ${days}일`;

      const hours = Math.floor(this.restTime / 3600000);
      if(hours) return `약 ${hours}시간`;

      const minutes = Math.floor(this.restTime / 60000);
      if(minutes) return `약 ${minutes}분`;

      const seconds = Math.floor(this.restTime / 1000);

      return `${seconds}초`;
    }
  },

  watch: {
    targetTime() {
      this.end();
      this.start();
    }
  }
}
</script>

<style scoped>
.timer {
  box-sizing: border-box;
  width: 100%;
  padding: 0px 15px;
  font-size: 0.8rem;
  text-align: right;
}
</style>
