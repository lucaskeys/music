<template>
  <!-- Login Form -->
  <!-- schema is an object with the rule attributes we would like to enforce on them  -->
  <div class="text-white text-center font-bold p-4 mb-4" v-if="login_show_alert" :class="login_alert_variant">{{ login_alert_msg }}</div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        autocomplete="off"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      :disabled="login_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:3|max:32',
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: 'Please wait while we log you into your account.',
    };
  },
  methods: {
    async login(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;

      try {
        await this.$store.dispatch('login', values);
        // this.login_alert_msg = 'Please wait while we log you into your account.';
      } catch (error) {
        this.login_in_submission = true;
        this.login_alert_variant = 'bg-red-500';
        this.login_alert_msg = 'Invalid login details';
        console.log(error);
        return;
      }
      this.login_alert_variant = 'bg-green-500';
      this.login_alert_msg = 'Logged in successfully!';
      window.location.reload();
      console.log(values);
    },
  },
};
</script>

<style></style>
