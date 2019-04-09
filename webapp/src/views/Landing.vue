<template>
  <div class='landing-page'>
    <h1> {{ $clock.dateString }} {{ $clock.timeString }} </h1>
    <el-row :gutter="20">

      <!-- Timeline -->
      <el-col :md="6">
        <order-timeline :orders="orders"></order-timeline>
      </el-col>

      <!-- Open orders -->
      <el-col :md="6">
        <open-orders :orders="orders"></open-orders>
      </el-col>

      <!-- Closed orders -->
      <el-col :md="6">
        <closed-orders :orders="orders"></closed-orders>
      </el-col>

      <!-- Progression -->
      <el-col :md="6">
        <progression :orders="orders"></progression>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { ACTIVE_STATES }  from '../constants'
import orderQuery         from '../queries/landing.orders'
import _                  from 'lodash'
import OpenOrders         from '../components/cards/OpenOrders'
import ClosedOrders       from '../components/cards/ClosedOrders'
import Progression        from '../components/cards/Progression'
import OrderTimeline      from '../components/OrderTimeline'

export default {
  components: {
    OpenOrders,
    ClosedOrders,
    Progression,
    OrderTimeline
  },
  apollo: {
    $loadingKey: 'loading',
    orders: orderQuery.build({
      variables: function () {
        return {
          after: this.$clock.startOfDay,
          before: this.$clock.endOfDay
        }
      }
    })
  }
}
</script>

<style lang="scss">
  .landing-page {
    .order-timeline {
      margin-top: 2rem;
    }

    .gc-card {
      .content-area {
        height: 5rem;
      }
      .footer {
        height: 1.5rem;
      }
    }
  }
</style>
