<template>
  <div class="order-timeline">
    <h2> Today's orders ({{ sortedOrders.length }})</h2>

    <!-- Timeline -->
    <el-timeline class="timeline">
      <el-timeline-item
        v-for="it in timeslots"
        type="primary"
        :key="it.time"
      >
        <!-- Title -->
        <div :class="'time ' + it.urgency"> {{ it.time }}</div>

        <!-- List of orders -->
        <order-list :orders="it.orders" colors></order-list>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  import _                  from 'lodash'
  import moment             from 'moment-timezone'
  import OrderList          from './OrderList'
  import {
    URGENCY_LEVELS,
    getUrgency
  } from '../utils/urgency';

  export default {
    props: [ 'orders' ],
    name: 'order-timeline',
    components: {
      OrderList
    },
    computed: {
      sortedOrders() {
        return _.sortBy(this.orders, 'order_transport.scheduled_at');
      },
      timeslots() {
        let slots = {};
        _.each(this.sortedOrders, o => {
          let scheduledAt = o.order_transport.scheduled_at;
          let date = new Date(scheduledAt);
          let time = moment(date).format('hh:mm A');

          if (!slots[time]) {
            slots[time] = {
              time: time,
              date: date,
              orders: []
            };
          }

          slots[time].orders.push(o);
        });
        return slots;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/colors';

  .timeline {
    font-weight: bold;
    font-size: 1.3rem;
    .time {
      margin-bottom: 1rem;

      &.danger {
        color: $color-danger;
      }

      &.warning {
        color: $color-warning;
      }
    }
  }
</style>
