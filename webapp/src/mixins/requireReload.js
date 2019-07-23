export default {
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      const url = location.href;
      if (!/reloaded=true/.test(url)) {
        const sep = /\?/.test(url) ? '&' : '?';
        location.href = `${url}${sep}reloaded=true`;
        location.reload();
      } else {
        vm.$router.replace({ query: { reloaded: undefined } });
      }
    });
  },
};