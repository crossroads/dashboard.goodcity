export default {
  saveBookingTypes(state, bookingTypes = []) {
    state.bookingTypes = bookingTypes;;
  },

  setCredentials(state, { authToken }) {
    localStorage.setItem('authToken', authToken);
    state.authToken = authToken;
  }
};
