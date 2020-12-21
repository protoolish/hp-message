import Vue from "vue";

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";

import HPMsgbox from "./modules/hp-message/main";

import App from "./components/App";

Vue.use(HPMsgbox);
Vue.use(Element, { locale });

new Vue({
    el: "#app",
    render: h => h(App)
})