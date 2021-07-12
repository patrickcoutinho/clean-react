import { InvalidFieldError } from '@/validation/errors';
import { MinLengthValidation } from './min-length-validation';

describe('MinLengthValidation', () => {
  test('Should return error if value is less than 6 chars', () => {
    const subject = new MinLengthValidation('field', 6);
    const error = subject.validate('abc');

    expect(error).toEqual(new InvalidFieldError());
  });
});
