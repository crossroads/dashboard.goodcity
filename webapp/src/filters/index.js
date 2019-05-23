import Vue    from 'vue'
import moment from 'moment-timezone'
import _      from 'lodash'

Vue.filter("prettyJSON", (data) => {
  return JSON.stringify(data, null, 4);
});

Vue.filter("capitalize", (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter("snakeToText", (text) => {
  return text.replace(/_/g, " ");
});

Vue.filter("timeString", (date) => {
  return moment(date).tz("Asia/Hong_Kong").format('hh:mm A');
})

Vue.filter("dateString", (date) => {
  return moment(date).tz("Asia/Hong_Kong").format('MMMM Do');
})

Vue.filter("timeSince", (date) => {
    date = new Date(date);
    let seconds   = Math.floor((new Date() - date) / 1000);
    let interval  = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
});