import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from './email-validation';

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const subject = new EmailValidation('enail');
    const error = subject.validate('');

    expect(error).toEqual(new InvalidFieldError());
  });
});
