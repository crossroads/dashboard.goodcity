import Vue        from 'vue'
import router     from "./router";
import store      from "./store";
import App        from './App'
import Clock      from './plugins/clock'
import moment     from 'moment-timezone'

import './styles/global.scss'
import './filters'
import './setup/fontawesome'
import './setup/element'

moment.tz.setDefault('Asia/Hong_Kong');

Vue.use(Clock);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
