vue
<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link :to="{ name: 'home' }" exact-active-class="no-active" class="text-white font-bold uppercase text-2xl mr-4">Music</router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <router-link :to="{ name: 'about', path: '/about' }" class="px-2 text-white">About</router-link>
          </li>

          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"> Login / Register </a>
          </li>
          <!-- render multiple list items -->
          <template v-else>
            <li>
              <router-link :to="{ name: 'manage' }" class="px-2 text-white">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signout">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'Header',
  methods: {
    ...mapMutations(['toggleAuthModal']),
    // toggleModal() {
    //   this.$store.commit('toggleAuthModal');
    // },
    // ...mapActions(['signout']),
    // this is how you would manually dispatch an action from a component without having to map the action
    signout() {
      this.$store.dispatch('signout');
      // vue will inject the router instance into every component - checks to see if they are on the manage page, but if not, will not be redirected
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },
  },

  computed: {
    ...mapState(['userLoggedIn']),
  },
};
</script>

<style></style>
