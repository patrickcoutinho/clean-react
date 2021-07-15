import { ValidationComposite } from '@/validation/validators';
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder';

export const makeLoginValidation = ():
ValidationComposite => ValidationComposite.build([
  ...ValidationBuilder.field('email').required().email().build(),
  ...ValidationBuilder.field('password').required().minLength(6).build(),
]);