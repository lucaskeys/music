<template>
  <!-- Registration Form -->
  <div class="text-white text-center font-bold p-5 mb-4" v-if="reg_show_alert" :class="reg_alert_variant">
    {{ reg_alert_msg }}
  </div>
  <vee-form :validation-schema="registerSchema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <!-- name field corresponds to the name inside the data schema object in our data -->
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        :bails="false"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        type="password"
        placeholder="Password"
        autocomplete="off"
      />
      <!-- <div class="text-red-600" v-for="error in errors" :key="error">
                {{ error }}
              </div> -->

      <!-- bails tells component to not use the fast exit strategy -->

      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirm_password"
        type="password"
        autocomplete="off"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />

      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <!-- as="select" will change it from its  -->
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Canada">Canada</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field value="1" name="tos" type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      :disabled="reg_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
// @character is a shortcut to the src directory - do not have to move up directories

import { mapState } from 'vuex';
// userCollection = db.collection('users')
// import firebase from 'firebase';
export default {
  name: 'RegForm',
  data() {
    return {
      registerSchema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:120',
        password: 'required|min:3|max:100',
        // @password is what we are checking against
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Canada',
        tos: 'tos',
      },

      userData: {
        country: 'USA',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.',
    };
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {
    // ...mapActions(['register']),

    async register(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      // this.reg_alert_variant = 'bg-blue-500';
      // this.reg_alert_msg = 'Your account is being created';

      try {
        // the code inside the action function is asynchrounous, we will want to wait for the request to finish
        await this.$store.dispatch('register', values);
      } catch (error) {
        console.log(error);
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_msg = 'An unexpected error occured. Please try again later';
        return;
      }

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Sucess! Your account has been created!';
      window.location.reload();
    },
  },
};
</script>

<style></style>
