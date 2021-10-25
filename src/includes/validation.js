import { Form as VeeForm, Field as VeeField } from 'vee-validate';

export default {
  // app is a reference to the vue application
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
  },
};
