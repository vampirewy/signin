import Vue from "vue";
import Router from "vue-router";
import Sign from "./views/Sign.vue";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "home",
      component: Sign,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/winDetails",
      name: "winDetails",
      component: () => import( /* webpackChunkName: "winDetails" */ "./views/WinDetails.vue")
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
})