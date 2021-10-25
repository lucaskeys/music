import { createStore } from 'vuex';

export default createStore({
  state: {
    authModalShow: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
      console.log(state);
    },
  },
  getters: {
    // authModalShow: (state) => {
    //   return state.authModalShow;
    // },
  },
  actions: {},
  modules: {},
});
