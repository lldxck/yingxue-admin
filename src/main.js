import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import status from "constants/status";
import statusCode from "constants/statusCode";
import utils from "utils/utils";

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$status = status;
Vue.prototype.$statusCode = statusCode;
Vue.prototype.$utils = utils;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
