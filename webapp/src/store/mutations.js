export default {
  saveBookingTypes(state, bookingTypes = []) {
    state.bookingTypes = bookingTypes;;
  },

  setAuthToken(state, token) {
    state.authToken = token;
  }
};