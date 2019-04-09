<template>
  <gc-card class="status-card closed-orders">
    <template v-slot:body>
      <font-awesome-icon size="4x" icon="check" />
    </template>
    <template v-slot:header>
      Closed
    </template>
    <template v-slot:text>
      {{ closedOrders.length }} orders
    </template>
    <template v-slot:footer>
      <span v-if="lastClosedOrder">
        {{ lastClosedOrder.code }} 
        was closed
        {{ lastClosedOrder.updated_at | timeSince }}
      </span>
      <span v-else>
        No closed order today
      </span>
    </template>
  </gc-card>
</template>

<script>
  import _                  from 'lodash'

  export default {
    name: 'closed-orders',
    props: [ 'orders' ],
    computed: {
      closedOrders() {
        return _.filter(this.orders, ['state', 'closed'])
      },
      lastClosedOrder() {
        return _.maxBy(this.closedOrders, o => {
          return Date.parse(o.updated_at);
        });
      }
    }
  }
</script>

<style lang="scss">
  @import '../../styles/colors';

  .gc-card.closed-orders {
    .content-area {
      text-align: center;
      color: $color-success;
    }
  }
</style>
