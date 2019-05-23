/**
 * Logic helper to determine the urgency of orders
 * This is used to assign colors to each order
 *
 */

import moment       from 'moment-timezone'
import _            from 'lodash'
import { STATES }   from '../constants'

const HIGH = 3;
const MID = 2;
const LOW = 1;
const NA = 0;

export const URGENCY_LEVELS = { HIGH, MID, LOW, NA };

function hourDifference(order, now) {
  const scheduledAt = moment(order.order_transport.scheduled_at);
  return moment.duration(scheduledAt.diff(now)).asHours();
}

const urgencyMapping = {
  [STATES.DISPATCHING](order, type, now) {
    /**
     * DISPATCHING is the expected state as long as the scheduled time is not passed
     */
    const diff = hourDifference(order, now);
    if (diff < 0) {
      return HIGH;
    }
    return diff > 1 ? LOW : MID;
  },
  [STATES.SCHEDULED](order, type, now) {
    /**
     * We should have no SCHEDULED orders on the day of pickup
     */
    return HIGH;
  },
  [STATES.PROCESSING]() {
    /**
     * We should have no PROCESSING orders on the day of pickup
     */
    return HIGH;
  },
  [STATES.SUBMITTED]() {
    /**
     * We should have no SUBMITTED orders on the day of pickup
     */
    return HIGH;
  },
  [STATES.CLOSED]() {
    /**
     * Good
     */
    return LOW;
  }
};

export function getUrgency(order, type, now) {
  const state = order.state;
  if (urgencyMapping[state]) {
    return urgencyMapping[state](order, type, now);
  }
  return NA;
}
