<template>
  <gc-card class="status-card progression-card">
    <template v-slot:body>
      <el-progress :width="80" type="circle" :percentage="progression" :status="status">Done</el-progress>
    </template>
    <template v-slot:header>
      Progress
    </template>
    <template v-slot:text>
      {{ progression }}%
    </template>
    <template v-slot:footer>
      <!-- ? -->
    </template>
  </gc-card>
</template>

<script>
  import { ACTIVE_STATES }  from '../../constants'
  import _                  from 'lodash'

  export default {
    name: 'progression',
    props: [ 'orders' ],
    computed: {
      openOrders() {
        return _.filter(this.orders, o => {
          return _.includes(ACTIVE_STATES, o.state);
        })
      },
      progression() {
        if (!this.orders || this.orders.length === 0) {
          return 100; // avoiding division by 0
        }
        const remaining = this.orders.length - this.openOrders.length 
        return parseInt((remaining / this.orders.length) * 100);
      },
      status() {
        return this.progression === 100 ? 'text' : null;
      }
    }
  }
</script>

<style lang="scss">
  .gc-card.progression-card {
    .content-area {
      text-align: center;
    }
  }
</style>
