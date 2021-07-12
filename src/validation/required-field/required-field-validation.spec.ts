import { RequiredFieldError } from '../errors';
import { RequiredFieldValidation } from './required-field-validation';

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const subject = new RequiredFieldValidation('email');
    const error = subject.validate('');

    expect(error).toEqual(new RequiredFieldError());
  });
});
