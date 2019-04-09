<template>
  <gc-card class="status-card open-orders">
    <template v-slot:body>
      <font-awesome-icon size="4x" icon="dolly" />
    </template>
    <template v-slot:header>
      Open
    </template>
    <template v-slot:text>
      {{ openOrders.length }} orders
    </template>
    <template v-slot:footer>
      last updated {{ lastUpdate | timeSince }}
    </template>
  </gc-card>
</template>

<script>
  import { ACTIVE_STATES }  from '../../constants'
  import _                  from 'lodash'

  export default {
    name: 'open-orders',
    props: [ 'orders' ],
    computed: {
      openOrders() {
        return _.filter(this.orders, o => {
          return _.includes(ACTIVE_STATES, o.state);
        })
      },
      lastUpdate() {
        return _.chain(this.orders)
          .map('updated_at')
          .map(Date.parse)
          .max()
          .value();
      }
    }
  }
</script>

<style lang="scss">
  .gc-card.open-orders {
    .content-area {
      text-align: center;
    }
  }
</style>
