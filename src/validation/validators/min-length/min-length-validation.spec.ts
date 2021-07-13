import { InvalidFieldError } from '@/validation/errors';
import faker from 'faker';
import { MinLengthValidation } from './min-length-validation';

const makeSubject = (minLength: number = 6):
MinLengthValidation => new MinLengthValidation(faker.database.column(), minLength);

describe('MinLengthValidation', () => {
  test('Should return error if value is less than 6 chars', () => {
    const subject = makeSubject();
    const error = subject.validate(faker.random.alphaNumeric(3));

    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if value is valid', () => {
    const subject = makeSubject();

    let error = subject.validate(faker.random.alphaNumeric(6));
    expect(error).toBeFalsy();

    error = subject.validate(faker.random.alphaNumeric(7));
    expect(error).toBeFalsy();
  });
});
