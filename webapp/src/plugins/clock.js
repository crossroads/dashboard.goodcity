import Vue from 'vue'
import moment from 'moment-timezone'

const second = 1000;
const minute = 60 * second;

const ClockPlugin = {
  install(_Vue, options) {

    const vm = new Vue({
      data() {
        console.log(moment().tz("Asia/Hong_Kong").format('hh:mm A'));
        return {
          now: moment().tz("Asia/Hong_Kong")
        }
      },
      computed: {
        timeString() {
          return this.now.format('hh:mm A');
        },
        dateString() {
          return this.now.format('MMMM Do');
        },
        startOfDay() {
          return this.now.clone().startOf('day').toDate();
        },
        endOfDay() {
          return this.now.clone().endOf('day').toDate();
        }
      },
      methods: {
        update() {
          this.now = moment().tz("Asia/Hong_Kong");
        }
      },
      created() {
        setTimeout(() => {
            this.update();
            setInterval(() => this.update(), minute);
          },
          (60 - this.now.seconds()) * second // seconds to 60
        );
      }
    });

    _Vue.prototype.$clock = vm;
  }
};

export default ClockPlugin;