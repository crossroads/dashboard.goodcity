import Vue        from 'vue'
import router     from "./router";
import store      from "./store";
import App        from './App'
import apollo     from './setup/apollo'
import Clock      from './plugins/clock'

import './styles/global.scss'
import './filters'
import './setup/fontawesome'
import './setup/element'
import './setup/components'

Vue.use(Clock);

new Vue({
    router,
    store,
    apolloProvider: apollo,
    render: h => h(App)
}).$mount("#app");