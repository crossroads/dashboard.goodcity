import _          from 'lodash'
import { TYPES }  from '../constants';

export default {

  bookingTypes(state) {
    return state.bookingTypes;
  },

  authToken({ username, password }) {
    return btoa(`${username}:${password}`);
  },

  isAuthenticated(state) {
    return state.username && state.password;
  },

  bookingTypeOf(state) {
    return order => {
      return _.find(state.bookingTypes, ['id', order.booking_type_id]);
    };
  },

  typeOf(state, getters) {
    return order => {
      const bt = getters.bookingTypeOf(order);
      return bt && bt.identifier === 'appointment' ?
        TYPES.APPOINTMENT :
        TYPES.ONLINE_ORDER;
    }
  },

  isAppointment(state, getters) {
    return order => {
      return  getters.typeOf(order) === TYPES.APPOINTMENT;
    }
  }

};