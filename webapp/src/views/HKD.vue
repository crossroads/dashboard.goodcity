<template>
  <div class='landing-page'>
    <h1> Hong Kong Distribution - {{ $clock.text }} </h1>
    <el-row :gutter="50">

      <!-- Timeline -->
      <el-col :md="12">
        <order-timeline :orders="orders"></order-timeline>
      </el-col>

      <el-col :md="12">
        <!--Unconfirmed orders -->
        <el-row :gutter="20">
          <h2> Unconfirmed orders </h2>
          <order-list
            :orders="unconfirmedOrders"
            :columns="[
              'code',
              'state',
              'date',
              'items'
            ]"
          ></order-list>
        </el-row>

        <!-- Orders to stage -->
        <el-row :gutter="20">
          <h2> Orders to stage </h2>
          <order-list
            :orders="ordersToStage"
            :columns="[
              'code',
              'state',
              'date',
              'items'
            ]"
          ></order-list>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import _                        from 'lodash'
import OrderTimeline            from '../components/OrderTimeline'
import OrderList                from '../components/OrderList'
import { mapActions}            from 'vuex'
import requireReload            from '../mixins/requireReload'
import { loadOrders }           from '../services/goodcity'
import {
  STATES,
  UNCONFIRMED_STATES
} from '../constants'

export default {
  mixins: [requireReload],
  components: {
    OrderTimeline,
    OrderList
  },
  async mounted() {
    await this.loadBookingTypes();
    await this.refresh();

    this.schedule = this.$clock.schedule(() => {
      console.log('polling');
      this.refresh();
    });
  },
  beforeDestroy() {
    this.schedule.clear();
  },
  methods: {
    ...mapActions([ 'loadBookingTypes' ]),

    isAppointment(order) {
      return this.$store.getters.isAppointment(order);
    },

    isUnconfirmed(order) {
      return _.includes(UNCONFIRMED_STATES, order.state);
    },

    async refresh() {
      this.orders = await loadOrders();
    }
  },
  data: () => ({
    orders: [],
    schedule: null
  }),
  computed: {
    unconfirmedOrders() {
      return _.filter(this.orders, o => this.isUnconfirmed(o));
    },
    ordersToStage() {
      return _.filter(this.orders, o => {
        const isAppt = this.isAppointment(o);
        return !isAppt && o.state === STATES.SCHEDULED;
      });
    }
  }
}
</script>

<style lang="scss">
  .landing-page {
    .order-timeline {
      margin-top: 2rem;
    }
  }
</style>
