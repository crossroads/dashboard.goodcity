<template>
  <div class="order-list">
    <el-row :gutter="20" v-for="o in orders" :key="o.id" 
      :class="['order', colors && 'colored', urgency(o)]">
      <el-col v-if="showCode" :md="colSpan"> {{ o.code }}  </el-col>
      <el-col v-if="showType" :md="colSpan"> {{ orderType(o) }}  </el-col>
      <el-col class="state" v-if="showState" :md="colSpan"> {{ o.state | snakeToText }}  </el-col>
      <el-col v-if="showDate" :md="colSpan">
        {{ o.order_transport.scheduled_at | dateString }}
        {{ o.order_transport.scheduled_at | timeString }}
      </el-col>
      <el-col v-if="showItems" :md="colSpan">
        {{ itemCount(o) }} items
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {
    URGENCY_LEVELS,
    getUrgency
  } from '../utils/urgency';

  const SUPPORTED_COLUMNS = [
    'code',
    'type',
    'state',
    'date',
    'items'
  ];

  export default {
    name: 'order-list',
    props: {
      orders: Array,
      colors: Boolean,
      columns: {
        type: Array,
        default() {
          return [
            'code',
            'type',
            'state'
          ]
        }
      }
    },
    computed: {
      showCode() {
        return this.showColumn('code');
      },
      showType() {
        return this.showColumn('type');
      },
      showState() {
        return this.showColumn('state');
      },
      showDate() {
        return this.showColumn('date');
      },
      showItems() {
        return this.showColumn('items');
      },
      colNumber() {
        return _.intersection(SUPPORTED_COLUMNS, this.columns).length;
      },
      colSpan() {
        return Math.floor(24 / this.colNumber);
      }
    },
    methods: {
      showColumn(col) {
        return _.includes(this.columns, col);
      },
      isAppointment(order) {
        bookingTypes
      },
      itemCount(order) {
        const isAppt = this.$store.getters.isAppointment(order);
        const prop = isAppt ?
          'goodcity_requests_aggregate'
          : 'orders_packages_aggregate';

        return order[prop].aggregate.count;
      },
      orderType(order) {
        const isAppt = this.$store.getters.isAppointment(order);
        
        if (isAppt) {
          return 'Appointment';
        }

        const { transport_type } = order.order_transport;
        return transport_type === 'self' ? 'Pickup' : 'Direct Ship';
      },
      urgency(order) {
        let now = this.$clock.now;
        let type = this.$store.getters.typeOf(order);
        let urgency = getUrgency(order, type, now);

        switch (urgency) {
          case URGENCY_LEVELS.HIGH:
            return 'danger';
          case URGENCY_LEVELS.MID:
            return 'warning';
          case URGENCY_LEVELS.LOW:
            return 'success';
          default:
            return 'primary';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/colors';

  .order {
    &.colored {
      &.success {
        .state { color: $color-success; }
      }
      &.danger {
        .state { color: $color-danger; }
      }
      &.warning {
        .state { color: $color-warning; }
      }
    }
    color: $color-text-secondary;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    &:not(:last-child) {
      border-bottom: 1px solid rgba($color-text-secondary, 0.3);
    }
  }
</style>

