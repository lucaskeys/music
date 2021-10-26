import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure } from 'vee-validate';

import {
  required,
  min,
  max,
  min_value as minVal,
  max_value as maxVal,
  alpha_spaces as alphaSpaces,
  email,
  confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  // app is a reference to the vue application
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);
    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('passwords_mismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);

    configure({
      generateMessage: (ctx) => {
        const upperCaseField = ctx.field.charAt(0).toUpperCase() + ctx.field.slice(1);
        const messages = {
          required: `${upperCaseField} is required.`,
          min: `${upperCaseField} is too short.`,
          max: `${upperCaseField} is too long.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email`,
          min_value: `${upperCaseField} is too low`,
          max_value: `${upperCaseField} is too high`,
          excluded: `You are not allowed to use this value for the ${ctx.field}`,
          country_excluded: `Due to restrictions, we do not accept users from this location. `,
          passwords_mismatch: `The passwords do not match`,
          tos: `You must accept the Terms of Service`,
        };
        const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid`;
        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
