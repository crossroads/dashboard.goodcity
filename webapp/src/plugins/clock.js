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
          now: moment().tz("Asia/Hong_Kong"),
          schedules: []
        }
      },
      computed: {
        timeString() {
          return this.now.format('hh:mm A');
        },
        dateString() {
          return this.now.format('MMMM Do');
        },
        text() {
          return this.dateString + ' ' + this.timeString;
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
        },

        schedule(fn) {
          this.schedules.push(fn);
          return {
            clear: () => {
              // cleanup
              this.schedules = this.schedules.filter(f => f === fn);
            }
          }
        }
      },
      created() {
        setTimeout(() => {
            this.update();
            setInterval(() => {
              this.update()
              this.schedules.forEach(fn => fn())
            }, minute);
          },
          (60 - this.now.seconds()) * second // seconds to 60
        );
      }
    });

    _Vue.prototype.$clock = vm;
  }
};

export default ClockPlugin;
