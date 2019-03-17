import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import "./less/reset.less";
import Axios from "axios";
// import baseUrl from "./config/baseUrl";
Vue.config.productionTip = false;
Vue.prototype.axios = Axios;
Vue.prototype.url = process.env.VUE_APP_BASE_URL;
Vue.use(Mint);
let value = null;
if (window.location.href.includes('sessionId')) {
  value = window.location.search.substring(11, window.location.href.length);
} else {
  alert(`没有`);
}

const statusMap = {
  development: () => {
    Axios.defaults.headers = {
      // "serviceName": "mall",
      // "sessionId": value,
      "x-uc-userdata": "{id:51551434373613282}",
      channel: "app"
    };
  },
  production: () => {
    Axios.defaults.headers = {
      "serviceName": "mall",
      "sessionId": value
    };
  },
  alpha: () => {
    Axios.defaults.headers = {
      "serviceName": "mall",
      "sessionId": value
    };
  },
  dev: () => {
    Axios.defaults.headers = {
      "serviceName": "mall",
      "sessionId": value
    };
  },
  prod: () => {
    Axios.defaults.headers = {
      "serviceName": "mall",
      "sessionId": value
    };
  }
};

new Vue({
  router,
  store,
  created() {
    statusMap[process.env.NODE_ENV]();
  },
  render: h => h(App)
}).$mount("#app");
router.afterEach(() => {
  window.scrollTo(0, 0);
});