export default {
  saveBookingTypes(state, bookingTypes = []) {
    state.bookingTypes = bookingTypes;;
  },

  setCredentials(state, { username, password }) {
    state.username = username;
    state.password = password;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }
};