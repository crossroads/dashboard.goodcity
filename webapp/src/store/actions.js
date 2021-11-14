
import bookingTypesQuery  from '../queries/bookingTypes.gql'
import * as api from '../services/goodcity'

export default {

  async loadBookingTypes({ commit }) {
    commit('saveBookingTypes', await api.loadBookingTypes());
  },

  async authenticate({ commit }, { authToken }) {
    commit('setCredentials', { authToken });
  }

};
