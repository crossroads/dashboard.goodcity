
import bookingTypesQuery  from '../queries/bookingTypes.gql'
import { apolloClient }   from "../setup/apollo"

export default {

  async loadBookingTypes({ commit }) {
    const { data } = await apolloClient.query({ query: bookingTypesQuery })
    commit('saveBookingTypes', data.booking_types);
  },

  async authenticate({ commit }, { username, password }) {
    const token = btoa(`${username}:${password}`);
    commit('setAuthToken', token);
    localStorage.setItem('authToken', token);
  }

};