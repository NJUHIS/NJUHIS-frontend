import Vue from "vue";
import {
  Button,
  Layout,
  Card,
  Input,
  Icon,
  DatePicker,
  Message
} from "view-design";

Vue.component("Button", Button);
Vue.component("Layout", Layout);
Vue.component("Card", Card);
Vue.component("Input", Input);
Vue.component("Icon", Icon);
Vue.component("DatePicker", DatePicker);
Vue.prototype.$Message = Message;

Message.config({
  duration: 5
});

import "view-design/dist/styles/iview.css";
