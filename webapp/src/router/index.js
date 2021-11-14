import Vue          from "vue";
import Router       from "vue-router";
import HKDView      from "../views/HKD";
import LoginView    from "../views/Login";
import Store        from "../store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/hkd",
      component: HKDView,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      component: LoginView
    },
    {
      path: '*',
      redirect: '/hkd'
    } // default
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedIn = Store.getters.isAuthenticated;
    if (!loggedIn) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
  next();
})

export default router;
