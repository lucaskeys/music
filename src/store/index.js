import { createStore } from 'vuex';
// import firebase from '@/includes/firebase';
import { auth, db } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
      console.log(state);
    },
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  getters: {
    // authModalShow: (state) => {
    //   return state.authModalShow;
    // },
  },
  actions: {
    // ctx has the same methods and properties that you would find in the store object - so it has access to commit
    // destructure to get the commit function
    register: async ({ commit }, payload) => {
      const { email, password, name, age, country } = payload;
      const userCred = await auth.createUserWithEmailAndPassword(email, password);
      await db.collection('users').doc(userCred.user.uid).set({
        name,
        email,
        age,
        country,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });
      // this.$store.commit('toggleAuth)
      commit('toggleAuth');
    },

    login: async ({ commit }, payload) => {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit('toggleAuth');
    },
    // checks and persists login data and changes the auth to the current user immediately
    initLogin: ({ commit }) => {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuth');
      }
    },
  },
  modules: {},
});
