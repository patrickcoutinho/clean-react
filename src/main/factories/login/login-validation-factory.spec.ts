import { ValidationComposite } from '@/validation/validators';
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder';
import { makeLoginValidation } from './login-validation-factory';

describe('LoginValidationComposite', () => {
  test('Should compose ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();

    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().minLength(5).build(),
    ]));
  });
});
