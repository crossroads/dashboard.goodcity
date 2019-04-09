<template>
  <div class="order-timeline">
    <!-- <el-row :gutter="20" class="timeline">
      <el-col :md="2" v-for="o in urgentOrders" :key="o.id" class="order">
        <div> {{ o.code }} </div>
        <div> {{ o.state | snakeToText }} </div>
        <div> {{ o.order_transport.scheduled_at | timeString }} </div>
      </el-col>
    </el-row> -->
    <el-timeline class="timeline">
      <el-timeline-item
        v-for="(it, index) in upcomingOrders"
        :type="it.type"
        :key="it.order.id"
      >
        <div class="order">
          <div> {{ it.order.code }}</div>
          <div class="tags">
            <el-tag class="tag" :type="it.type">{{ it.order.order_transport.scheduled_at | timeString }}</el-tag>
            <el-tag class="tag" :type="it.type">{{ it.order.state | snakeToText | capitalize }}</el-tag>
          </div>
        </div>
      </el-timeline-item>

      <el-timeline-item type="primary" v-if="hasMore">
        <div class="order"> {{ unshownCount }} more... </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment-timezone'
  import { ACTIVE_STATES }  from '../constants'

  const DISPLAY_COUNT = 5;

  export default {
    props: [ 'orders' ],
    name: 'order-timeline',
    methods: {
      addHo(o) {

      },
      getType(o) {
        let now = this.$clock.now;

        const mapping = {
          1: 'danger',
          2: 'warning'
        };

        for (let h in mapping) {
          let type = mapping[h];
          let t = now.clone().add(h, 'hour');
          let scheduledAt = moment(o.order_transport.scheduled_at).tz("Asia/Hong_Kong");
          if (scheduledAt <= t) {
            return type;
          }
        }
        return 'primary';
      }
    },
    computed: {
      openOrders() {
        return _.filter(this.orders, o => {
          return _.includes(ACTIVE_STATES, o.state);
        })
      },
      hasMore() {
        return this.openOrders.length - DISPLAY_COUNT > 0;
      },
      unshownCount() {
        return this.openOrders.length - DISPLAY_COUNT;
      },
      upcomingOrders() {
        return _.chain(this.openOrders)
          .sortBy('order_transport.scheduled_at')
          .slice(0, DISPLAY_COUNT)
          .map(o => ({
            order: o,
            type: this.getType(o)
          }))
          .value();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/colors';

  .timeline {
    font-weight: bold;
    font-size: 1.3rem;
    .order {
      color: $color-text-secondary;
      .tags {
        margin-top: 0.5rem;
        .tag {
          font-size: 1.1rem;
        }
      }
    }
  }
</style>
