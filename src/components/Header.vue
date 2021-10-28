vue
<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link to="/" class="text-white font-bold uppercase text-2xl mr-4">Music</router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <router-link to="/about" class="px-2 text-white">About</router-link>
          </li>

          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"> Login / Register </a>
          </li>
          <!-- render multiple list items -->
          <template v-else>
            <li>
              <router-link class="px-2 text-white" to="/manage">Manage</router-link>
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
import { mapMutations, mapState, mapActions } from 'vuex';
export default {
  name: 'Header',
  methods: {
    ...mapMutations(['toggleAuthModal']),
    // toggleModal() {
    //   this.$store.commit('toggleAuthModal');
    // },
    ...mapActions(['signout']),
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },
};
</script>

<style></style>
