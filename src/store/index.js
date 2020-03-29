import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUrl: ""
  },
  mutations: {
    updateUrl(state, newUrl) {
      state.currentUrl = newUrl;
    }
  },
  modules: {}
});
