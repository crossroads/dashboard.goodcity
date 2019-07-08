import Vue        from 'vue'
import router     from "./router";
import store      from "./store";
import App        from './App'
import Clock      from './plugins/clock'
import moment     from 'moment-timezone'
import {
  apolloProvider
} from './setup/apollo'

import './styles/global.scss'
import './filters'
import './setup/fontawesome'
import './setup/element'

moment.tz.setDefault('Asia/Hong_Kong');

Vue.use(Clock);

new Vue({
    router,
    store,
    apolloProvider,
    render: h => h(App)
}).$mount("#app");